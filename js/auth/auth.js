/**
 * ==========================================================================
 * Visium
 * Arquivo: auth.js
 *
 * Serviço central de autenticação e sessão.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Configuração
========================================================================== */

const VISIUM_AUTH_STORAGE_KEY =
    "visium_user";


const VISIUM_DEV_USER = {

    id:
        "test-user",

    name:
        "Usuário de Teste",

    email:
        "teste@visium.local"

};


/*
 * Credencial temporária de desenvolvimento.
 *
 * O cadastro definitivo será implementado na Entrega 008.
 */

const VISIUM_DEV_PASSWORD =
    "visium123";


/* ==========================================================================
   Usuário atual
========================================================================== */

function getCurrentUser() {

    const storedUser =
        localStorage.getItem(
            VISIUM_AUTH_STORAGE_KEY
        );


    if (!storedUser) {

        return null;

    }


    try {

        const user =
            JSON.parse(
                storedUser
            );


        if (
            !user ||
            typeof user !== "object" ||
            !user.id ||
            !user.name ||
            !user.email
        ) {

            return null;

        }


        return user;

    } catch (error) {

        console.error(
            "Visium | Sessão inválida:",
            error
        );


        return null;

    }

}


/* ==========================================================================
   Estado da autenticação
========================================================================== */

function isAuthenticated() {

    return Boolean(
        getCurrentUser()
    );

}


/* ==========================================================================
   Login
========================================================================== */

function login(
    email,
    password
) {

    const normalizedEmail =
        String(
            email || ""
        )
            .trim()
            .toLowerCase();


    const normalizedPassword =
        String(
            password || ""
        );


    if (
        normalizedEmail !==
        VISIUM_DEV_USER.email
    ) {

        return {

            success:
                false,

            code:
                "INVALID_CREDENTIALS",

            message:
                "E-mail ou senha inválidos."

        };

    }


    if (
        normalizedPassword !==
        VISIUM_DEV_PASSWORD
    ) {

        return {

            success:
                false,

            code:
                "INVALID_CREDENTIALS",

            message:
                "E-mail ou senha inválidos."

        };

    }


    localStorage.setItem(

        VISIUM_AUTH_STORAGE_KEY,

        JSON.stringify(
            VISIUM_DEV_USER
        )

    );


    return {

        success:
            true,

        user:
            VISIUM_DEV_USER

    };

}


/* ==========================================================================
   Logout
========================================================================== */

function logout() {

    localStorage.removeItem(
        VISIUM_AUTH_STORAGE_KEY
    );


    window.location.href =
        "/pages/public/landing/index.html";

}


/* ==========================================================================
   Proteção de rota
========================================================================== */

function requireAuthentication() {

    if (
        isAuthenticated()
    ) {

        return true;

    }


    window.location.href =
        "/pages/auth/login/login.html";


    return false;

}


/* ==========================================================================
   API pública
========================================================================== */

window.VisiumAuth = {

    getCurrentUser,

    isAuthenticated,

    login,

    logout,

    requireAuthentication

};