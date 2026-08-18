/**
 * ==========================================================================
 * Visium
 * Arquivo: progress.js
 *
 * Inicialização e comportamento da página Meu Progresso.
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
   Dados dos conteúdos
========================================================================== */

const CONTENTS = [

    {
        id:
            "ametropias",

        title:
            "Ametropias"
    },


    {
        id:
            "dp-dnp",

        title:
            "DP e DNP"
    },


    {
        id:
            "montagem",

        title:
            "Montagem"
    },


    {
        id:
            "patologias",

        title:
            "Patologias"
    }

];


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
   Identificação do usuário
========================================================================== */

function getUserKey(
    user
) {

    if (!user) {

        return "anonymous";

    }


    return String(
        user.id ||
        user.email ||
        user.username ||
        user.name ||
        "anonymous"
    )
        .trim()
        .toLowerCase();

}


function getSafeStorageKey(
    value
) {

    return encodeURIComponent(
        String(
            value
        )
    );

}


/* ==========================================================================
   Chaves de armazenamento
========================================================================== */

function getQuizHistoryStorageKey() {

    return [

        "visium_quiz_history",

        getSafeStorageKey(
            getUserKey(
                getCurrentUser()
            )
        )

    ].join(
        "_"
    );

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
   Histórico dos quizzes
========================================================================== */

function getQuizHistory() {

    const storageKey =
        getQuizHistoryStorageKey();


    const stored =
        localStorage.getItem(
            storageKey
        );


    if (!stored) {

        return [];

    }


    try {

        const history =
            JSON.parse(
                stored
            );


        if (
            !Array.isArray(
                history
            )
        ) {

            console.warn(
                "Visium | Histórico de quizzes não é um array."
            );


            return [];

        }


        return history;

    } catch (error) {

        console.error(
            "Visium | Histórico de quizzes inválido:",
            error
        );


        return [];

    }

}


/* ==========================================================================
   Progresso dos conteúdos
========================================================================== */

function getContentProgress(
    contentId
) {

    if (
        !window.VisiumProgress
    ) {

        console.error(
            "Visium | Serviço de progresso não carregado."
        );


        return 0;

    }


    const content =
        window.VisiumProgress.getContent(
            contentId
        );


    if (!content) {

        return 0;

    }


    const progress =
        Number(
            content.progress
        );


    if (
        !Number.isFinite(
            progress
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            100,
            progress
        )
    );

}


/* ==========================================================================
   Formatação
========================================================================== */

function formatDate(
    value
) {

    if (!value) {

        return "Data não disponível";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Data não disponível";

    }


    return date.toLocaleDateString(
        "pt-BR",
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    );

}


/* ==========================================================================
   Nome do quiz
========================================================================== */

function getQuizTitle(
    quizId
) {

    const titles = {

        "fundamentos-optica":
            "Fundamentos de Óptica",

        "ametropias":
            "Ametropias",

        "dp-dnp":
            "DP e DNP",

        "montagem":
            "Montagem de Óculos"

    };


    return (
        titles[quizId] ||
        "Quiz"
    );

}


/* ==========================================================================
   Estatísticas
========================================================================== */

function renderStatistics(
    history
) {

    const quizCount =
        document.querySelector(
            "#quizCount"
        );

    const bestScore =
        document.querySelector(
            "#bestScore"
        );

    const questionCount =
        document.querySelector(
            "#questionCount"
        );

    const averageScore =
        document.querySelector(
            "#averageScore"
        );

    const averageScoreFill =
        document.querySelector(
            "#averageScoreFill"
        );

    const averageScoreMessage =
        document.querySelector(
            "#averageScoreMessage"
        );


    if (
        !quizCount ||
        !bestScore ||
        !questionCount ||
        !averageScore ||
        !averageScoreFill ||
        !averageScoreMessage
    ) {

        return;

    }


    if (!history.length) {

        quizCount.textContent =
            "0";

        bestScore.textContent =
            "0%";

        questionCount.textContent =
            "0";

        averageScore.textContent =
            "0%";

        averageScoreFill.style.width =
            "0%";

        averageScoreMessage.textContent =
            "Ainda não há resultados registrados.";

        return;

    }


    const totalScores =
        history.reduce(
            (
                total,
                item
            ) => {

                const score =
                    Number(
                        item?.score || 0
                    );


                return total +
                    (
                        Number.isFinite(
                            score
                        )
                            ? score
                            : 0
                    );

            },
            0
        );


    const average =
        Math.round(
            totalScores /
            history.length
        );


    const best =
        Math.max(
            ...history.map(
                (item) => {

                    const score =
                        Number(
                            item?.score || 0
                        );


                    return Number.isFinite(
                        score
                    )
                        ? score
                        : 0;

                }
            )
        );


    const questions =
        history.reduce(
            (
                total,
                item
            ) => {

                const questionTotal =
                    Number(
                        item?.total || 0
                    );


                return total +
                    (
                        Number.isFinite(
                            questionTotal
                        )
                            ? questionTotal
                            : 0
                    );

            },
            0
        );


    quizCount.textContent =
        history.length;


    bestScore.textContent =
        `${best}%`;


    questionCount.textContent =
        questions;


    averageScore.textContent =
        `${average}%`;


    averageScoreFill.style.width =
        `${average}%`;


    if (
        average >= 80
    ) {

        averageScoreMessage.textContent =
            "Excelente desempenho. Continue assim!";

    } else if (
        average >= 60
    ) {

        averageScoreMessage.textContent =
            "Bom desempenho. Continue evoluindo.";

    } else {

        averageScoreMessage.textContent =
            "Continue estudando para melhorar seu desempenho.";

    }

}


/* ==========================================================================
   Lista de conteúdos
========================================================================== */

function renderContentProgress() {

    const container =
        document.querySelector(
            "#contentProgressList"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    let startedContents =
        0;


    CONTENTS.forEach(
        (content) => {

            const progress =
                getContentProgress(
                    content.id
                );


            if (
                progress > 0
            ) {

                startedContents +=
                    1;

            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "content-progress-item";


            item.innerHTML = `

                <div class="content-progress-item__top">

                    <span class="content-progress-item__title">
                        ${content.title}
                    </span>

                    <span class="content-progress-item__percentage">
                        ${progress}%
                    </span>

                </div>

                <div class="content-progress-item__bar">

                    <div
                        class="content-progress-item__fill"
                        style="width: ${progress}%"
                    ></div>

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );


    const contentCount =
        document.querySelector(
            "#contentCount"
        );


    if (contentCount) {

        contentCount.textContent =
            startedContents;

    }

}


/* ==========================================================================
   Histórico
========================================================================== */

function renderHistory(
    history
) {

    const container =
        document.querySelector(
            "#progressHistory"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (!history.length) {

        container.innerHTML = `

            <div class="progress-empty">

                Você ainda não realizou nenhum quiz.
                Faça seu primeiro quiz para começar a acompanhar
                seu desempenho.

            </div>

        `;

        return;

    }


    const recentHistory =
        [...history]
            .reverse()
            .slice(
                0,
                8
            );


    recentHistory.forEach(
        (item) => {

            const element =
                document.createElement(
                    "article"
                );


            element.className =
                "progress-history-item";


            const score =
                Number(
                    item?.score || 0
                );


            const correct =
                Number(
                    item?.correct || 0
                );


            const total =
                Number(
                    item?.total || 0
                );


            element.innerHTML = `

                <div>

                    <p class="progress-history-item__title">
                        ${getQuizTitle(
                            item?.quizId
                        )}
                    </p>

                    <span class="progress-history-item__date">
                        Realizado em ${formatDate(
                            item?.date
                        )}
                    </span>

                </div>

                <div class="progress-history-item__result">

                    <strong class="progress-history-item__score">
                        ${score}%
                    </strong>

                    <span class="progress-history-item__details">
                        ${correct} de ${total} acertos
                    </span>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeProgress() {

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


    initializeSidebar();

    initializeLogout();

    initializeProfileButton();


    const history =
        getQuizHistory();


    console.log(
        "Visium | Histórico carregado:",
        history.length,
        "tentativas."
    );


    renderStatistics(
        history
    );


    renderContentProgress();


    renderHistory(
        history
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initializeProgress
);