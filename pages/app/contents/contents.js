/**
 * ==========================================================================
 * Visium
 * Arquivo: contents.js
 *
 * Comportamentos da página de conteúdos da área autenticada.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Componentes
========================================================================== */

const CONTENTS_COMPONENTS = {

    header:
        "/components/header/header.html",

    sidebar:
        "/components/sidebar/sidebar.html"

};


/* ==========================================================================
   Carregamento de componentes
========================================================================== */

async function loadContentsComponent(
    selector,
    path
) {

    const container =
        document.querySelector(selector);


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

        window.location.href =
            "/pages/auth/login/login.html";


        return null;

    }


    return user;

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


    if (!sidebar) {

        return;

    }


    /*
     * A página atual é Conteúdos.
     *
     * O sidebar possui "Início" marcado
     * diretamente no HTML do componente.
     *
     * Removemos esse estado e marcamos
     * somente o link correspondente à
     * página atual.
     */

    sidebar
        .querySelectorAll(
            ".app-sidebar__link"
        )
        .forEach(
            (link) => {

                link.classList.remove(
                    "is-active"
                );


                link.setAttribute(
                    "aria-current",
                    "false"
                );

            }
        );


    const currentLink =
        sidebar.querySelector(
            '[data-page="contents"]'
        );


    if (currentLink) {

        currentLink.classList.add(
            "is-active"
        );


        currentLink.setAttribute(
            "aria-current",
            "page"
        );

    }


    /*
     * Em desktop não precisamos do
     * comportamento de abertura.
     */

    if (
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


            localStorage.removeItem(
                "visium_logged"
            );


            localStorage.removeItem(
                "visium_session"
            );


            window.location.href =
                "/pages/public/landing/index.html";

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
   Filtros e busca
========================================================================== */

function initializeContentsFilters() {

    const searchInput =
        document.querySelector(
            "#contentSearch"
        );


    const filterButtons =
        Array.from(
            document.querySelectorAll(
                ".contents-filter"
            )
        );


    const cards =
        Array.from(
            document.querySelectorAll(
                "#contentsGrid .library-card"
            )
        );


    const countElement =
        document.querySelector(
            "#contentsCount"
        );


    const emptyElement =
        document.querySelector(
            "#contentsEmpty"
        );


    if (
        !cards.length
    ) {

        return;

    }


    let activeFilter =
        "all";


    function normalizeText(
        value
    ) {

        return String(
            value || ""
        )
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim();

    }


    function updateFilterButtons() {

        filterButtons.forEach(
            (button) => {

                const filter =
                    button.dataset.filter ||
                    "all";


                const isActive =
                    filter === activeFilter;


                button.classList.toggle(
                    "is-active",
                    isActive
                );


                button.setAttribute(
                    "aria-pressed",
                    String(
                        isActive
                    )
                );

            }
        );

    }


    function updateCount(
        visibleCount
    ) {

        if (!countElement) {

            return;

        }


        countElement.textContent =
            visibleCount === 1
                ? "1 conteúdo"
                : `${visibleCount} conteúdos`;

    }


    function updateEmptyState(
        visibleCount
    ) {

        if (!emptyElement) {

            return;

        }


        emptyElement.hidden =
            visibleCount !== 0;

    }


    function filterCards() {

        const searchTerm =
            normalizeText(
                searchInput
                    ? searchInput.value
                    : ""
            );


        let visibleCount =
            0;


        cards.forEach(
            (card) => {

                const category =
                    normalizeText(
                        card.dataset.category
                    );


                const title =
                    normalizeText(
                        card.dataset.title
                    );


                const cardText =
                    normalizeText(
                        card.textContent
                    );


                const matchesCategory =
                    activeFilter === "all" ||
                    category ===
                    normalizeText(
                        activeFilter
                    );


                const matchesSearch =
                    !searchTerm ||
                    title.includes(
                        searchTerm
                    ) ||
                    cardText.includes(
                        searchTerm
                    );


                const shouldShow =
                    matchesCategory &&
                    matchesSearch;


                /*
                 * Usamos a propriedade nativa "hidden".
                 *
                 * Isso remove o card visualmente
                 * e também do layout do CSS Grid.
                 */

                card.hidden =
                    !shouldShow;


                if (shouldShow) {

                    visibleCount++;

                }

            }
        );


        updateCount(
            visibleCount
        );


        updateEmptyState(
            visibleCount
        );

    }


    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    activeFilter =
                        button.dataset.filter ||
                        "all";


                    updateFilterButtons();


                    filterCards();

                }
            );

        }
    );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    updateFilterButtons();


    filterCards();

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeContentsPage() {

    const user =
        requireAuthentication();


    if (!user) {

        return;

    }


    const sidebarLoaded =
        await loadContentsComponent(
            "#appSidebarContainer",
            CONTENTS_COMPONENTS.sidebar
        );


    const headerLoaded =
        await loadContentsComponent(
            "#appHeaderContainer",
            CONTENTS_COMPONENTS.header
        );


    if (
        !sidebarLoaded ||
        !headerLoaded
    ) {

        console.error(
            "Visium | Não foi possível inicializar os componentes da área autenticada."
        );


        return;

    }


    updateHeaderUser(
        user
    );


    initializeSidebar();


    initializeLogout();


    initializeProfileButton();


    initializeContentsFilters();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeContentsPage
);