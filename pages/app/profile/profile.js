/**
 * ==========================================================================
 * Visium
 * Arquivo: profile.js
 *
 * Controle da página Meu Perfil.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Configuração
========================================================================== */

const COMPONENTS = {

    header:
        "/components/header/header.html"

};


const PROFILE_LOGIN_URL =
    "/pages/auth/login/login.html";


/* ==========================================================================
   Elementos
========================================================================== */

const profileForm =
    document.querySelector(
        "#profileForm"
    );


const profileName =
    document.querySelector(
        "#profileName"
    );


const profileEmailInput =
    document.querySelector(
        "#profileEmailInput"
    );


const profileNameError =
    document.querySelector(
        "#profileNameError"
    );


const profileEmailError =
    document.querySelector(
        "#profileEmailError"
    );


const profileFeedback =
    document.querySelector(
        "#profileFeedback"
    );


const saveProfileButton =
    document.querySelector(
        "#saveProfileButton"
    );


const profileAvatar =
    document.querySelector(
        "#profileAvatar"
    );


const profileTitle =
    document.querySelector(
        "#profileTitle"
    );


const profileEmail =
    document.querySelector(
        "#profileEmail"
    );


const deleteAccountButton =
    document.querySelector(
        "#deleteAccountButton"
    );


/* ==========================================================================
   Component Loader
========================================================================== */

async function loadComponent(
    selector,
    path
) {

    const container =
        document.querySelector(
            selector
        );


    if (!container) {

        return false;

    }


    try {

        const response =
            await fetch(
                path
            );


        if (!response.ok) {

            throw new Error(
                `Não foi possível carregar ${path}.`
            );

        }


        container.innerHTML =
            await response.text();


        return true;

    } catch (error) {

        console.error(
            "Visium | Erro ao carregar componente:",
            error
        );

        return false;

    }

}


/* ==========================================================================
   Sessão
========================================================================== */

async function getCurrentUser() {

    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.getCurrentUser !==
        "function"
    ) {

        console.error(
            "Visium | Serviço de autenticação não carregado."
        );

        return null;

    }


    return await window.VisiumAuth.getCurrentUser();

}


async function requireAuthentication() {

    const user =
        await getCurrentUser();


    if (!user) {

        window.location.replace(
            PROFILE_LOGIN_URL
        );

        return null;

    }


    return user;

}


/* ==========================================================================
   Avatar
========================================================================== */

function getUserInitials(
    name
) {

    const normalizedName =
        String(
            name || ""
        )
            .trim();


    if (!normalizedName) {

        return "US";

    }


    const parts =
        normalizedName
            .split(/\s+/)
            .filter(Boolean);


    if (parts.length === 1) {

        return parts[0]
            .slice(
                0,
                2
            )
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


/* ==========================================================================
   Atualização da visualização
========================================================================== */

function updateProfileView(
    user
) {

    if (!user) {

        return;

    }


    const name =
        String(
            user.name || ""
        ).trim();


    const email =
        String(
            user.email || ""
        ).trim();


    if (profileTitle) {

        profileTitle.textContent =
            name ||
            "Usuário";

    }


    if (profileEmail) {

        profileEmail.textContent =
            email ||
            "";

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            getUserInitials(
                name
            );

    }


    const headerUserName =
        document.querySelector(
            "#headerUserName"
        );


    if (headerUserName) {

        headerUserName.textContent =
            name ||
            "Usuário";

    }


    const headerUserInitials =
        document.querySelector(
            "#headerUserInitials"
        );


    if (headerUserInitials) {

        headerUserInitials.textContent =
            getUserInitials(
                name
            );

    }


    if (profileName) {

        profileName.value =
            name;

    }


    if (profileEmailInput) {

        profileEmailInput.value =
            email;

    }

}


/* ==========================================================================
   Validação
========================================================================== */

function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


/* ==========================================================================
   Erros
========================================================================== */

function clearFieldError(
    field,
    errorElement
) {

    if (field) {

        field.removeAttribute(
            "aria-invalid"
        );

    }


    if (errorElement) {

        errorElement.textContent =
            "";

        errorElement.hidden =
            true;

    }

}


function setFieldError(
    field,
    errorElement,
    message
) {

    if (field) {

        field.setAttribute(
            "aria-invalid",
            "true"
        );

    }


    if (errorElement) {

        errorElement.textContent =
            message;

        errorElement.hidden =
            false;

    }

}


/* ==========================================================================
   Validação do formulário
========================================================================== */

function validateProfileForm() {

    clearFieldError(
        profileName,
        profileNameError
    );


    clearFieldError(
        profileEmailInput,
        profileEmailError
    );


    hideFeedback();


    const name =
        String(
            profileName?.value || ""
        )
            .trim();


    const email =
        String(
            profileEmailInput?.value || ""
        )
            .trim()
            .toLowerCase();


    let isValid =
        true;


    if (!name) {

        setFieldError(
            profileName,
            profileNameError,
            "Informe seu nome."
        );

        isValid =
            false;

    } else if (
        name.length < 2
    ) {

        setFieldError(
            profileName,
            profileNameError,
            "O nome deve possuir pelo menos 2 caracteres."
        );

        isValid =
            false;

    }


    if (!email) {

        setFieldError(
            profileEmailInput,
            profileEmailError,
            "Informe seu e-mail."
        );

        isValid =
            false;

    } else if (
        !isValidEmail(
            email
        )
    ) {

        setFieldError(
            profileEmailInput,
            profileEmailError,
            "Informe um e-mail válido."
        );

        isValid =
            false;

    }


    return {

        isValid,

        name,

        email

    };

}


/* ==========================================================================
   Feedback
========================================================================== */

function showFeedback(
    message,
    type = "error"
) {

    if (!profileFeedback) {

        return;

    }


    profileFeedback.textContent =
        message;


    profileFeedback.classList.toggle(
        "is-success",
        type === "success"
    );


    profileFeedback.hidden =
        false;

}


function hideFeedback() {

    if (!profileFeedback) {

        return;

    }


    profileFeedback.textContent =
        "";


    profileFeedback.classList.remove(
        "is-success"
    );


    profileFeedback.hidden =
        true;

}


/* ==========================================================================
   Estado do botão
========================================================================== */

function setLoading(
    isLoading
) {

    if (!saveProfileButton) {

        return;

    }


    saveProfileButton.disabled =
        isLoading;


    saveProfileButton.textContent =
        isLoading
            ? "Salvando..."
            : "Salvar alterações";

}


/* ==========================================================================
   Atualização do perfil
========================================================================== */

async function handleProfileSubmit(
    event
) {

    event.preventDefault();


    const validation =
        validateProfileForm();


    if (!validation.isValid) {

        return;

    }


    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.updateProfile !==
        "function"
    ) {

        console.error(
            "Visium | Serviço de atualização de perfil não carregado."
        );


        showFeedback(
            "Não foi possível carregar o serviço de perfil."
        );

        return;

    }


    setLoading(
        true
    );


    try {

        const result =
            await window.VisiumAuth.updateProfile(
                validation.name,
                validation.email
            );


        if (
            !result ||
            !result.success
        ) {

            showFeedback(
                result?.message ||
                "Não foi possível atualizar seus dados."
            );

            return;

        }


        const updatedUser =
            result.user ||
            await getCurrentUser();


        if (updatedUser) {

            updateProfileView(
                updatedUser
            );

        }


        showFeedback(
            "Seus dados foram atualizados com sucesso.",
            "success"
        );

    } catch (error) {

        console.error(
            "Visium | Erro ao atualizar perfil:",
            error
        );


        showFeedback(
            "Não foi possível atualizar seus dados. Tente novamente."
        );

    } finally {

        setLoading(
            false
        );

    }

}


async function handleDeleteAccount() {

    const confirmed =
        window.confirm(
            "Excluir seu cadastro é permanente. Deseja continuar?"
        );


    if (!confirmed) {

        return;

    }


    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.deleteAccount !==
        "function"
    ) {

        showFeedback(
            "Não foi possível carregar o serviço da conta."
        );

        return;

    }


    deleteAccountButton.disabled =
        true;

    deleteAccountButton.textContent =
        "Excluindo...";


    const result =
        await window.VisiumAuth.deleteAccount();


    if (
        !result ||
        !result.success
    ) {

        deleteAccountButton.disabled =
            false;

        deleteAccountButton.textContent =
            "Excluir cadastro";

        showFeedback(
            result?.message ||
            "Não foi possível excluir seu cadastro."
        );

        return;

    }


    window.location.replace(
        "/pages/public/landing/index.html"
    );

}


/* ==========================================================================
   Formulário
========================================================================== */

function initializeProfileForm() {

    if (
        !profileForm ||
        !profileName ||
        !profileEmailInput ||
        !saveProfileButton
    ) {

        console.error(
            "Visium | Estrutura do formulário de perfil não encontrada."
        );

        return;

    }


    profileForm.addEventListener(
        "submit",
        handleProfileSubmit
    );


    profileName.addEventListener(
        "input",
        () => {

            clearFieldError(
                profileName,
                profileNameError
            );

        }
    );


    profileEmailInput.addEventListener(
        "input",
        () => {

            clearFieldError(
                profileEmailInput,
                profileEmailError
            );

        }
    );


    if (deleteAccountButton) {

        deleteAccountButton.addEventListener(
            "click",
            handleDeleteAccount
        );

    }

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeProfile() {

    const user =
        await requireAuthentication();


    if (!user) {

        return;

    }


    const headerLoaded =
        await loadComponent(
            "#appHeaderContainer",
            COMPONENTS.header
        );


    if (!headerLoaded) {

        console.error(
            "Visium | Não foi possível carregar o cabeçalho."
        );

        return;

    }


    updateProfileView(
        user
    );


    initializeProfileForm();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeProfile
);