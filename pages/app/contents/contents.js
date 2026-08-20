/**
 * ==========================================================================
 * Visium
 * Arquivo: contents.js
 *
 * Comportamentos da pÃ¡gina de conteÃºdos da Ã¡rea autenticada.
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
                `NÃ£o foi possÃ­vel carregar ${path}.`
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
   SessÃ£o
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
            "Visium | SessÃ£o invÃ¡lida:",
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
            "UsuÃ¡rio";

    }

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
                ? "1 conteÃºdo"
                : `${visibleCount} conteÃºdos`;

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
                 * e tambÃ©m do layout do CSS Grid.
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
   InicializaÃ§Ã£o
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
            "Visium | NÃ£o foi possÃ­vel inicializar os componentes da Ã¡rea autenticada."
        );


        return;

    }


    updateHeaderUser(
        user
    );

    initializeContentsFilters();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeContentsPage
);
