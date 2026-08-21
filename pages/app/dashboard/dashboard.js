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
   Configuração
========================================================================== */

const COMPONENTS = {

    header:
        "/components/header/header.html",

    sidebar:
        "/components/sidebar/sidebar.html"

};


const LOGIN_URL =
    "/pages/auth/login/login.html";


const CONTENTS_URL =
    "/pages/app/contents/contents.html";


const PROGRESS_URL =
    "/pages/app/progress/progress.html";


/* ==========================================================================
   Elementos
========================================================================== */

const dashboardGreeting =
    document.querySelector(
        "#dashboardGreeting"
    );


const dashboardAverageScore =
    document.querySelector(
        "#dashboardAverageScore"
    );


const dashboardQuizCount =
    document.querySelector(
        "#dashboardQuizCount"
    );


const dashboardContentCount =
    document.querySelector(
        "#dashboardContentCount"
    );


const dashboardContentList =
    document.querySelector(
        "#dashboardContentList"
    );


const dashboardProgress =
    document.querySelector(
        "#dashboardProgress"
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

        console.error(
            `Visium | Container não encontrado: ${selector}`
        );

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


    return window.VisiumAuth.getCurrentUser();

}


async function requireAuthentication() {

    const user =
        await getCurrentUser();


    if (!user) {

        window.location.replace(
            LOGIN_URL
        );

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

    if (!user) {

        return;

    }


    const headerUserName =
        document.querySelector(
            "#headerUserName"
        );


    if (headerUserName) {

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


    if (!sidebar) {

        return;

    }


    if (
        window.VisiumSidebar &&
        typeof window.VisiumSidebar.initializeExpandableMenus ===
        "function" &&
        typeof window.VisiumSidebar.setActivePage ===
        "function"
    ) {

        window.VisiumSidebar.initializeExpandableMenus(
            sidebar
        );

        window.VisiumSidebar.setActivePage(
            sidebar
        );

        return;

    }


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
            '[data-page="dashboard"]'
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

}


/* ==========================================================================
   Conteúdos
========================================================================== */

function getContents() {

    if (
        !Array.isArray(
            window.VISIUM_CONTENTS
        )
    ) {

        console.error(
            "Visium | Catálogo de conteúdos não carregado."
        );

        return [];

    }


    return window.VISIUM_CONTENTS;

}


/* ==========================================================================
   Progresso
========================================================================== */

function getProgressService() {

    if (
        !window.VisiumProgress
    ) {

        console.warn(
            "Visium | Serviço de progresso não carregado. Usando estado inicial."
        );

        return null;

    }


    return window.VisiumProgress;

}


function clampPercentage(
    value
) {

    return Math.max(
        0,
        Math.min(
            100,
            Number(value) || 0
        )
    );

}


function getContentProgress(
    contentId
) {

    const progressService =
        getProgressService();


    if (
        !progressService ||
        !contentId
    ) {

        return {
            progress: 0,
            currentSection: 0,
            status: "not_started"
        };

    }


    const content =
        progressService.getContent(
            contentId
        );


    if (!content) {

        return {
            progress: 0,
            currentSection: 0,
            status: "not_started"
        };

    }


    return {

        progress:
            clampPercentage(
                content.progress
            ),

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
   Saudação
========================================================================== */

function getFirstName(
    name
) {

    if (!name) {

        return "estudante";

    }


    return String(name)
        .trim()
        .split(/\s+/)[0];

}


function updateGreeting(
    user
) {

    if (!dashboardGreeting) {

        return;

    }


    const firstName =
        getFirstName(
            user?.name
        );


    dashboardGreeting.textContent =
        `Olá, ${firstName}.`;

}


/* ==========================================================================
   Resumo
========================================================================== */

function calculateContentStats() {

    const contents =
        getContents();


    let startedCount =
        0;


    let totalProgress =
        0;


    contents.forEach(
        (content) => {

            const progressData =
                getContentProgress(
                    content.id
                );


            if (
                progressData.progress > 0 ||
                progressData.status === "in_progress" ||
                progressData.status === "started" ||
                progressData.status === "completed"
            ) {

                startedCount++;

            }


            totalProgress +=
                progressData.progress;

        }
    );


    const averageProgress =
        contents.length
            ? Math.round(
                totalProgress /
                contents.length
            )
            : 0;


    return {

        startedCount,

        averageProgress

    };

}


function renderOverview() {

    const stats =
        calculateContentStats();


    if (dashboardContentCount) {

        dashboardContentCount.textContent =
            String(
                stats.startedCount
            );

    }


    if (dashboardQuizCount) {

        dashboardQuizCount.textContent =
            "0";

    }


    if (dashboardAverageScore) {

        dashboardAverageScore.textContent =
            `${stats.averageProgress}%`;

    }

}


/* ==========================================================================
   Lista de conteúdos
========================================================================== */

function renderContentList() {

    if (!dashboardContentList) {

        return;

    }


    const contents =
        getContents();


    if (!contents.length) {

        dashboardContentList.innerHTML = `
            <div class="dashboard-empty">
                Nenhum conteúdo disponível no momento.
            </div>
        `;

        return;

    }


    const items =
        contents
            .map(
                (content) => {

                    const progressData =
                        getContentProgress(
                            content.id
                        );


                    return {

                        content,

                        progress:
                            progressData.progress,

                        status:
                            progressData.status

                    };

                }
            )
            .filter(
                (item) =>
                    item.progress > 0 ||
                    item.status === "in_progress" ||
                    item.status === "started" ||
                    item.status === "completed"
            )
            .sort(
                (a, b) =>
                    b.progress -
                    a.progress
            )
            .slice(
                0,
                4
            );


    const visibleItems =
        items.length
            ? items
            : contents
                .slice(
                    0,
                    4
                )
                .map(
                    (content) => ({

                        content,

                        progress:
                            0

                    })
                );


    dashboardContentList.innerHTML =
        visibleItems
            .map(
                ({
                    content,
                    progress
                }) => {

                    const title =
                        escapeHTML(
                            content.title ||
                            "Conteúdo"
                        );


                    const description =
                        escapeHTML(
                            content.description ||
                            "Continue seus estudos."
                        );


                    const url =
                        content.url ||
                        CONTENTS_URL;


                    return `
                        <article class="dashboard-content-card">

                            <span class="dashboard-content-card__label">
                                ${progress > 0 ? "CONTINUAR" : "COMECE POR AQUI"}
                            </span>

                            <h3>
                                ${title}
                            </h3>

                            <p>
                                ${description}
                            </p>

                            <span class="dashboard-content-card__progress">
                                ${progress > 0 ? `${progress}% concluído` : "Disponível"}
                            </span>

                            <a
                                href="${escapeAttribute(url)}"
                                class="dashboard-content-card__link"
                            >
                                ${progress > 0 ? "Continuar" : "Estudar"}
                            </a>

                        </article>
                    `;

                }
            )
            .join("");

}


/* ==========================================================================
   Progresso
========================================================================== */

function renderProgress() {

    if (!dashboardProgress) {

        return;

    }


    const contents =
        getContents();


    if (!contents.length) {

        dashboardProgress.innerHTML = `
            <div class="dashboard-empty">
                Nenhum dado de progresso disponível.
            </div>
        `;

        return;

    }


    const items =
        contents
            .map(
                (content) => {

                    return {

                        content,

                        progress:
                            getContentProgress(
                                content.id
                            ).progress

                    };

                }
            )
            .filter(
                (item) =>
                    item.progress > 0
            )
            .sort(
                (a, b) =>
                    b.progress -
                    a.progress
            )
            .slice(
                0,
                5
            );


    if (!items.length) {

        dashboardProgress.innerHTML = `
            <div class="dashboard-empty">
                Seu progresso aparecerá aqui conforme
                você avançar nos estudos.
            </div>
        `;

        return;

    }


    dashboardProgress.innerHTML =
        items
            .map(
                ({
                    content,
                    progress
                }) => {

                    const title =
                        escapeHTML(
                            content.title ||
                            "Conteúdo"
                        );


                    return `
                        <div class="dashboard-progress__card">

                            <span class="dashboard-progress__label">
                                ${title}
                            </span>

                            <strong class="dashboard-progress__value">
                                ${progress}%
                            </strong>

                        </div>
                    `;

                }
            )
            .join("");

}


/* ==========================================================================
   Segurança
========================================================================== */

function escapeHTML(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeDashboard() {

    const user =
        await requireAuthentication();


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


    if (!sidebarLoaded) {

        console.error(
            "Visium | Não foi possível carregar a sidebar da área autenticada."
        );

    }


    if (!headerLoaded) {

        console.error(
            "Visium | Não foi possível carregar o header da área autenticada."
        );

    }


    updateGreeting(
        user
    );


    updateHeaderUser(
        user
    );


    initializeSidebar();


    renderOverview();

    renderContentList();

    renderProgress();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);
