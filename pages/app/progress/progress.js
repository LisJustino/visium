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
        "/components/header/header.html?v=20260824"

};


/* ==========================================================================
   Dados dos conteúdos
========================================================================== */

const CONTENTS =
    Array.isArray(
        window.VISIUM_CONTENTS
    )
        ? window.VISIUM_CONTENTS
        : [];


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
   Identificação do usuário
========================================================================== */

function getStoredUser() {

    try {

        const storedUser =
            localStorage.getItem(
                "visium_user"
            );


        if (!storedUser) {

            return null;

        }


        return JSON.parse(
            storedUser
        );

    } catch (error) {

        console.warn(
            "Visium | Usuário salvo em localStorage inválido.",
            error
        );

        return null;

    }

}


function getUserKey(
    user
) {

    const resolvedUser =
        user ||
        getStoredUser();


    if (!resolvedUser) {

        return "anonymous";

    }


    return String(
        resolvedUser.id ||
        resolvedUser.email ||
        resolvedUser.username ||
        resolvedUser.name ||
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
                getStoredUser()
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
   Histórico dos quizzes
========================================================================== */

function getQuizHistory() {

    const storageKey =
        getQuizHistoryStorageKey();


    let stored =
        localStorage.getItem(
            storageKey
        );


    if (!stored) {

        const userKey =
            getUserKey(
                getStoredUser()
            );

        const legacyStored =
            userKey !== "anonymous"
                ? localStorage.getItem(
                    "visium_quiz_history_anonymous"
                )
                : null;

        if (legacyStored) {

            localStorage.setItem(
                storageKey,
                legacyStored
            );

            stored =
                legacyStored;

        } else {

            return [];

        }

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
        "fundamentos-optica": "Fundamentos de Óptica",
        "interpretacao-de-receita": "Interpretação de Receita",
        "dp-dnp": "O que é DP, DNP e Altura",
        "acuidade-visual": "Acuidade Visual",
        "lentes-contato": "Lentes de Contato",
        "surfacagem-multifocal-bifocal": "Surfaçagem de Multifocal e Bifocal",
        "montagem": "Montagem",
        "armacoes": "Armações",
        "patologias": "Patologias",
        "ametropias": "Ametropias",
        "anatomia": "Anatomia"
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
        await requireAuthentication();


    if (!user) {

        return;

    }


    const headerLoaded =
        await loadComponent(
            "#appHeaderContainer",
            COMPONENTS.header
        );


    if (
        !headerLoaded
    ) {

        return;

    }


    refreshProgressView();

}


function refreshProgressView() {

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


window.addEventListener(
    "pageshow",
    () => {

        if (
            window.VisiumProgress
        ) {

            refreshProgressView();

        }

    }
);


document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible" &&
            window.VisiumProgress
        ) {

            refreshProgressView();

        }

    }
);
