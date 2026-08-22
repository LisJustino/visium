/**
 * ==========================================================================
 * Visium
 * Arquivo: sidebar.js
 *
 * Componente compartilhado de navegação lateral.
 *
 * Responsabilidades:
 * - Carregar o Sidebar.
 * - Identificar automaticamente a página atual.
 * - Marcar o item correspondente como ativo.
 * - Controlar menus expansíveis.
 * - Controlar abertura e fechamento do Sidebar em telas menores.
 * - Controlar o overlay.
 * - Controlar o botão de perfil.
 * - Controlar o logout.
 * ==========================================================================
 */

(function () {

    "use strict";


    /* ==========================================================================
       Configuração
    ========================================================================== */

    const SIDEBAR_SELECTOR =
        "#appSidebarContainer";

    const SIDEBAR_URL =
        "/components/sidebar/sidebar.html?v=20260826";

    let sidebarInitializationPromise =
        null;

    const SUBMENU_CONTENT_ORDER = [
        "interpretacao-de-receita",
        "transposicao",
        "dp-dnp",
        "acuidade-visual",
        "lentes-contato",
        "surfacagem-multifocal-bifocal",
        "montagem",
        "armacoes",
        "patologias",
        "ametropias",
        "anatomia"
    ];


    /* ==========================================================================
       Identificação da página atual
    ========================================================================== */

    function getCurrentPage() {

        const pathname =
            window.location.pathname;

        const segments =
            pathname
                .split("/")
                .filter(Boolean);

        const fileName =
            segments[segments.length - 1];

        if (!fileName) {
            return null;
        }

        return fileName.replace(
            /\.html$/i,
            ""
        );

    }


    /* ==========================================================================
       Estado ativo
    ========================================================================== */

    function setActivePage(sidebar) {

        if (!sidebar) {
            return;
        }

        const currentPage =
            getCurrentPage();

        const links =
            sidebar.querySelectorAll(
                ".app-sidebar__link:not(.app-sidebar__link--expandable), .app-sidebar__sublink"
            );

        links.forEach(
            (link) => {

                link.classList.remove(
                    "is-active"
                );

                link.removeAttribute(
                    "aria-current"
                );

            }
        );


        if (!currentPage) {
            return;
        }


        /*
         * Links principais
         */

        const mainLink =
            Array.from(
                sidebar.querySelectorAll(
                    ".app-sidebar__link:not(.app-sidebar__link--expandable)"
                )
            ).find(
                (link) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (href) {

                            const url =
                                new URL(
                                    href,
                                    window.location.origin
                                );

                            const targetPage =
                                url.pathname
                                    .split("/")
                                    .filter(Boolean)
                                    .pop()
                                    ?.replace(
                                        /\.html$/i,
                                        ""
                                    );

                            if (
                                targetPage === currentPage &&
                                url.hash
                            ) {

                                return url.hash ===
                                    window.location.hash;

                            }

                            if (
                                targetPage === currentPage &&
                                !url.hash &&
                                window.location.hash
                            ) {

                                return false;

                            }

                        }

                    const pages =
                        (link.dataset.page || "")
                            .split(/\s+/)
                            .filter(Boolean);

                    return pages.includes(
                        currentPage
                    );

                }
            );


        if (mainLink) {

            mainLink.classList.add(
                "is-active"
            );

            mainLink.setAttribute(
                "aria-current",
                "page"
            );

        }


        /*
         * Links do submenu
         */

        const subLinks =
            sidebar.querySelectorAll(
                ".app-sidebar__sublink"
            );

        let activeSubLink = null;

        subLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (!href) {
                    return;
                }

                const url =
                    new URL(
                        href,
                        window.location.origin
                    );

                const targetPage =
                    url.pathname
                        .split("/")
                        .filter(Boolean)
                        .pop()
                        ?.replace(
                            /\.html$/i,
                            ""
                        );

                if (
                    targetPage ===
                    currentPage
                ) {

                    /*
                     * Se for a página de conteúdos,
                     * o link "Todos os conteúdos" será
                     * considerado ativo apenas quando
                     * não existir uma categoria na URL.
                     */

                    if (
                        link.dataset.contentCategory ===
                        "all"
                    ) {

                        if (
                            !url.search &&
                            !window.location.search
                        ) {

                            activeSubLink =
                                link;

                        }

                        return;
                    }

                    /*
                     * Para categorias, compara a query.
                     */

                    if (
                        url.search ===
                        window.location.search
                    ) {

                        activeSubLink =
                            link;

                    }

                }

            }
        );


        if (activeSubLink) {

            activeSubLink.classList.add(
                "is-active"
            );

            activeSubLink.setAttribute(
                "aria-current",
                "page"
            );


            /*
             * Abre automaticamente o grupo
             * quando estamos dentro dele.
             */

            const group =
                activeSubLink.closest(
                    ".app-sidebar__group"
                );

            if (group) {

                openGroup(
                    group
                );

            }

        }

    }


    /* ==========================================================================
       Abrir grupo
    ========================================================================== */

    function openGroup(group) {

        if (!group) {
            return;
        }

        const button =
            group.querySelector(
                ".app-sidebar__group-toggle, .app-sidebar__link--expandable"
            );

        const submenu =
            group.querySelector(
                ".app-sidebar__submenu"
            );

        if (!button || !submenu) {
            return;
        }


        group.classList.add(
            "is-open"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );

        submenu.hidden =
            false;

        submenu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* ==========================================================================
       Fechar grupo
    ========================================================================== */

    function closeGroup(group) {

        if (!group) {
            return;
        }

        const button =
            group.querySelector(
                ".app-sidebar__group-toggle, .app-sidebar__link--expandable"
            );

        const submenu =
            group.querySelector(
                ".app-sidebar__submenu"
            );

        if (!button || !submenu) {
            return;
        }


        group.classList.remove(
            "is-open"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        submenu.hidden =
            true;

        submenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    function sortSubmenuLinks(sidebar) {

        const submenu =
            sidebar?.querySelector(
                "#contentsSubmenu"
            );

        if (!submenu) {
            return;
        }

        const links =
            Array.from(
                submenu.querySelectorAll(
                    ".app-sidebar__sublink"
                )
            );

        links
            .sort(
                (firstLink, secondLink) => {
                    const firstContent =
                        new URL(
                            firstLink.href
                        ).searchParams.get(
                            "content"
                        );

                    const secondContent =
                        new URL(
                            secondLink.href
                        ).searchParams.get(
                            "content"
                        );

                    const firstIndex =
                        SUBMENU_CONTENT_ORDER.indexOf(firstContent);

                    const secondIndex =
                        SUBMENU_CONTENT_ORDER.indexOf(secondContent);

                    return (firstIndex < 0 ? Number.MAX_SAFE_INTEGER : firstIndex) -
                        (secondIndex < 0 ? Number.MAX_SAFE_INTEGER : secondIndex);
                }
            )
            .forEach(
                (link) => submenu.appendChild(link)
            );

    }


    /* ==========================================================================
       Alternar grupo
    ========================================================================== */

    function toggleGroup(group) {

        if (!group) {
            return;
        }

        if (
            group.classList.contains(
                "is-open"
            )
        ) {

            closeGroup(
                group
            );

            return;
        }


        /*
         * Fecha outros grupos antes de abrir
         * o grupo atual.
         */

        const sidebar =
            group.closest(
                ".app-sidebar"
            );

        if (sidebar) {

            sidebar
                .querySelectorAll(
                    ".app-sidebar__group.is-open"
                )
                .forEach(
                    (openGroupElement) => {

                        if (
                            openGroupElement !==
                            group
                        ) {

                            closeGroup(
                                openGroupElement
                            );

                        }

                    }
                );

        }


        openGroup(
            group
        );

    }


    /* ==========================================================================
       Inicializar menus expansíveis
    ========================================================================== */

    function initializeExpandableMenus(sidebar) {

        if (!sidebar) {
            return;
        }

        const groups =
            sidebar.querySelectorAll(
                ".app-sidebar__group"
            );


        groups.forEach(
            (group) => {

                const button =
                    group.querySelector(
                        ".app-sidebar__group-toggle, .app-sidebar__link--expandable"
                    );

                const submenu =
                    group.querySelector(
                        ".app-sidebar__submenu"
                    );

                if (!button || !submenu) {
                    return;
                }


                if (
                    button.dataset.initialized ===
                    "true"
                ) {
                    return;
                }


                button.dataset.initialized =
                    "true";


                /*
                 * Estado inicial.
                 */

                const isOpen =
                    group.classList.contains(
                        "is-open"
                    );


                button.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                submenu.setAttribute(
                    "aria-hidden",
                    String(!isOpen)
                );


                if (!isOpen) {
                    submenu.hidden =
                        true;
                }


                /*
                 * Clique.
                 */

                button.addEventListener(
                    "click",
                    () => {

                        toggleGroup(
                            group
                        );

                    }
                );

            }
        );

    }


    /* ==========================================================================
       Botão de perfil
    ========================================================================== */

    function initializeProfileButton() {

        const profileButton =
            document.querySelector(
                "#headerProfileButton"
            );

        if (!profileButton) {
            return;
        }

        if (
            profileButton.dataset.initialized ===
            "true"
        ) {
            return;
        }

        profileButton.dataset.initialized =
            "true";

        profileButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "/pages/app/profile/profile.html";

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

        if (
            logoutButton.dataset.initialized ===
            "true"
        ) {
            return;
        }

        logoutButton.dataset.initialized =
            "true";

        logoutButton.addEventListener(
            "click",
            () => {

                if (
                    window.VisiumAuth &&
                    typeof window.VisiumAuth.logout ===
                    "function"
                ) {

                    window.VisiumAuth.logout();

                    return;
                }


                localStorage.removeItem(
                    "visium_user"
                );


                window.location.assign(
                    "/pages/public/landing/index.html"
                );

            }
        );

    }


    /* ==========================================================================
       Controle mobile do Sidebar
    ========================================================================== */

    function initializeSidebarBehavior(sidebar) {

        if (!sidebar) {
            return;
        }

        if (
            sidebar.dataset.behaviorAttached ===
            "true"
        ) {
            return;
        }


        const toggle =
            document.querySelector(
                "#sidebarToggle"
            );

        const overlay =
            document.querySelector(
                "#sidebarOverlay"
            );


        if (!toggle || !overlay) {
            return;
        }


        sidebar.dataset.behaviorAttached =
            "true";

        let lastFocusedElement =
            null;

        function updateSidebarAccessibility(
            isOpen
        ) {

            const isMobile =
                window.innerWidth <=
                900;

            sidebar.setAttribute(
                "aria-hidden",
                String(
                    isMobile && !isOpen
                )
            );

            sidebar.inert =
                isMobile && !isOpen;

        }


        /* ======================================================================
           Abrir
        ====================================================================== */

        function openSidebar() {

            lastFocusedElement =
                document.activeElement;

            sidebar.classList.add(
                "is-open"
            );

            overlay.classList.add(
                "is-visible"
            );

            overlay.setAttribute(
                "aria-hidden",
                "false"
            );

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

            updateSidebarAccessibility(
                true
            );

            const firstFocusable =
                sidebar.querySelector(
                    "a, button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
                );

            if (firstFocusable) {

                firstFocusable.focus();

            }

        }


        /* ======================================================================
           Fechar
        ====================================================================== */

        function closeSidebar() {

            sidebar.classList.remove(
                "is-open"
            );

            overlay.classList.remove(
                "is-visible"
            );

            overlay.setAttribute(
                "aria-hidden",
                "true"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            updateSidebarAccessibility(
                false
            );

            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus ===
                "function"
            ) {

                lastFocusedElement.focus();

                lastFocusedElement =
                    null;

            }

        }


        /* ======================================================================
           Toggle
        ====================================================================== */

        toggle.addEventListener(
            "click",
            () => {

                if (
                    sidebar.classList.contains(
                        "is-open"
                    )
                ) {

                    closeSidebar();

                    return;
                }

                openSidebar();

            }
        );


        /* ======================================================================
           Overlay
        ====================================================================== */

        overlay.addEventListener(
            "click",
            closeSidebar
        );

        updateSidebarAccessibility(
            false
        );


        /* ======================================================================
           Links
        ====================================================================== */

        sidebar
            .querySelectorAll(
                ".app-sidebar__sublink, .app-sidebar__link:not(.app-sidebar__link--expandable)"
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


        /* ======================================================================
           Escape
        ====================================================================== */

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


        /* ======================================================================
           Resize
        ====================================================================== */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >
                    900
                ) {

                    closeSidebar();

                    updateSidebarAccessibility(
                        false
                    );

                }

            }
        );

    }


    /* ==========================================================================
       Carregamento do Sidebar
    ========================================================================== */

    async function initializeSidebarInternal() {

        const container =
            document.querySelector(
                SIDEBAR_SELECTOR
            );

        if (!container) {
            return;
        }


        /* ======================================================================
           Já carregado
        ====================================================================== */

        if (
            container.dataset.loaded ===
            "true"
        ) {

            const sidebar =
                container.querySelector(
                    "#appSidebar"
                );

            if (sidebar) {

                sortSubmenuLinks(
                    sidebar
                );

                initializeExpandableMenus(
                    sidebar
                );

                setActivePage(
                    sidebar
                );

                initializeSidebarBehavior(
                    sidebar
                );

            }

            initializeProfileButton();
            initializeLogout();

            return;
        }


        /* ======================================================================
           Carregamento
        ====================================================================== */

        try {

            const response =
                await fetch(
                    SIDEBAR_URL
                );


            if (!response.ok) {

                throw new Error(
                    `Falha ao carregar Sidebar: ${response.status}`
                );

            }


            const html =
                await response.text();


            container.innerHTML =
                html;


            container.dataset.loaded =
                "true";


            const sidebar =
                container.querySelector(
                    "#appSidebar"
                );


            if (!sidebar) {

                throw new Error(
                    "Elemento #appSidebar não encontrado."
                );

            }


            /* ==================================================================
               Inicializações
            ================================================================== */

            sortSubmenuLinks(
                sidebar
            );

            initializeExpandableMenus(
                sidebar
            );

            setActivePage(
                sidebar
            );

            initializeSidebarBehavior(
                sidebar
            );

            initializeProfileButton();

            initializeLogout();


        } catch (error) {

            console.error(
                "[Visium] Erro ao carregar Sidebar:",
                error
            );

        }

    }


    async function initializeSidebar() {

        if (sidebarInitializationPromise) {

            return sidebarInitializationPromise;

        }


        sidebarInitializationPromise =
            initializeSidebarInternal();


        try {

            return await sidebarInitializationPromise;

        } finally {

            sidebarInitializationPromise =
                null;

        }

    }


    /* ==========================================================================
       API pública
    ========================================================================== */

    window.VisiumSidebar = {

        initialize:
            initializeSidebar,

        setActivePage:
            setActivePage,

        initializeExpandableMenus:
            initializeExpandableMenus,

        openGroup:
            openGroup,

        closeGroup:
            closeGroup

    };


    /* ==========================================================================
       Inicialização automática
    ========================================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSidebar
        );

    } else {

        initializeSidebar();

    }

})();
