/**
 * ==========================================================================
 * Visium
 * Arquivo: profile.js
 *
 * Inicialização e comportamento da página Meu Perfil.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Componentes
========================================================================== */

const COMPONENTS = {

    header:
        "/components/header/header.html",

    sidebar:
        "/components/sidebar/sidebar.html"

};


/* ==========================================================================
   Sessão
========================================================================== */

function getCurrentUser() {

    const storedUser =
        localStorage.getItem(
            "visium_user"
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
            typeof user !== "object"
        ) {

            throw new Error(
                "Sessão inválida."
            );

        }


        return user;

    } catch (error) {

        console.error(
            "Visium | Sessão inválida:",
            error
        );


        localStorage.removeItem(
            "visium_user"
        );


        return null;

    }

}


function requireAuthentication() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "/pages/auth/login/login.html";


        return null;

    }


    return user;

}


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
   Sidebar
========================================================================== */

function initializeSidebar() {

    const sidebar =
        document.querySelector(
            "#appSidebar"
        );

    const toggle =
        document.querySelector(
            "#sidebarToggle"
        );

    const overlay =
        document.querySelector(
            "#sidebarOverlay"
        );


    if (
        !sidebar ||
        !toggle ||
        !overlay
    ) {

        return;

    }


    function openSidebar() {

        sidebar.classList.add(
            "is-open"
        );


        overlay.classList.add(
            "is-visible"
        );


        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "is-open"
        );


        overlay.classList.remove(
            "is-visible"
        );


        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    toggle.addEventListener(
        "click",
        () => {

            if (
                sidebar.classList.contains(
                    "is-open"
                )
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    sidebar
        .querySelectorAll(
            ".app-sidebar__link"
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    closeSidebar
                );

            }
        );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Escape"
            ) {

                closeSidebar();

            }

        }
    );

}


/* ==========================================================================
   Logout
========================================================================== */

function initializeLogout() {

    const logoutButton =
        document.querySelector(
            "#logoutButton"
        );


    if (!logoutButton) {

        return;

    }


    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "visium_user"
            );


            window.location.href =
    "/pages/public/landing/index.html";

        }
    );

}


/* ==========================================================================
   Navegação do Perfil
========================================================================== */

function initializeProfileButton() {

    const profileButton =
        document.querySelector(
            "#headerProfileButton"
        );


    if (!profileButton) {

        return;

    }


    profileButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/pages/app/profile/profile.html";

        }
    );

}


/* ==========================================================================
   Utilitários
========================================================================== */

function getUserInitials(
    name
) {

    const normalizedName =
        String(
            name ||
            ""
        )
            .trim();


    if (!normalizedName) {

        return "U";

    }


    const parts =
        normalizedName
            .split(
                /\s+/
            )
            .filter(
                Boolean
            );


    if (
        parts.length === 1
    ) {

        return parts[0]
            .charAt(0)
            .toUpperCase();

    }


    return (
        parts[0].charAt(0) +
        parts[
            parts.length - 1
        ].charAt(0)
    )
        .toUpperCase();

}


/* ==========================================================================
   Interface
========================================================================== */

function updateProfileView(
    user
) {

    const profileTitle =
        document.querySelector(
            "#profileTitle"
        );

    const profileEmail =
        document.querySelector(
            "#profileEmail"
        );

    const profileAvatar =
        document.querySelector(
            "#profileAvatar"
        );

    const profileName =
        document.querySelector(
            "#profileName"
        );

    const profileEmailInput =
        document.querySelector(
            "#profileEmailInput"
        );

    const profileUserId =
        document.querySelector(
            "#profileUserId"
        );


    const name =
        user.name ||
        "Usuário";


    const email =
        user.email ||
        "";


    const id =
        user.id ||
        "Não informado";


    if (profileTitle) {

        profileTitle.textContent =
            name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
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


    if (profileUserId) {

        profileUserId.textContent =
            id;

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


function clearFieldError(
    input,
    errorElement
) {

    if (input) {

        input.removeAttribute(
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
    input,
    errorElement,
    message
) {

    if (input) {

        input.setAttribute(
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


function validateProfileForm() {

    const nameInput =
        document.querySelector(
            "#profileName"
        );

    const emailInput =
        document.querySelector(
            "#profileEmailInput"
        );

    const nameError =
        document.querySelector(
            "#profileNameError"
        );

    const emailError =
        document.querySelector(
            "#profileEmailError"
        );


    clearFieldError(
        nameInput,
        nameError
    );


    clearFieldError(
        emailInput,
        emailError
    );


    const name =
        nameInput
            ?.value
            .trim() ||
        "";


    const email =
        emailInput
            ?.value
            .trim() ||
        "";


    let valid =
        true;


    if (!name) {

        setFieldError(
            nameInput,
            nameError,
            "Informe seu nome."
        );


        valid =
            false;

    } else if (
        name.length < 2
    ) {

        setFieldError(
            nameInput,
            nameError,
            "O nome deve ter pelo menos 2 caracteres."
        );


        valid =
            false;

    }


    if (!email) {

        setFieldError(
            emailInput,
            emailError,
            "Informe seu e-mail."
        );


        valid =
            false;

    } else if (
        !isValidEmail(
            email
        )
    ) {

        setFieldError(
            emailInput,
            emailError,
            "Informe um e-mail válido."
        );


        valid =
            false;

    }


    return {

        valid,

        name,

        email

    };

}


/* ==========================================================================
   Feedback
========================================================================== */

function showFeedback(
    message,
    type
) {

    const feedback =
        document.querySelector(
            "#profileFeedback"
        );


    if (!feedback) {

        return;

    }


    feedback.textContent =
        message;


    feedback.hidden =
        false;


    feedback.classList.remove(
        "is-success",
        "is-error"
    );


    feedback.classList.add(
        type === "error"
            ? "is-error"
            : "is-success"
    );

}


function hideFeedback() {

    const feedback =
        document.querySelector(
            "#profileFeedback"
        );


    if (!feedback) {

        return;

    }


    feedback.hidden =
        true;


    feedback.textContent =
        "";


    feedback.classList.remove(
        "is-success",
        "is-error"
    );

}


/* ==========================================================================
   Formulário
========================================================================== */

function initializeProfileForm(
    user
) {

    const form =
        document.querySelector(
            "#profileForm"
        );


    const saveButton =
        document.querySelector(
            "#saveProfileButton"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "input",
        () => {

            hideFeedback();

        }
    );


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            hideFeedback();


            const result =
                validateProfileForm();


            if (!result.valid) {

                showFeedback(
                    "Revise os campos destacados.",
                    "error"
                );


                return;

            }


            const updatedUser = {

                ...user,

                name:
                    result.name,

                email:
                    result.email

            };


            try {

                localStorage.setItem(
                    "visium_user",
                    JSON.stringify(
                        updatedUser
                    )
                );


                Object.assign(
                    user,
                    updatedUser
                );


                updateProfileView(
                    updatedUser
                );


                showFeedback(
                    "Suas informações foram salvas.",
                    "success"
                );


                if (saveButton) {

                    saveButton.disabled =
                        true;


                    window.setTimeout(
                        () => {

                            saveButton.disabled =
                                false;

                        },
                        600
                    );

                }

            } catch (error) {

                console.error(
                    "Visium | Não foi possível salvar o perfil:",
                    error
                );


                showFeedback(
                    "Não foi possível salvar suas informações.",
                    "error"
                );

            }

        }
    );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeProfile() {

    const user =
        requireAuthentication();


    if (!user) {

        return;

    }


    const sidebarLoaded =
        await loadComponent(
            "#appSidebarContainer",
            COMPONENTS.sidebar
        );


    const headerLoaded =
        await loadComponent(
            "#appHeaderContainer",
            COMPONENTS.header
        );


    if (
        !sidebarLoaded ||
        !headerLoaded
    ) {

        return;

    }


    updateProfileView(
        user
    );


    initializeSidebar();

    initializeLogout();

    initializeProfileButton();

    initializeProfileForm(
        user
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initializeProfile
);