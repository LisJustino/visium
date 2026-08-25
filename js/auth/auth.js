/**
 * ==========================================================================
 * Visium
 * Arquivo: auth.js
 *
 * Serviço central de autenticação.
 *
 * A sessão é mantida exclusivamente pelo cookie HttpOnly
 * criado pelo backend. Nenhum dado de autenticação é armazenado
 * no localStorage.
 * ==========================================================================
 */

"use strict";


const VISIUM_API_BASE_URL =
    "/api";


/* ==========================================================================
   Constantes
========================================================================== */

const MIN_PASSWORD_LENGTH =
    8;

const LOGIN_URL =
    "/pages/auth/login/login.html";

const LANDING_URL =
    "/pages/public/landing/index.html";


/* ==========================================================================
   Utilidades
========================================================================== */

function normalizeEmail(
    email
) {

    return String(
        email || ""
    )
        .trim()
        .toLowerCase();

}


function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


function isValidPassword(
    password
) {

    if (
        typeof password !==
        "string"
    ) {

        return false;

    }


    if (
        password.length <
        MIN_PASSWORD_LENGTH
    ) {

        return false;

    }


    return (
        /[A-Za-zÀ-ÿ]/.test(
            password
        ) &&
        /\d/.test(
            password
        )
    );

}


function getErrorMessage(
    error
) {

    switch (
    error
    ) {

        case "EMAIL_ALREADY_EXISTS":

            return "Já existe uma conta cadastrada com este e-mail.";

        case "INVALID_CREDENTIALS":

            return "E-mail ou senha inválidos.";

        case "INVALID_EMAIL":

            return "Informe um e-mail válido.";

        case "INVALID_PASSWORD":

            return "A senha não atende aos requisitos.";

        case "INVALID_RESET_TOKEN":

            return "O link de recuperação é inválido ou expirou.";

        case "AUTH_REQUIRED":

            return "Sua sessão expirou. Faça login novamente.";

        case "INVALID_PROFILE":

            return "Informe um nome e e-mail válidos.";

        case "TERMS_REQUIRED":

            return "Você precisa aceitar os Termos de Uso.";

        case "API_UNAVAILABLE":

            return "Não foi possível conectar ao servidor.";

        case "DATABASE_UNAVAILABLE":

            return "O servidor está ocupado. Aguarde alguns segundos e tente novamente.";

        case "TOO_MANY_ATTEMPTS":

            return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";

        case "EMAIL_SERVICE_UNAVAILABLE":

            return "O envio de e-mails está temporariamente indisponível. Tente novamente mais tarde.";

        default:

            return "Não foi possível concluir a operação.";

    }

}


/* ==========================================================================
   API
========================================================================== */

async function requestApi(
    endpoint,
    options = {}
) {

    const requestOptions = {
        ...options,

        credentials:
            "same-origin",

        headers: {
            "Content-Type":
                "application/json",

            ...(options.headers || {})
        }
    };


    let response;


    try {

        response =
            await fetch(
                `${VISIUM_API_BASE_URL}${endpoint}`,
                requestOptions
            );

    } catch (error) {

        console.error(
            "Visium | API indisponível:",
            error
        );

        return {

            success:
                false,

            code:
                "API_UNAVAILABLE",

            message:
                getErrorMessage(
                    "API_UNAVAILABLE"
                )

        };

    }


    let payload = {};


    if (
        response.status !==
        204
    ) {

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        if (
            contentType
                .toLowerCase()
                .includes(
                    "application/json"
                )
        ) {

            try {

                payload =
                    await response.json();

            } catch (error) {

                console.error(
                    "Visium | Resposta JSON inválida:",
                    error
                );

                payload = {};

            }

        }

    }


    if (
        !response.ok
    ) {

        const errorCode =
            typeof payload.error ===
                "string"
                ? payload.error
                : "REQUEST_FAILED";


        return {

            success:
                false,

            code:
                errorCode,

            message:
                getErrorMessage(
                    errorCode
                )

        };

    }


    return {

        success:
            true,

        ...payload

    };

}


/* ==========================================================================
   Validação de senha
========================================================================== */

function validatePassword(
    password
) {

    if (
        typeof password !==
        "string" ||
        !password
    ) {

        return {

            valid:
                false,

            code:
                "INVALID_PASSWORD",

            message:
                "Informe sua senha."

        };

    }


    if (
        password.length <
        MIN_PASSWORD_LENGTH
    ) {

        return {

            valid:
                false,

            code:
                "INVALID_PASSWORD",

            message:
                "A senha deve possuir pelo menos 8 caracteres."

        };

    }


    if (
        !isValidPassword(
            password
        )
    ) {

        return {

            valid:
                false,

            code:
                "INVALID_PASSWORD",

            message:
                "A senha deve conter pelo menos uma letra e um número."

        };

    }


    return {

        valid:
            true

    };

}


window.VisiumStorage = {

    USER_KEY:
        "visium_user",

    getStoredUser() {

        try {

            const storedUser =
                localStorage.getItem(
                    this.USER_KEY
                );

            if (!storedUser) {

                return null;

            }

            const parsedUser =
                JSON.parse(
                    storedUser
                );

            return (
                parsedUser &&
                typeof parsedUser === "object"
            )
                ? parsedUser
                : null;

        } catch (error) {

            console.warn(
                "Visium | Usuário salvo em localStorage inválido.",
                error
            );

            this.clearUserStorage();

            return null;

        }

    },

    setStoredUser(user) {

        if (!user) {

            this.clearUserStorage();

            return;

        }

        localStorage.setItem(
            this.USER_KEY,
            JSON.stringify(user)
        );

    },

    clearUserStorage() {

        localStorage.removeItem(
            this.USER_KEY
        );

        Object.keys(
            localStorage
        )
            .filter(
                (key) => key.startsWith("visium_")
            )
            .forEach(
                (key) => localStorage.removeItem(key)
            );

    },

    getUserKey(user = this.getStoredUser()) {

        if (!user) {

            return "anonymous";

        }

        return String(
            user.id ||
            user.email ||
            user.username ||
            user.name ||
            "anonymous"
        )
            .trim()
            .toLowerCase();

    },

    getSafeStorageKey(value) {

        return encodeURIComponent(
            String(
                value
            )
        );

    }

};


/* ==========================================================================
   API pública de autenticação
========================================================================== */

window.VisiumAuth = {

    /* ======================================================================
       Login
    ====================================================================== */

    async login(
        email,
        password
    ) {

        const normalizedEmail =
            normalizeEmail(
                email
            );


        if (
            !isValidEmail(
                normalizedEmail
            )
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_EMAIL",

                message:
                    "Informe um e-mail válido."

            };

        }


        if (
            !password
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_PASSWORD",

                message:
                    "Informe sua senha."

            };

        }


        return requestApi(
            "/auth/login",
            {

                method:
                    "POST",

                body:
                    JSON.stringify({

                        email:
                            normalizedEmail,

                        password:
                            String(
                                password
                            )

                    })

            }
        );

    },


    /* ======================================================================
       Cadastro
    ====================================================================== */

    async register(
        name,
        email,
        password,
        termsAccepted = true
    ) {

        const normalizedName =
            String(
                name || ""
            ).trim();


        const normalizedEmail =
            normalizeEmail(
                email
            );


        if (
            normalizedName.length <
            2
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_NAME",

                message:
                    "Informe um nome válido."

            };

        }


        if (
            !isValidEmail(
                normalizedEmail
            )
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_EMAIL",

                message:
                    "Informe um e-mail válido."

            };

        }


        const passwordValidation =
            validatePassword(
                password
            );


        if (
            !passwordValidation.valid
        ) {

            return {

                success:
                    false,

                code:
                    passwordValidation.code,

                message:
                    passwordValidation.message

            };

        }


        if (
            termsAccepted !==
            true
        ) {

            return {

                success:
                    false,

                code:
                    "TERMS_REQUIRED",

                message:
                    "Você precisa aceitar os Termos de Uso."

            };

        }


        return requestApi(
            "/auth/register",
            {

                method:
                    "POST",

                body:
                    JSON.stringify({

                        name:
                            normalizedName,

                        email:
                            normalizedEmail,

                        password:
                            password,

                        termsAccepted:
                            termsAccepted

                    })

            }
        );

    },


    /* ======================================================================
       Logout
    ====================================================================== */

    async logout() {

        const result =
            await requestApi(
                "/auth/logout",
                {
                    method:
                        "POST"
                }
            );

        window.VisiumStorage.clearUserStorage();


        window.location.assign(
            LANDING_URL
        );


        return result;

    },


    async deleteAccount() {

        const result =
            await requestApi(
                "/auth/account",
                {
                    method:
                        "DELETE"
                }
            );


        window.VisiumStorage.clearUserStorage();


        return result;

    },


    /* ======================================================================
       Usuário atual
    ====================================================================== */

    async getCurrentUser() {

        const result =
            await requestApi(
                "/auth/me"
            );


        if (
            !result.success
        ) {

            window.VisiumStorage.clearUserStorage();

            return null;

        }


        const user =
            result.user ||
            null;

        if (user) {

            window.VisiumStorage.setStoredUser(user);

        }


        return user;

    },


    /* ======================================================================
       Verificação de autenticação
    ====================================================================== */

    async isAuthenticated() {

        const user =
            await this.getCurrentUser();


        return Boolean(
            user
        );

    },


    /* ======================================================================
       Proteção de página
    ====================================================================== */

    async requireAuthentication() {

        const user =
            await this.getCurrentUser();


        if (
            user
        ) {

            return user;

        }


        window.location.replace(
            LOGIN_URL
        );


        return null;

    },


    /* ======================================================================
       Solicitação de recuperação de senha
    ====================================================================== */

    async requestPasswordReset(
        email
    ) {

        const normalizedEmail =
            normalizeEmail(
                email
            );


        if (
            !isValidEmail(
                normalizedEmail
            )
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_EMAIL",

                message:
                    "Informe um e-mail válido."

            };

        }


        return requestApi(
            "/auth/password-reset/request",
            {

                method:
                    "POST",

                body:
                    JSON.stringify({

                        email:
                            normalizedEmail

                    })

            }
        );

    },


    /* ======================================================================
       Redefinição de senha
    ====================================================================== */

    async resetPassword(
        token,
        password
    ) {

        const normalizedToken =
            String(
                token || ""
            ).trim();


        if (
            !normalizedToken
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_RESET_TOKEN",

                message:
                    getErrorMessage(
                        "INVALID_RESET_TOKEN"
                    )

            };

        }


        const passwordValidation =
            validatePassword(
                password
            );


        if (
            !passwordValidation.valid
        ) {

            return {

                success:
                    false,

                code:
                    passwordValidation.code,

                message:
                    passwordValidation.message

            };

        }


        return requestApi(
            "/auth/password-reset/reset",
            {

                method:
                    "POST",

                body:
                    JSON.stringify({

                        token:
                            normalizedToken,

                        password:
                            password

                    })

            }
        );

    },


    /* ======================================================================
       Atualização de perfil
    ====================================================================== */

    async updateProfile(
        name,
        email
    ) {

        const normalizedName =
            String(
                name || ""
            ).trim();


        const normalizedEmail =
            normalizeEmail(
                email
            );


        if (
            normalizedName.length <
            2 ||
            !isValidEmail(
                normalizedEmail
            )
        ) {

            return {

                success:
                    false,

                code:
                    "INVALID_PROFILE",

                message:
                    "Informe um nome e e-mail válidos."

            };

        }


        return requestApi(
            "/profile",
            {

                method:
                    "PUT",

                body:
                    JSON.stringify({

                        name:
                            normalizedName,

                        email:
                            normalizedEmail

                    })

            }
        );

    }

};