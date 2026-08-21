"""Servidor local do Visium: arquivos estÃ¡ticos e API de autenticaÃ§Ã£o."""

from __future__ import annotations

import hashlib
import hmac
import http.cookies
import json
import os
import secrets
import sqlite3
import time
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = ROOT / "backend" / "data"

DATABASE_PATH = DATA_DIR / "visium.sqlite3"

SESSION_COOKIE = "visium_session"

SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

PASSWORD_ITERATIONS = 600_000

STATIC_CACHE_SECONDS = 60 * 60


def database_connection() -> sqlite3.Connection:

    DATA_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    connection.row_factory = sqlite3.Row

    connection.execute(
        "PRAGMA foreign_keys = ON"
    )

    return connection


def initialize_database() -> None:

    with database_connection() as connection:

        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token_hash TEXT PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL,
                created_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                token_hash TEXT PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL,
                used_at INTEGER
            );
            """
        )


def json_response(
    handler: SimpleHTTPRequestHandler,
    status: int,
    payload: dict
) -> None:

    body = json.dumps(
        payload,
        ensure_ascii=False
    ).encode("utf-8")

    handler.send_response(
        status
    )

    handler.send_header(
        "Content-Type",
        "application/json; charset=utf-8"
    )

    handler.send_header(
        "Content-Length",
        str(len(body))
    )

    handler.send_header(
        "Cache-Control",
        "no-store"
    )

    handler.end_headers()

    try:

        handler.wfile.write(
            body
        )

    except (
        BrokenPipeError,
        ConnectionAbortedError,
        ConnectionResetError
    ):

        return


def read_json(
    handler: SimpleHTTPRequestHandler
) -> dict:

    length = int(
        handler.headers.get(
            "Content-Length",
            "0"
        )
    )

    if length > 16_384:

        raise ValueError(
            "Payload muito grande."
        )

    raw_body = handler.rfile.read(
        length
    )

    payload = json.loads(
        raw_body.decode("utf-8")
    )

    if not isinstance(
        payload,
        dict
    ):

        raise ValueError(
            "Payload invÃ¡lido."
        )

    return payload


def normalize_email(
    value: object
) -> str:

    return str(
        value or ""
    ).strip().lower()


def password_hash(
    password: str,
    salt: bytes | None = None
) -> str:

    salt = (
        salt
        or secrets.token_bytes(16)
    )

    derived_key = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        PASSWORD_ITERATIONS
    )

    return (
        f"pbkdf2_sha256"
        f"${PASSWORD_ITERATIONS}"
        f"${salt.hex()}"
        f"${derived_key.hex()}"
    )


def password_matches(
    password: str,
    stored_hash: str
) -> bool:

    try:

        (
            algorithm,
            iterations,
            salt_hex,
            digest_hex
        ) = stored_hash.split(
            "$",
            3
        )

        if algorithm != "pbkdf2_sha256":

            return False

        derived_key = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            bytes.fromhex(
                salt_hex
            ),
            int(iterations)
        )

        return hmac.compare_digest(
            derived_key.hex(),
            digest_hex
        )

    except (
        ValueError,
        TypeError
    ):

        return False


def user_payload(
    user: sqlite3.Row
) -> dict:

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "createdAt": user["created_at"]
    }


def session_token(
    handler: SimpleHTTPRequestHandler
) -> str | None:

    cookies = http.cookies.SimpleCookie(
        handler.headers.get(
            "Cookie",
            ""
        )
    )

    morsel = cookies.get(
        SESSION_COOKIE
    )

    return (
        morsel.value
        if morsel
        else None
    )


def token_hash(
    token: str
) -> str:

    return hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()


def current_user(
    handler: SimpleHTTPRequestHandler
) -> sqlite3.Row | None:

    token = session_token(
        handler
    )

    if not token:

        return None

    now = int(
        time.time()
    )

    with database_connection() as connection:

        connection.execute(
            """
            DELETE FROM sessions
            WHERE expires_at <= ?
            """,
            (now,)
        )

        return connection.execute(
            """
            SELECT users.*
            FROM users
            JOIN sessions
                ON sessions.user_id = users.id
            WHERE sessions.token_hash = ?
              AND sessions.expires_at > ?
            """,
            (
                token_hash(token),
                now
            )
        ).fetchone()


def set_session_cookie(
    handler: SimpleHTTPRequestHandler,
    token: str,
    max_age: int
) -> None:

    cookie = http.cookies.SimpleCookie()

    cookie[SESSION_COOKIE] = token

    cookie[SESSION_COOKIE]["path"] = "/"

    cookie[SESSION_COOKIE]["httponly"] = True

    cookie[SESSION_COOKIE]["samesite"] = "Lax"

    cookie[SESSION_COOKIE]["max-age"] = str(
        max_age
    )

    if os.environ.get(
        "VISIUM_SECURE_COOKIES"
    ) == "1":

        cookie[SESSION_COOKIE]["secure"] = True

    handler.send_header(
        "Set-Cookie",
        cookie.output(
            header=""
        ).strip()
    )


class VisiumHandler(
    SimpleHTTPRequestHandler
):

    def __init__(
        self,
        *args,
        **kwargs
    ):

        super().__init__(
            *args,
            directory=str(ROOT),
            **kwargs
        )

    def do_GET(self) -> None:

        path = urlparse(
            self.path
        ).path

        if path == "/api/health":

            json_response(
                self,
                HTTPStatus.OK,
                {
                    "ok": True
                }
            )

            return

        if path == "/api/auth/me":

            user = current_user(
                self
            )

            if not user:

                json_response(
                    self,
                    HTTPStatus.UNAUTHORIZED,
                    {
                        "error":
                            "AUTH_REQUIRED"
                    }
                )

                return

            json_response(
                self,
                HTTPStatus.OK,
                {
                    "user":
                        user_payload(user)
                }
            )

            return

        if path == "/api/profile":

            user = current_user(
                self
            )

            if not user:

                json_response(
                    self,
                    HTTPStatus.UNAUTHORIZED,
                    {
                        "error":
                            "AUTH_REQUIRED"
                    }
                )

                return

            json_response(
                self,
                HTTPStatus.OK,
                {
                    "user":
                        user_payload(user)
                }
            )

            return

        super().do_GET()

    def do_POST(self) -> None:

        path = urlparse(
            self.path
        ).path

        try:

            if path == "/api/auth/register":

                self.register()

                return

            if path == "/api/auth/login":

                self.login()

                return

            if path == "/api/auth/logout":

                self.logout()

                return

            if path == "/api/auth/password-reset/request":

                self.request_password_reset()

                return

            if path == "/api/auth/password-reset/reset":

                self.reset_password()

                return

            json_response(
                self,
                HTTPStatus.NOT_FOUND,
                {
                    "error":
                        "NOT_FOUND"
                }
            )

        except (
            ValueError,
            json.JSONDecodeError
        ) as error:

            json_response(
                self,
                HTTPStatus.BAD_REQUEST,
                {
                    "error":
                        str(error)
                        or
                        "Payload invÃ¡lido."
                }
            )

        except sqlite3.IntegrityError:

            json_response(
                self,
                HTTPStatus.CONFLICT,
                {
                    "error":
                        "EMAIL_ALREADY_EXISTS"
                }
            )

    def do_PUT(self) -> None:

        if (
            urlparse(self.path).path
            != "/api/profile"
        ):

            json_response(
                self,
                HTTPStatus.NOT_FOUND,
                {
                    "error":
                        "NOT_FOUND"
                }
            )

            return

        user = current_user(
            self
        )

        if not user:

            json_response(
                self,
                HTTPStatus.UNAUTHORIZED,
                {
                    "error":
                        "AUTH_REQUIRED"
                }
            )

            return

        try:

            payload = read_json(
                self
            )

            name = str(
                payload.get(
                    "name",
                    ""
                )
            ).strip()

            email = normalize_email(
                payload.get(
                    "email"
                )
            )

            if (
                len(name) < 2
                or
                "@" not in email
            ):

                json_response(
                    self,
                    HTTPStatus.UNPROCESSABLE_ENTITY,
                    {
                        "error":
                            "INVALID_PROFILE"
                    }
                )

                return

            with database_connection() as connection:

                connection.execute(
                    """
                    UPDATE users
                    SET name = ?,
                        email = ?
                    WHERE id = ?
                    """,
                    (
                        name,
                        email,
                        user["id"]
                    )
                )

                updated_user = connection.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE id = ?
                    """,
                    (
                        user["id"],
                    )
                ).fetchone()

            json_response(
                self,
                HTTPStatus.OK,
                {
                    "user":
                        user_payload(
                            updated_user
                        )
                }
            )

        except (
            ValueError,
            json.JSONDecodeError
        ) as error:

            json_response(
                self,
                HTTPStatus.BAD_REQUEST,
                {
                    "error":
                        str(error)
                        or
                        "Payload invÃ¡lido."
                }
            )

        except sqlite3.IntegrityError:

            json_response(
                self,
                HTTPStatus.CONFLICT,
                {
                    "error":
                        "EMAIL_ALREADY_EXISTS"
                }
            )

    def do_DELETE(self) -> None:

        if urlparse(self.path).path != "/api/auth/account":

            json_response(
                self,
                HTTPStatus.NOT_FOUND,
                {
                    "error":
                        "NOT_FOUND"
                }
            )

            return

        user = current_user(
            self
        )

        if not user:

            json_response(
                self,
                HTTPStatus.UNAUTHORIZED,
                {
                    "error":
                        "AUTH_REQUIRED"
                }
            )

            return

        with database_connection() as connection:

            connection.execute(
                "DELETE FROM users WHERE id = ?",
                (
                    user["id"],
                )
            )

        self.send_response(
            HTTPStatus.NO_CONTENT
        )

        set_session_cookie(
            self,
            "",
            0
        )

        self.end_headers()

    def register(self) -> None:

        payload = read_json(
            self
        )

        name = str(
            payload.get(
                "name",
                ""
            )
        ).strip()

        email = normalize_email(
            payload.get(
                "email"
            )
        )

        password = str(
            payload.get(
                "password",
                ""
            )
        )

        if (
            len(name) < 2
            or "@" not in email
            or len(password) < 8
        ):

            json_response(
                self,
                HTTPStatus.UNPROCESSABLE_ENTITY,
                {
                    "error":
                        "INVALID_CREDENTIALS"
                }
            )

            return

        user_id = secrets.token_urlsafe(
            18
        )

        created_at = time.strftime(
            "%Y-%m-%dT%H:%M:%SZ",
            time.gmtime()
        )

        with database_connection() as connection:

            connection.execute(
                """
                INSERT INTO users (
                    id,
                    name,
                    email,
                    password_hash,
                    created_at
                )
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    user_id,
                    name,
                    email,
                    password_hash(
                        password
                    ),
                    created_at
                )
            )

            user = connection.execute(
                """
                SELECT *
                FROM users
                WHERE id = ?
                """,
                (
                    user_id,
                )
            ).fetchone()

        self.create_session(
            user
        )

    def login(self) -> None:

        payload = read_json(
            self
        )

        email = normalize_email(
            payload.get(
                "email"
            )
        )

        password = str(
            payload.get(
                "password",
                ""
            )
        )

        with database_connection() as connection:

            user = connection.execute(
                """
                SELECT *
                FROM users
                WHERE email = ?
                """,
                (
                    email,
                )
            ).fetchone()

        if (
            not user
            or
            not password_matches(
                password,
                user["password_hash"]
            )
        ):

            json_response(
                self,
                HTTPStatus.UNAUTHORIZED,
                {
                    "error":
                        "INVALID_CREDENTIALS"
                }
            )

            return

        self.create_session(
            user
        )

    def create_session(
        self,
        user: sqlite3.Row
    ) -> None:

        token = secrets.token_urlsafe(
            32
        )

        now = int(
            time.time()
        )

        with database_connection() as connection:

            connection.execute(
                """
                INSERT INTO sessions (
                    token_hash,
                    user_id,
                    expires_at,
                    created_at
                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    token_hash(token),
                    user["id"],
                    now + SESSION_TTL_SECONDS,
                    now
                )
            )

        self.send_response(
            HTTPStatus.OK
        )

        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )

        set_session_cookie(
            self,
            token,
            SESSION_TTL_SECONDS
        )

        body = json.dumps(
            {
                "user":
                    user_payload(
                        user
                    )
            },
            ensure_ascii=False
        ).encode("utf-8")

        self.send_header(
            "Content-Length",
            str(len(body))
        )

        self.send_header(
            "Cache-Control",
            "no-store"
        )

        self.end_headers()

        try:

            self.wfile.write(
                body
            )

        except (
            BrokenPipeError,
            ConnectionAbortedError,
            ConnectionResetError
        ):

            return

    def logout(self) -> None:

        token = session_token(
            self
        )

        if token:

            with database_connection() as connection:

                connection.execute(
                    """
                    DELETE FROM sessions
                    WHERE token_hash = ?
                    """,
                    (
                        token_hash(token),
                    )
                )

        self.send_response(
            HTTPStatus.NO_CONTENT
        )

        set_session_cookie(
            self,
            "",
            0
        )

        self.end_headers()

    def request_password_reset(
        self
    ) -> None:

        payload = read_json(
            self
        )

        email = normalize_email(
            payload.get(
                "email"
            )
        )

        with database_connection() as connection:

            user = connection.execute(
                """
                SELECT *
                FROM users
                WHERE email = ?
                """,
                (
                    email,
                )
            ).fetchone()

        if not user:

            json_response(
                self,
                HTTPStatus.OK,
                {
                    "success":
                        True
                }
            )

            return

        token = secrets.token_urlsafe(
            32
        )

        now = int(
            time.time()
        )

        with database_connection() as connection:

            connection.execute(
                """
                DELETE FROM password_reset_tokens
                WHERE expires_at <= ?
                   OR used_at IS NOT NULL
                """,
                (
                    now,
                )
            )

            connection.execute(
                """
                INSERT INTO password_reset_tokens (
                    token_hash,
                    user_id,
                    expires_at
                )
                VALUES (?, ?, ?)
                """,
                (
                    token_hash(token),
                    user["id"],
                    now + 900
                )
            )

        json_response(
            self,
            HTTPStatus.OK,
            {
                "success":
                    True,
                "token":
                    token
            }
        )

    def reset_password(
        self
    ) -> None:

        payload = read_json(
            self
        )

        token = str(
            payload.get(
                "token",
                ""
            )
        ).strip()

        password = str(
            payload.get(
                "password",
                ""
            )
        )

        if (
            len(password) < 8
            or
            not any(
                character.isalpha()
                for character in password
            )
            or
            not any(
                character.isdigit()
                for character in password
            )
        ):

            json_response(
                self,
                HTTPStatus.UNPROCESSABLE_ENTITY,
                {
                    "error":
                        "INVALID_PASSWORD"
                }
            )

            return

        now = int(
            time.time()
        )

        with database_connection() as connection:

            reset = connection.execute(
                """
                SELECT *
                FROM password_reset_tokens
                WHERE token_hash = ?
                  AND expires_at > ?
                  AND used_at IS NULL
                """,
                (
                    token_hash(token),
                    now
                )
            ).fetchone()

            if not reset:

                json_response(
                    self,
                    HTTPStatus.UNAUTHORIZED,
                    {
                        "error":
                            "INVALID_RESET_TOKEN"
                    }
                )

                return

            connection.execute(
                """
                UPDATE users
                SET password_hash = ?
                WHERE id = ?
                """,
                (
                    password_hash(
                        password
                    ),
                    reset["user_id"]
                )
            )

            connection.execute(
                """
                UPDATE password_reset_tokens
                SET used_at = ?
                WHERE token_hash = ?
                """,
                (
                    now,
                    token_hash(token)
                )
            )

        json_response(
            self,
            HTTPStatus.OK,
            {
                "success":
                    True
            }
        )

    def end_headers(self) -> None:

        request_path = urlparse(
            self.path
        ).path

        # ------------------------------------------------------------------
        # Cache de arquivos estÃ¡ticos
        #
        # CSS, JavaScript, imagens e fontes podem ser reutilizados pelo
        # navegador durante a navegaÃ§Ã£o entre pÃ¡ginas.
        #
        # Os arquivos HTML continuam sendo revalidados para facilitar o
        # desenvolvimento e evitar que alteraÃ§Ãµes de pÃ¡gina fiquem presas
        # em cache.
        # ------------------------------------------------------------------

        if request_path.endswith(
            (
                ".css",
                ".js",
                ".png",
                ".jpg",
                ".jpeg",
                ".webp",
                ".gif",
                ".svg",
                ".ico",
                ".woff",
                ".woff2",
                ".ttf",
                ".otf"
            )
        ):

            self.send_header(
                "Cache-Control",
                f"public, max-age={STATIC_CACHE_SECONDS}"
            )

        elif request_path.endswith(
            ".html"
        ):

            self.send_header(
                "Cache-Control",
                "no-cache"
            )

        # ------------------------------------------------------------------
        # API
        #
        # As respostas JSON nunca devem ser armazenadas pelo navegador.
        # Isso Ã© importante principalmente para autenticaÃ§Ã£o, sessÃ£o e
        # dados de usuÃ¡rio.
        # ------------------------------------------------------------------

        elif request_path.startswith(
            "/api/"
        ):

            self.send_header(
                "Cache-Control",
                "no-store"
            )

        self.send_header(
            "X-Content-Type-Options",
            "nosniff"
        )

        self.send_header(
            "Referrer-Policy",
            "strict-origin-when-cross-origin"
        )

        super().end_headers()


def main() -> None:

    host = os.environ.get(
        "HOST",
        "0.0.0.0"
    )

    port = int(
        os.environ.get(
            "PORT",
            "8000"
        )
    )

    initialize_database()

    server = ThreadingHTTPServer(
        (
            host,
            port
        ),
        VisiumHandler
    )

    print(
        f"Visium backend: http://127.0.0.1:{port}"
    )

    try:

        server.serve_forever()

    except KeyboardInterrupt:

        print(
            "\nServidor encerrado."
        )

    finally:

        server.server_close()


if __name__ == "__main__":

    main()
