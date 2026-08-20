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
   Conteúdos
========================================================================== */

const DASHBOARD_CONTENTS = [

    {
        id:
            "ametropias",

        title:
            "Ametropias",

        url:
            "/pages/app/reader/reader.html?content=ametropias"

    },


    {
        id:
            "dp-dnp",

        title:
            "DP e DNP",

        url:
            "/pages/app/reader/reader.html?content=dp-dnp"

    },


    {
        id:
            "montagem",

        title:
            "Montagem",

        url:
            "/pages/app/reader/reader.html?content=montagem"

    },


    {
        id:
            "patologias",

        title:
            "Patologias",

        url:
            "/pages/app/reader/reader.html?content=patologias"

    }

];


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
   Serviço de progresso
========================================================================== */

function getProgressService() {

    if (
        !window.VisiumProgress
    ) {

        console.error(
            "Visium | Serviço de progresso não carregado."
        );


        return null;

    }


    return window.VisiumProgress;

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
   Progresso de conteúdo
========================================================================== */

function getContentProgress(
    contentId
) {

    const progressService =
        getProgressService();


    if (!progressService) {

        return {

            progress:
                0,

            currentSection:
                0,

            status:
                "not_started"

        };

    }


    const content =
        progressService.getContent(
            contentId
        );


    if (!content) {

        return {

            progress:
                0,

            currentSection:
                0,

            status:
                "not_started"

        };

    }


    return {

        progress:
            Number(
                content.progress
            ) || 0,

        currentSection:
            Number(
                content.currentSection
            ) || 0,

        status:
            content.status ||
            "not_started"

    };

}


/* ==========================================================================
   Último conteúdo
========================================================================== */

function getLastContent() {

    const progressService =
        getProgressService();


    if (!progressService) {

        return null;

    }


    const lastContent =
        progressService.getLastContent();


    if (!lastContent) {

        return null;

    }


    return DASHBOARD_CONTENTS.find(
        (content) =>
            content.id ===
            lastContent.id
    ) || null;

}


/* ==========================================================================
   Retomar estudos
========================================================================== */

function renderContinueCard() {

    const title =
        document.querySelector(
            "#continueTitle"
        );


    const description =
        document.querySelector(
            "#continueDescription"
        );


    const button =
        document.querySelector(
            "#continueButton"
        );


    if (
        !title ||
        !description ||
        !button
    ) {

        return;

    }


    const lastContent =
        getLastContent();


    if (!lastContent) {

        title.textContent =
            "Você ainda não começou uma leitura.";


        description.textContent =
            "Escolha um conteúdo para começar seus estudos. Quando você iniciar uma leitura, o Visium poderá retomar esse ponto para você.";


        button.textContent =
            "Explorar conteúdos";


        button.href =
            "/pages/app/contents/contents.html";


        return;

    }


    const progressData =
        getContentProgress(
            lastContent.id
        );


    const progress =
        Math.max(
            0,
            Math.min(
                100,
                progressData.progress
            )
        );


    if (
        progressData.status ===
        "completed"
    ) {

        title.textContent =
            `${lastContent.title} concluído`;


        description.textContent =
            "Você concluiu este conteúdo. Continue seus estudos ou revise o material quando quiser.";


        button.textContent =
            "Revisar conteúdo";

    } else {

        title.textContent =
            `Continue: ${lastContent.title}`;


        description.textContent =
            `Você está com ${progress}% deste conteúdo concluído. Continue de onde parou.`;


        button.textContent =
            "Continuar estudando";

    }


    button.href =
        lastContent.url;

}


/* ==========================================================================
   Cards de conteúdo
========================================================================== */

function renderContentProgress() {

    const progressService =
        getProgressService();


    if (!progressService) {

        return;

    }


    document
        .querySelectorAll(
            "[data-content-id]"
        )
        .forEach(
            (card) => {

                const contentId =
                    card.dataset.contentId;


                if (!contentId) {

                    return;

                }


                const progressData =
                    getContentProgress(
                        contentId
                    );


                const progress =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            progressData.progress
                        )
                    );


                const progressElement =
                    card.querySelector(
                        `[data-progress-for="${contentId}"]`
                    );


                if (progressElement) {

                    progressElement.textContent =
                        `${progress}%`;

                }


                const link =
                    card.querySelector(
                        ".content-card__link"
                    );


                const content =
                    DASHBOARD_CONTENTS.find(
                        (item) =>
                            item.id ===
                            contentId
                    );


                if (
                    link &&
                    content
                ) {

                    link.href =
                        content.url;

                }


                if (
                    progressData.status ===
                    "completed"
                ) {

                    card.setAttribute(
                        "data-status",
                        "completed"
                    );

                } else if (
                    progressData.status ===
                    "in_progress"
                ) {

                    card.setAttribute(
                        "data-status",
                        "in-progress"
                    );

                } else if (
                    progressData.status ===
                    "started"
                ) {

                    card.setAttribute(
                        "data-status",
                        "started"
                    );

                } else {

                    card.setAttribute(
                        "data-status",
                        "not-started"
                    );

                }

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


    if (
        !getProgressService()
    ) {

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


    updateGreeting(
        user
    );


    updateHeaderUser(
        user
    );

    renderContinueCard();

    renderContentProgress();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);