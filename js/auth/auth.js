/**
 * ==========================================================================
 * Visium
 * Arquivo: auth.js
 *
 * Serviço central de autenticação, contas e sessão.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Configuração
========================================================================== */

const VISIUM_AUTH_STORAGE_KEY =
    "visium_user";


const VISIUM_USERS_STORAGE_KEY =
    "visium_users";


const VISIUM_DEV_USER = {

    id:
        "test-user",

    name:
        "Usuário de Teste",

    email:
        "teste@visium.local",

    createdAt:
        "2026-01-01T00:00:00.000Z"

};


const VISIUM_DEV_PASSWORD =
    "visium123";


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


function generateUserId() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID ===
        "function"
    ) {

        return window.crypto.randomUUID();

    }


    return (
        "user-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2, 10)
    );

}


function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


function getStoredUsers() {

    const storedUsers =
        localStorage.getItem(
            VISIUM_USERS_STORAGE_KEY
        );


    if (!storedUsers) {

        return [];

    }


    try {

        const users =
            JSON.parse(
                storedUsers
            );


        if (
            !Array.isArray(
                users
            )
        ) {

            return [];

        }


        return users.filter(
            user =>
                user &&
                typeof user === "object" &&
                user.id &&
                user.name &&
                user.email &&
                user.password
        );

    } catch (error) {

        console.error(
            "Visium | Contas inválidas:",
            error
        );


        return [];

    }

}


function saveUsers(
    users
) {

    localStorage.setItem(

        VISIUM_USERS_STORAGE_KEY,

        JSON.stringify(
            users
        )

    );

}


/* ==========================================================================
   Inicialização das contas
========================================================================== */

function initializeUsers() {

    const users =
        getStoredUsers();


    const devUserExists =
        users.some(
            user =>
                normalizeEmail(
                    user.email
                ) ===
                VISIUM_DEV_USER.email
        );


    if (
        !devUserExists
    ) {

        users.push({

            ...VISIUM_DEV_USER,

            password:
                VISIUM_DEV_PASSWORD

        });


        saveUsers(
            users
        );

    }

}


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


        return {

            id:
                user.id,

            name:
                user.name,

            email:
                user.email,

            createdAt:
                user.createdAt || null

        };

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
        normalizeEmail(
            email
        );


    const normalizedPassword =
        String(
            password || ""
        );


    const users =
        getStoredUsers();


    const user =
        users.find(
            account =>
                normalizeEmail(
                    account.email
                ) ===
                normalizedEmail
        );


    if (
        !user ||
        user.password !==
        normalizedPassword
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


    const sessionUser = {

        id:
            user.id,

        name:
            user.name,

        email:
            user.email,

        createdAt:
            user.createdAt || null

    };


    localStorage.setItem(

        VISIUM_AUTH_STORAGE_KEY,

        JSON.stringify(
            sessionUser
        )

    );


    return {

        success:
            true,

        user:
            sessionUser

    };

}


/* ==========================================================================
   Cadastro
========================================================================== */

function register(
    name,
    email,
    password,
    termsAccepted
) {

    const normalizedName =
        String(
            name || ""
        )
            .trim();


    const normalizedEmail =
        normalizeEmail(
            email
        );


    const normalizedPassword =
        String(
            password || ""
        );


    /* ----------------------------------------------------------------------
       Nome
    ---------------------------------------------------------------------- */

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


    /* ----------------------------------------------------------------------
       E-mail
    ---------------------------------------------------------------------- */

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


    /* ----------------------------------------------------------------------
       Senha
    ---------------------------------------------------------------------- */

    if (
        normalizedPassword.length <
        8
    ) {

        return {

            success:
                false,

            code:
                "INVALID_PASSWORD",

            message:
                "A senha deve possuir pelo menos 8 caracteres."

        };

    }


    if (
        !/[A-Za-zÀ-ÿ]/.test(
            normalizedPassword
        ) ||
        !/\d/.test(
            normalizedPassword
        )
    ) {

        return {

            success:
                false,

            code:
                "INVALID_PASSWORD",

            message:
                "A senha deve conter pelo menos uma letra e um número."

        };

    }


    /* ----------------------------------------------------------------------
       Termos
    ---------------------------------------------------------------------- */

    if (
        termsAccepted !== true
    ) {

        return {

            success:
                false,

            code:
                "TERMS_NOT_ACCEPTED",

            message:
                "Você precisa aceitar os Termos de Uso."

        };

    }


    /* ----------------------------------------------------------------------
       Verificação de duplicidade
    ---------------------------------------------------------------------- */

    const users =
        getStoredUsers();


    const existingUser =
        users.find(
            user =>
                normalizeEmail(
                    user.email
                ) ===
                normalizedEmail
        );


    if (
        existingUser
    ) {

        return {

            success:
                false,

            code:
                "EMAIL_ALREADY_EXISTS",

            message:
                "Já existe uma conta cadastrada com este e-mail."

        };

    }


    /* ----------------------------------------------------------------------
       Criação
    ---------------------------------------------------------------------- */

    const newUser = {

        id:
            generateUserId(),

        name:
            normalizedName,

        email:
            normalizedEmail,

        password:
            normalizedPassword,

        createdAt:
            new Date()
                .toISOString()

    };


    users.push(
        newUser
    );


    saveUsers(
        users
    );


    /* ----------------------------------------------------------------------
       Criação da sessão
    ---------------------------------------------------------------------- */

    const sessionUser = {

        id:
            newUser.id,

        name:
            newUser.name,

        email:
            newUser.email,

        createdAt:
            newUser.createdAt

    };


    localStorage.setItem(

        VISIUM_AUTH_STORAGE_KEY,

        JSON.stringify(
            sessionUser
        )

    );


    return {

        success:
            true,

        user:
            sessionUser

    };

}

/* ==========================================================================
   Recuperação de senha
========================================================================== */

const PASSWORD_RESET_STORAGE_KEY =
    "visium_password_reset";


const PASSWORD_RESET_EXPIRATION_MS =
    15 * 60 * 1000;


function generatePasswordResetToken() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID ===
        "function"
    ) {

        return window.crypto.randomUUID();

    }


    const randomPart =
        Math.random()
            .toString(36)
            .slice(2);


    return `${Date.now()}-${randomPart}`;

}


function requestPasswordReset(
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

            message:
                "Informe um e-mail válido."

        };

    }


    const users =
        getStoredUsers();


    const user =
        users.find(
            (item) =>
                normalizeEmail(
                    item.email
                ) === normalizedEmail
        );


    /*
     * Não revelamos se o e-mail existe.
     *
     * Porém, para o ambiente local do Visium,
     * precisamos criar o token somente quando
     * encontramos uma conta válida.
     */

    if (!user) {

        return {

            success:
                false,

            message:
                "Não encontramos uma conta com este e-mail."

        };

    }


    const token =
        generatePasswordResetToken();


    const resetData = {

        token,

        userId:
            user.id,

        email:
            normalizedEmail,

        expiresAt:
            Date.now() +
            PASSWORD_RESET_EXPIRATION_MS

    };


    localStorage.setItem(
        PASSWORD_RESET_STORAGE_KEY,
        JSON.stringify(
            resetData
        )
    );


    return {

        success:
            true,

        token

    };

}


function resetPassword(
    token,
    newPassword
) {

    const normalizedToken =
        String(
            token || ""
        ).trim();


    if (!normalizedToken) {

        return {

            success:
                false,

            message:
                "Token de recuperação inválido."

        };

    }


    if (
        typeof newPassword !==
        "string"
    ) {

        return {

            success:
                false,

            message:
                "Informe uma nova senha."

        };

    }


    if (
        newPassword.length <
        8
    ) {

        return {

            success:
                false,

            message:
                "A senha deve possuir pelo menos 8 caracteres."

        };

    }


    if (
        !/[A-Za-z]/.test(
            newPassword
        ) ||
        !/\d/.test(
            newPassword
        )
    ) {

        return {

            success:
                false,

            message:
                "A senha deve conter pelo menos uma letra e um número."

        };

    }


    const storedReset =
        localStorage.getItem(
            PASSWORD_RESET_STORAGE_KEY
        );


    if (!storedReset) {

        return {

            success:
                false,

            message:
                "A recuperação de senha não está disponível ou expirou."

        };

    }


    let resetData;


    try {

        resetData =
            JSON.parse(
                storedReset
            );

    } catch (error) {

        localStorage.removeItem(
            PASSWORD_RESET_STORAGE_KEY
        );


        return {

            success:
                false,

            message:
                "A recuperação de senha é inválida."

        };

    }


    if (
        resetData.token !==
        normalizedToken
    ) {

        return {

            success:
                false,

            message:
                "Token de recuperação inválido."

        };

    }


    if (
        Date.now() >
        Number(
            resetData.expiresAt
        )
    ) {

        localStorage.removeItem(
            PASSWORD_RESET_STORAGE_KEY
        );


        return {

            success:
                false,

            message:
                "O link de recuperação expirou."

        };

    }


    const users =
        getStoredUsers();


    const userIndex =
        users.findIndex(
            (item) =>
                item.id ===
                resetData.userId
        );


    if (
        userIndex ===
        -1
    ) {

        localStorage.removeItem(
            PASSWORD_RESET_STORAGE_KEY
        );


        return {

            success:
                false,

            message:
                "Usuário não encontrado."

        };

    }


    users[userIndex].password =
        newPassword;


    saveUsers(
        users
    );


    /*
     * O token é de uso único.
     */

    localStorage.removeItem(
        PASSWORD_RESET_STORAGE_KEY
    );


    return {

        success:
            true,

        message:
            "Senha redefinida com sucesso."

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

    register,

    logout,

    requireAuthentication,

    requestPasswordReset,
    resetPassword,

};


/* ==========================================================================
   Inicialização
========================================================================== */

initializeUsers();