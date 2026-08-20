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
 * - Controlar abertura e fechamento do Sidebar em telas menores.
 * - Controlar o overlay.
 * - Controlar o logout.
 * ==========================================================================
 */

(function () {

    "use strict";

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
    /* ======================================================================
       Configuração
    ====================================================================== */

    const SIDEBAR_SELECTOR =
        "#appSidebarContainer";


    const SIDEBAR_URL =
        "/components/sidebar/sidebar.html";


    /* ======================================================================
       Identificação da página atual
    ====================================================================== */

    function getCurrentPage() {

        const pathname =
            window.location.pathname;


        const segments =
            pathname
                .split("/")
                .filter(Boolean);


        const fileName =
            segments.at(-1);


        if (!fileName) {

            return null;

        }


        return fileName.replace(
            /\.html$/i,
            ""
        );

    }


    /* ======================================================================
       Estado ativo
    ====================================================================== */

    function setActivePage(sidebar) {

        if (!sidebar) {

            return;

        }


        const currentPage =
            getCurrentPage();


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


        if (!currentPage) {

            return;

        }


        const currentLink =
            sidebar.querySelector(
                `[data-page="${currentPage}"]`
            );


        if (!currentLink) {

            return;

        }


        currentLink.classList.add(
            "is-active"
        );


        currentLink.setAttribute(
            "aria-current",
            "page"
        );

    }


    /* ======================================================================
       Controle do Sidebar
    ====================================================================== */

    function initializeSidebarBehavior(sidebar) {
        initializeProfileButton();

        if (!sidebar) {

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


        /* ==================================================================
           Abrir Sidebar
        ================================================================== */

        function openSidebar() {

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

        }


        /* ==================================================================
           Fechar Sidebar
        ================================================================== */

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

        }


        /* ==================================================================
           Toggle
        ================================================================== */

        toggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    sidebar.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    closeSidebar();

                    return;

                }


                openSidebar();

            }
        );


        /* ==================================================================
           Overlay
        ================================================================== */

        overlay.addEventListener(
            "click",
            closeSidebar
        );


        /* ==================================================================
           Links
        ================================================================== */

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


        /* ==================================================================
           Tecla Escape
        ================================================================== */

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


        /* ==================================================================
           Redimensionamento
        ================================================================== */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >
                    900
                ) {

                    closeSidebar();

                }

            }
        );

    }


    /* ======================================================================
       Logout
    ====================================================================== */

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

                if (
                    window.VisiumAuth &&
                    typeof window.VisiumAuth.logout ===
                    "function"
                ) {

                    window.VisiumAuth.logout();

                    return;

                }


                document.dispatchEvent(
                    new CustomEvent(
                        "visium:logout"
                    )
                );

            }
        );

    }


    /* ======================================================================
       Inicialização
    ====================================================================== */

    async function initializeSidebar() {

        const container =
            document.querySelector(
                SIDEBAR_SELECTOR
            );


        if (!container) {

            return;

        }


        /*
         * Evita carregar o componente duas vezes.
         */

        if (
            container.dataset.loaded ===
            "true"
        ) {

            const sidebar =
                container.querySelector(
                    "#appSidebar"
                );


            setActivePage(
                sidebar
            );

            return;

        }


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


            setActivePage(
                sidebar
            );


            initializeSidebarBehavior(
                sidebar
            );


            initializeLogout();

        } catch (error) {

            console.error(
                "[Visium] Erro ao carregar Sidebar:",
                error
            );

        }

    }


    /* ======================================================================
       API pública
    ====================================================================== */

    window.VisiumSidebar = {

        initialize:
            initializeSidebar,

        setActivePage:
            setActivePage

    };


    /* ======================================================================
       Inicialização automática
    ====================================================================== */

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