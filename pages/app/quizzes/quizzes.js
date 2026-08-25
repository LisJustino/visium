/**
 * ==========================================================================
 * Visium
 * Arquivo: quizzes.js
 *
 * Inicialização e comportamento da página de quizzes.
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
   Quizzes
========================================================================== */

const QUIZZES = [

    {
        id:
            "fundamentos-optica",

        category:
            "Fundamentos",

        title:
            "Fundamentos de Óptica",

        description:
            "Revise conceitos introdutórios sobre o olho humano e o processo visual.",

        difficulty:
            "Básico",

        questions:
            4

    },


    {
        id:
            "ametropias",

        category:
            "Ametropias",

        title:
            "Ametropias",

        description:
            "Teste seus conhecimentos sobre miopia, hipermetropia, astigmatismo e presbiopia.",

        difficulty:
            "Intermediário",

        questions:
            4

    },


    {
        id:
            "dp-dnp",

        category:
            "Medição",

        title:
            "DP, DNP e Altura",

        description:
            "Revise conceitos relacionados à distância pupilar e à distância naso-pupilar.",

        difficulty:
            "Intermediário",

        questions:
            4

    },


    {
        id:
            "montagem",

        category:
            "Montagem",

        title:
            "Montagem de Óculos",

        description:
            "Teste seus conhecimentos sobre conceitos fundamentais de montagem.",

        difficulty:
            "Intermediário",

        questions:
            4

    },


    {
        id:
            "lendo-uma-receita",

        category:
            "Receitas",

        title:
            "Lendo uma Receita",

        description:
            "Aprenda a interpretar campos, sinais e abreviações de uma receita oftálmica.",

        difficulty:
            "Básico",

        questions:
            4

    },


    {
        id:
            "anatomia",

        category:
            "Anatomia",

        title:
            "Anatomia",

        description:
            "Estude as principais estruturas do olho humano e suas funções no processo visual.",

        difficulty:
            "Básico",

        questions:
            4

    },


    {
        id:
            "armacoes",

        category:
            "Armações",

        title:
            "Armações",

        description:
            "Revise tipos, materiais, partes, medidas e critérios de indicação de armações.",

        difficulty:
            "Intermediário",

        questions:
            4

    },


    {
        id:
            "lentes-contato",

        category:
            "Lentes de Contato",

        title:
            "Lentes de Contato",

        description:
            "Teste seus conhecimentos sobre adaptação, cuidados e avaliação da acuidade visual.",

        difficulty:
            "Intermediário",

        questions:
            4

    },


    {
        id:
            "patologias",

        category:
            "Patologias",

        title:
            "Patologias",

        description:
            "Revise conceitos introdutórios sobre alterações relacionadas à saúde ocular.",

        difficulty:
            "Básico",

        questions:
            4

    },


    {
        id:
            "interpretacao-de-receita",

        category:
            "Receitas",

        title:
            "Interpretação de Receita",

        description:
            "Teste sua leitura dos principais campos de uma receita oftálmica.",

        difficulty:
            "Básico",

        questions:
            6

    },


    {
        id:
            "acuidade-visual",

        category:
            "Visão",

        title:
            "Acuidade Visual",

        description:
            "Revise conceitos e procedimentos de avaliação da acuidade visual.",

        difficulty:
            "Básico",

        questions:
            6

    },


    {
        id:
            "surfacagem-multifocal-bifocal",

        category:
            "Processos",

        title:
            "Surfaçagem Multifocal e Bifocal",

        description:
            "Teste seus conhecimentos sobre surfaçagem e lentes multifocais e bifocais.",

        difficulty:
            "Intermediário",

        questions:
            6

    }

];

QUIZZES.forEach(
    (quiz) => {
        if (quiz.questions === 4) {
            quiz.questions = 6;
        }
    }
);

const QUIZ_ORDER = [
    "interpretacao-de-receita",
    "fundamentos-optica",
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

QUIZZES.sort(
    (firstQuiz, secondQuiz) => {
        const firstIndex =
            QUIZ_ORDER.indexOf(firstQuiz.id);

        const secondIndex =
            QUIZ_ORDER.indexOf(secondQuiz.id);

        return (firstIndex < 0 ? Number.MAX_SAFE_INTEGER : firstIndex) -
            (secondIndex < 0 ? Number.MAX_SAFE_INTEGER : secondIndex);
    }
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
   Armazenamento
========================================================================== */

function getAttemptStorageKey(
    quizId
) {

    return [

        "visium_quiz_attempt",

        getSafeStorageKey(
            getUserKey(
                getStoredUser()
            )
        ),

        getSafeStorageKey(
            quizId
        )

    ].join(
        "_"
    );

}


function getHistoryStorageKey() {

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
   Tentativa
========================================================================== */

function getQuizAttempt(
    quizId
) {

    const stored =
        localStorage.getItem(
            getAttemptStorageKey(
                quizId
            )
        );


    if (!stored) {

        return null;

    }


    try {

        const attempt =
            JSON.parse(
                stored
            );


        if (
            !attempt ||
            attempt.quizId !== quizId
        ) {

            return null;

        }


        return attempt;

    } catch (error) {

        console.error(
            "Visium | Tentativa de quiz inválida:",
            error
        );


        localStorage.removeItem(
            getAttemptStorageKey(
                quizId
            )
        );


        return null;

    }

}


/* ==========================================================================
   Histórico
========================================================================== */

function getQuizHistory() {

    const stored =
        localStorage.getItem(
            getHistoryStorageKey()
        );


    if (!stored) {

        return [];

    }


    try {

        const history =
            JSON.parse(
                stored
            );


        return Array.isArray(
            history
        )
            ? history
            : [];

    } catch (error) {

        console.error(
            "Visium | Histórico de quizzes inválido:",
            error
        );


        return [];

    }

}


/* ==========================================================================
   Resultado do quiz
========================================================================== */

function getQuizResult(
    quizId
) {

    const history =
        getQuizHistory();


    const results =
        history.filter(
            (item) =>
                item &&
                item.quizId ===
                quizId
        );


    if (!results.length) {

        return null;

    }


    return results[
        results.length - 1
    ];

}


/* ==========================================================================
   Estado do quiz
========================================================================== */

function getQuizState(
    quizId
) {

    const progress =
        getQuizProgress(
            quizId
        );


    const result =
        getQuizResult(
            quizId
        );


    const attempt =
        getQuizAttempt(
            quizId
        );


    /*
     * Um resultado registrado com score significa
     * que o quiz já foi concluído anteriormente.
     */

    if (result) {

        return {

            status:
                "completed",

            progress:
                100,

            result,

            attempt

        };

    }


    /*
     * Uma tentativa existente representa um quiz
     * em andamento.
     */

    if (attempt) {

        return {

            status:
                "in_progress",

            progress,

            result:
                null,

            attempt

        };

    }


    /*
     * Compatibilidade com o progresso legado.
     */

    if (progress > 0) {

        return {

            status:
                "in_progress",

            progress,

            result:
                null,

            attempt:
                null

        };

    }


    return {

        status:
            "not_started",

        progress:
            0,

        result:
            null,

        attempt:
            null

    };

}


/* ==========================================================================
   Progresso
========================================================================== */

function getQuizProgress(
    quizId
) {

    const key =
        `visium_quiz_progress_${quizId}`;


    const stored =
        localStorage.getItem(
            key
        );


    if (!stored) {

        return 0;

    }


    const progress =
        Number(
            stored
        );


    if (
        !Number.isFinite(
            progress
        ) ||
        progress < 0
    ) {

        return 0;

    }


    return Math.min(
        progress,
        100
    );

}


/* ==========================================================================
   Resumo
========================================================================== */

function updateSummary() {

    const available =
        document.querySelector(
            "#availableQuizzes"
        );

    const completed =
        document.querySelector(
            "#completedQuizzes"
        );

    const average =
        document.querySelector(
            "#averageScore"
        );


    const history =
        getQuizHistory();


    const completedQuizIds =
        new Set(
            history
                .filter(
                    (item) =>
                        item &&
                        item.quizId
                )
                .map(
                    (item) =>
                        item.quizId
                )
        );


    if (available) {

        available.textContent =
            QUIZZES.length;

    }


    if (completed) {

        completed.textContent =
            completedQuizIds.size;

    }


    if (average) {

        if (!history.length) {

            average.textContent =
                "—";

            return;

        }


        const scores =
            history
                .map(
                    (item) =>
                        Number(
                            item.score
                        )
                )
                .filter(
                    (score) =>
                        Number.isFinite(
                            score
                        )
                );


        if (!scores.length) {

            average.textContent =
                "—";

            return;

        }


        const total =
            scores.reduce(
                (
                    sum,
                    score
                ) =>
                    sum + score,
                0
            );


        const result =
            Math.round(
                total /
                scores.length
            );


        average.textContent =
            `${result}%`;

    }

}


/* ==========================================================================
   Card
========================================================================== */

function createQuizCard(
    quiz
) {

    const state =
        getQuizState(
            quiz.id
        );


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "quiz-card";


    let actionLabel =
        "Iniciar quiz";


    if (
        state.status ===
        "in_progress"
    ) {

        actionLabel =
            "Continuar quiz";

    }


    if (
        state.status ===
        "completed"
    ) {

        actionLabel =
            "Refazer quiz";

    }


    const progress =
        state.status ===
            "completed"
            ? 100
            : state.progress;


    card.innerHTML = `

        <div class="quiz-card__top">

            <span class="quiz-card__category">
                ${quiz.category}
            </span>

            <span class="quiz-card__difficulty">
                ${quiz.difficulty}
            </span>

        </div>


        <h3>
            ${quiz.title}
        </h3>


        <p class="quiz-card__description">
            ${quiz.description}
        </p>


        <div class="quiz-card__meta">

            <span class="quiz-card__meta-item">

                <strong>
                    ${quiz.questions}
                </strong>

                questões

            </span>

        </div>


        <div class="quiz-card__progress">

            <div class="quiz-card__progress-top">

                <span>
                    Progresso
                </span>

                <span>
                    ${progress}%
                </span>

            </div>


            <div class="quiz-card__progress-bar">

                <div
                    class="quiz-card__progress-fill"
                    style="width: ${progress}%"
                ></div>

            </div>

        </div>


        <a
            href="#"
            class="quiz-card__action"
            data-quiz-id="${quiz.id}"
            data-quiz-status="${state.status}"
        >
            ${actionLabel}
        </a>

    `;


    return card;

}


/* ==========================================================================
   Renderização
========================================================================== */

function renderQuizzes() {

    const grid =
        document.querySelector(
            "#quizzesGrid"
        );

    const empty =
        document.querySelector(
            "#quizzesEmpty"
        );


    if (
        !grid ||
        !empty
    ) {

        return;

    }


    grid.innerHTML =
        "";


    if (!QUIZZES.length) {

        empty.hidden =
            false;

        return;

    }


    empty.hidden =
        true;


    const fragment =
        document.createDocumentFragment();


    QUIZZES.forEach(
        (quiz) => {

            fragment.appendChild(
                createQuizCard(
                    quiz
                )
            );

        }
    );


    grid.appendChild(
        fragment
    );


    initializeQuizActions();

}


/* ==========================================================================
   Ações dos quizzes
========================================================================== */

function initializeQuizActions() {

    document
        .querySelectorAll(
            ".quiz-card__action"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();


                        const quizId =
                            button.dataset.quizId;


                        const status =
                            button.dataset.quizStatus;


                        if (!quizId) {

                            return;

                        }


                        /*
                         * O quiz.js decide como tratar
                         * uma tentativa existente.
                         *
                         * A página de quizzes apenas
                         * informa ao motor se o usuário
                         * está retomando ou refazendo.
                         */

                        const mode =
                            status ===
                                "completed"
                                ? "restart"
                                : "continue";


                        window.location.href =
                            `/pages/app/quizzes/quiz.html?quiz=${encodeURIComponent(quizId)}&mode=${mode}`;

                    }
                );

            }
        );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeQuizzes() {

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

    updateSummary();

    renderQuizzes();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeQuizzes
);