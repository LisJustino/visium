import os
import unittest
from unittest.mock import Mock, patch

import backend.server as server


class ServerSecurityTests(unittest.TestCase):

    def tearDown(self):
        with server.AUTH_FAILURES_LOCK:
            server.AUTH_FAILURES.clear()

    def test_password_hash_matches_only_original_password(self):
        stored_hash = server.password_hash("Senha123")

        self.assertTrue(server.password_matches("Senha123", stored_hash))
        self.assertFalse(server.password_matches("Senha456", stored_hash))

    def test_auth_rate_limit_blocks_after_five_failures(self):
        key = "test-client"

        for _ in range(server.AUTH_RATE_LIMIT_MAX_FAILURES):
            server.record_auth_failure(key)

        self.assertTrue(server.is_auth_rate_limited(key))

        server.clear_auth_failures(key)
        self.assertFalse(server.is_auth_rate_limited(key))

    def test_secure_headers_include_hsts(self):
        handler = object.__new__(server.VisiumHandler)
        handler.path = "/"
        handler.send_header = Mock()

        with patch.object(server.SimpleHTTPRequestHandler, "end_headers"):
            with patch.dict(os.environ, {"VISIUM_SECURE_COOKIES": "1"}):
                handler.end_headers()

        header_names = [
            call.args[0]
            for call in handler.send_header.call_args_list
        ]

        self.assertIn("Content-Security-Policy", header_names)
        self.assertIn("X-Frame-Options", header_names)
        self.assertIn("Strict-Transport-Security", header_names)


if __name__ == "__main__":
    unittest.main()
