/**
 * ==========================================================================
 * Visium
 * Arquivo: dashboard.js
 *
 * Inicialização e comportamento do Dashboard.
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
            await fetch(path);


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

function getCurrentUser() {

    const storedUser =
        localStorage.getItem(
            "visium_user"
        );


    if (!storedUser) {

        return null;

    }


    try {

        return JSON.parse(
            storedUser
        );

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

        /*
         * A página de login será criada posteriormente.
         * A rota já fica definida desde agora.
         */

        window.location.href =
            "/pages/auth/login/login.html";


        return null;

    }


    return user;

}


/* ==========================================================================
   Saudação
========================================================================== */

function getFirstName(
    name
) {

    if (!name) {

        return "estudante";

    }


    return name
        .trim()
        .split(/\s+/)[0];

}


function updateGreeting(
    user
) {

    const greeting =
        document.querySelector(
            "#dashboardGreeting"
        );


    if (!greeting) {

        return;

    }


    const firstName =
        getFirstName(
            user?.name
        );


    greeting.textContent =
        `Olá, ${firstName}.`;

}


/* ==========================================================================
   Header
========================================================================== */

function updateHeaderUser(
    user
) {

    const headerUserName =
        document.querySelector(
            "#headerUserName"
        );


    if (
        headerUserName &&
        user
    ) {

        headerUserName.textContent =
            user.name ||
            "Usuário";

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

            const isOpen =
                sidebar.classList.contains(
                    "is-open"
                );


            if (isOpen) {

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
                    () => {

                        closeSidebar();

                    }
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


            /*
             * Regra do projeto:
             * ao sair, retornar para a Landing Page.
             */

            window.location.href =
                "/index.html";

        }
    );

}


/* ==========================================================================
   Perfil
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
   Inicialização
========================================================================== */

async function initializeDashboard() {

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


    if (!sidebarLoaded || !headerLoaded) {

        return;

    }


    updateGreeting(
        user
    );


    updateHeaderUser(
        user
    );


    initializeSidebar();

    initializeLogout();

    initializeProfileButton();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);