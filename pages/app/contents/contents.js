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
        "/components/header/header.html?v=20260824"

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

async function getCurrentUser() {

    return window.VisiumAuth?.getCurrentUser() || null;

}


async function requireAuthentication() {

    const user =
        await getCurrentUser();


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

    const contentsGrid =
        document.querySelector(
            "#contentsGrid"
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


    const contentOrder =
        window.VISIUM_CONTENT_ORDER || [];

    const categoryToContentId = {
        receitas: "interpretacao-de-receita",
        optica: "transposicao",
        anatomia: "anatomia",
        ametropias: "ametropias",
        "dp-dnp": "dp-dnp",
        "lentes-contato": "lentes-contato",
        "surfacagem-multifocal-bifocal": "surfacagem-multifocal-bifocal",
        montagem: "montagem",
        armacoes: "armacoes",
        patologias: "patologias"
    };

    cards
        .sort(
            (firstCard, secondCard) => {
                const firstIndex =
                    contentOrder.indexOf(
                        categoryToContentId[firstCard.dataset.category]
                    );

                const secondIndex =
                    contentOrder.indexOf(
                        categoryToContentId[secondCard.dataset.category]
                    );

                return (firstIndex < 0 ? Number.MAX_SAFE_INTEGER : firstIndex) -
                    (secondIndex < 0 ? Number.MAX_SAFE_INTEGER : secondIndex);
            }
        )
        .forEach(
            (card) => contentsGrid?.appendChild(card)
        );


    const initialCategory =
        new URLSearchParams(
            window.location.search
        ).get(
            "category"
        );


    const availableFilters =
        filterButtons.map(
            (button) =>
                button.dataset.filter ||
                "all"
        );


    let activeFilter =
        availableFilters.includes(
            initialCategory
        )
            ? initialCategory
            : "all";


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


                    const url =
                        new URL(
                            window.location.href
                        );


                    if (
                        activeFilter ===
                        "all"
                    ) {

                        url.searchParams.delete(
                            "category"
                        );

                    } else {

                        url.searchParams.set(
                            "category",
                            activeFilter
                        );

                    }


                    window.history.replaceState(
                        {},
                        "",
                        url
                    );


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
        await requireAuthentication();


    if (!user) {

        return;

    }


    const headerLoaded =
        await loadContentsComponent(
            "#appHeaderContainer",
            CONTENTS_COMPONENTS.header
        );


    if (
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

    initializeContentsFilters();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeContentsPage
);
