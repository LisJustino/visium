/**
 * ==========================================================================
 * Visium
 * Arquivo: quiz.js
 *
 * Motor da execução dos quizzes.
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
   Quizzes demonstrativos
========================================================================== */

const QUIZ_DATA = {

    "fundamentos-optica": {

        category:
            "Fundamentos",

        title:
            "Fundamentos de Óptica",

        description:
            "Avalie seus conhecimentos básicos sobre os principais conceitos de Óptica.",

        questions: [

            {
                text:
                    "Qual é o objetivo principal deste quiz demonstrativo?",

                options: [

                    "Testar a estrutura do sistema de quizzes.",

                    "Alterar as configurações do navegador.",

                    "Criar uma nova conta.",

                    "Excluir o histórico do usuário."

                ],

                correct:
                    0,

                explanation:
                    "Esta questão existe para validar o funcionamento do motor de quizzes do Visium."

            },


            {
                text:
                    "O que acontece quando uma resposta é confirmada?",

                options: [

                    "A questão é apagada.",

                    "O sistema verifica a resposta e apresenta o feedback.",

                    "O usuário é desconectado.",

                    "O quiz é reiniciado automaticamente."

                ],

                correct:
                    1,

                explanation:
                    "Após a confirmação, o sistema verifica a alternativa selecionada e apresenta o resultado."

            },


            {
                text:
                    "Qual informação deve ser registrada ao finalizar um quiz?",

                options: [

                    "Somente o título da página.",

                    "Somente o nome do usuário.",

                    "O resultado e o aproveitamento obtido.",

                    "A resolução do monitor."

                ],

                correct:
                    2,

                explanation:
                    "O resultado do quiz será utilizado posteriormente para alimentar o histórico e o progresso."

            }

        ]

    },


    "ametropias": {

        category:
            "Ametropias",

        title:
            "Ametropias",

        description:
            "Quiz demonstrativo da categoria de ametropias.",

        questions: [

            {
                text:
                    "Qual é a finalidade desta etapa do Visium?",

                options: [

                    "Validar a estrutura do quiz.",

                    "Modificar imagens do sistema.",

                    "Criar usuários automaticamente.",

                    "Alterar o menu principal."

                ],

                correct:
                    0,

                explanation:
                    "Neste momento as perguntas são demonstrativas. O conteúdo educacional definitivo será inserido posteriormente."

            },


            {
                text:
                    "Qual recurso permite acompanhar o desempenho do usuário?",

                options: [

                    "Histórico de resultados.",

                    "Logo da plataforma.",

                    "Menu lateral.",

                    "Título do navegador."

                ],

                correct:
                    0,

                explanation:
                    "O histórico permitirá registrar os resultados dos quizzes realizados."

            }

        ]

    },


    "dp-dnp": {

        category:
            "DP e DNP",

        title:
            "DP e DNP",

        description:
            "Quiz demonstrativo da categoria de DP e DNP.",

        questions: [

            {
                text:
                    "O que esta versão do quiz está validando?",

                options: [

                    "A interface e o fluxo de respostas.",

                    "O servidor de produção.",

                    "A publicação de PDFs.",

                    "A criação de imagens."

                ],

                correct:
                    0,

                explanation:
                    "A prioridade desta etapa é validar o funcionamento do motor de questões."

            }

        ]

    },


    "montagem": {

        category:
            "Montagem",

        title:
            "Montagem de Óculos",

        description:
            "Quiz demonstrativo da categoria de montagem.",

        questions: [

            {
                text:
                    "Qual será uma das funções do resultado do quiz?",

                options: [

                    "Registrar o aproveitamento do usuário.",

                    "Excluir a conta.",

                    "Desativar o menu.",

                    "Alterar o endereço da página."

                ],

                correct:
                    0,

                explanation:
                    "O resultado será armazenado para permitir o acompanhamento do desempenho."

            }

        ]

    }

};


/* ==========================================================================
   Estado
========================================================================== */

let currentQuiz = null;

let currentQuizId = null;

let currentQuestionIndex = 0;

let answers = [];

let attemptId = null;


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


function getHistoryStorageKey() {

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
   Query String
========================================================================== */

function getQuizId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "quiz"
    );

}

function getQuizMode() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "mode"
    ) || "continue";

}

/* ==========================================================================
   Chaves de armazenamento
========================================================================== */

function getAttemptStorageKey() {

    return [
        "visium_quiz_attempt",
        getSafeStorageKey(
            getUserKey(
                getCurrentUser()
            )
        ),
        getSafeStorageKey(
            currentQuizId
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
   Elementos
========================================================================== */

function getElements() {

    return {

        category:
            document.querySelector(
                "#quizCategory"
            ),

        title:
            document.querySelector(
                "#quizTitle"
            ),

        description:
            document.querySelector(
                "#quizDescription"
            ),

        questionNumber:
            document.querySelector(
                "#questionNumber"
            ),

        score:
            document.querySelector(
                "#quizScore"
            ),

        progressText:
            document.querySelector(
                "#quizProgressText"
            ),

        progressFill:
            document.querySelector(
                "#quizProgressFill"
            ),

        questionText:
            document.querySelector(
                "#questionText"
            ),

        options:
            document.querySelector(
                "#quizOptions"
            ),

        feedback:
            document.querySelector(
                "#quizFeedback"
            ),

        feedbackTitle:
            document.querySelector(
                "#feedbackTitle"
            ),

        feedbackMessage:
            document.querySelector(
                "#feedbackMessage"
            ),

        previous:
            document.querySelector(
                "#previousQuestion"
            ),

        next:
            document.querySelector(
                "#nextQuestion"
            ),

        quizCard:
            document.querySelector(
                "#quizCard"
            ),

        result:
            document.querySelector(
                "#quizResult"
            ),

        resultMessage:
            document.querySelector(
                "#resultMessage"
            ),

        resultScore:
            document.querySelector(
                "#resultScore"
            ),

        resultCorrect:
            document.querySelector(
                "#resultCorrect"
            ),

        resultWrong:
            document.querySelector(
                "#resultWrong"
            ),

        resultTotal:
            document.querySelector(
                "#resultTotal"
            ),

        restart:
            document.querySelector(
                "#restartQuiz"
            )

    };

}


/* ==========================================================================
   Validação do quiz
========================================================================== */

function isValidQuestion(
    question
) {

    if (
        !question ||
        typeof question.text !== "string" ||
        !Array.isArray(
            question.options
        ) ||
        !question.options.length
    ) {

        return false;

    }


    if (
        !Number.isInteger(
            question.correct
        )
    ) {

        return false;

    }


    if (
        question.correct < 0 ||
        question.correct >=
        question.options.length
    ) {

        return false;

    }


    return true;

}


function isValidQuiz(
    quiz
) {

    if (
        !quiz ||
        !Array.isArray(
            quiz.questions
        ) ||
        !quiz.questions.length
    ) {

        return false;

    }


    return quiz.questions.every(
        isValidQuestion
    );

}


/* ==========================================================================
   Cabeçalho
========================================================================== */

function renderQuizHeader() {

    const elements =
        getElements();


    elements.category.textContent =
        currentQuiz.category;


    elements.title.textContent =
        currentQuiz.title;


    elements.description.textContent =
        currentQuiz.description;

}


/* ==========================================================================
   Estado das respostas
========================================================================== */

function createEmptyAnswerState() {

    return currentQuiz.questions.map(
        () => null
    );

}


function normalizeAnswerState(
    storedAnswers
) {

    if (
        !Array.isArray(
            storedAnswers
        )
    ) {

        return createEmptyAnswerState();

    }


    return currentQuiz.questions.map(
        (
            question,
            index
        ) => {

            const stored =
                storedAnswers[index];


            if (
                !stored ||
                !Number.isInteger(
                    stored.selected
                )
            ) {

                return null;

            }


            if (
                stored.selected < 0 ||
                stored.selected >=
                question.options.length
            ) {

                return null;

            }


            return {

                selected:
                    stored.selected,

                confirmed:
                    Boolean(
                        stored.confirmed
                    ),

                correct:
                    Boolean(
                        stored.correct
                    )

            };

        }
    );

}


/* ==========================================================================
   Tentativa
========================================================================== */

function createAttemptId() {

    return [
        Date.now(),
        Math.random()
            .toString(
                36
            )
            .slice(
                2,
                10
            )
    ].join(
        "-"
    );

}


function createAttemptState() {

    return {

        version:
            1,

        attemptId:
            createAttemptId(),

        quizId:
            currentQuizId,

        currentQuestionIndex:
            0,

        answers:
            createEmptyAnswerState(),

        startedAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };

}


function saveAttempt() {

    if (
        !currentQuiz ||
        !currentQuizId
    ) {

        return;

    }


    const attempt = {

        version:
            1,

        attemptId,

        quizId:
            currentQuizId,

        currentQuestionIndex,

        answers,

        startedAt:
            window.__visiumQuizStartedAt ||
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        getAttemptStorageKey(),
        JSON.stringify(
            attempt
        )
    );

}


function loadAttempt() {

    const stored =
        localStorage.getItem(
            getAttemptStorageKey()
        );


    if (!stored) {

        return false;

    }


    try {

        const parsed =
            JSON.parse(
                stored
            );


        if (
            !parsed ||
            parsed.quizId !==
            currentQuizId
        ) {

            return false;

        }


        answers =
            normalizeAnswerState(
                parsed.answers
            );


        currentQuestionIndex =
            Number.isInteger(
                parsed.currentQuestionIndex
            )
                ? Math.min(
                    Math.max(
                        parsed.currentQuestionIndex,
                        0
                    ),
                    currentQuiz.questions.length - 1
                )
                : 0;


        attemptId =
            parsed.attemptId ||
            createAttemptId();


        window.__visiumQuizStartedAt =
            parsed.startedAt ||
            new Date().toISOString();


        return true;

    } catch (error) {

        console.error(
            "Visium | Tentativa inválida:",
            error
        );


        localStorage.removeItem(
            getAttemptStorageKey()
        );


        return false;

    }

}


function clearAttempt() {

    localStorage.removeItem(
        getAttemptStorageKey()
    );

}


/* ==========================================================================
   Estado da questão atual
========================================================================== */

function getCurrentAnswer() {

    return (
        answers[
        currentQuestionIndex
        ] ||
        null
    );

}


function calculateScore() {

    return answers.reduce(
        (
            total,
            answer
        ) => {

            if (
                answer &&
                answer.confirmed &&
                answer.correct
            ) {

                return total + 1;

            }


            return total;

        },
        0
    );

}


/* ==========================================================================
   Progresso
========================================================================== */

function updateProgress() {

    const elements =
        getElements();


    const total =
        currentQuiz.questions.length;


    const current =
        currentQuestionIndex + 1;


    const percentage =
        Math.round(
            (current / total) * 100
        );


    elements.questionNumber.textContent =
        `${current} de ${total}`;


    elements.progressText.textContent =
        `${percentage}%`;


    elements.progressFill.style.width =
        `${percentage}%`;


    elements.score.textContent =
        calculateScore();

}


/* ==========================================================================
   Feedback
========================================================================== */

function hideFeedback() {

    const elements =
        getElements();


    elements.feedback.hidden =
        true;


    elements.feedback.classList.remove(
        "is-correct",
        "is-wrong"
    );


    elements.feedbackTitle.textContent =
        "";


    elements.feedbackMessage.textContent =
        "";

}


/* ==========================================================================
   Estado visual das alternativas
========================================================================== */

function renderOptionState(
    question,
    answer
) {

    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        (button) => {

            const index =
                Number(
                    button.dataset.index
                );


            button.classList.remove(
                "is-selected",
                "is-correct",
                "is-wrong"
            );


            button.disabled =
                false;


            if (
                answer &&
                answer.selected === index
            ) {

                button.classList.add(
                    "is-selected"
                );

            }


            if (
                answer &&
                answer.confirmed
            ) {

                button.disabled =
                    true;


                if (
                    index ===
                    question.correct
                ) {

                    button.classList.add(
                        "is-correct"
                    );

                }


                if (
                    index ===
                    answer.selected &&
                    !answer.correct
                ) {

                    button.classList.add(
                        "is-wrong"
                    );

                }

            }

        }
    );

}


/* ==========================================================================
   Renderização da questão
========================================================================== */

function renderQuestion() {

    const elements =
        getElements();


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (!question) {

        finishQuiz();

        return;

    }


    elements.questionText.textContent =
        question.text;


    elements.options.innerHTML =
        "";


    hideFeedback();


    const answer =
        getCurrentAnswer();


    elements.next.disabled =
        !answer ||
        !Number.isInteger(
            answer.selected
        );


    elements.previous.disabled =
        currentQuestionIndex === 0;


    question.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "quiz-option";


            button.dataset.index =
                index;


            const letter =
                String.fromCharCode(
                    65 + index
                );


            const letterElement =
                document.createElement(
                    "span"
                );


            letterElement.className =
                "quiz-option__letter";


            letterElement.textContent =
                letter;


            const textElement =
                document.createElement(
                    "span"
                );


            textElement.textContent =
                option;


            button.appendChild(
                letterElement
            );


            button.appendChild(
                textElement
            );


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index
                    );

                }
            );


            elements.options.appendChild(
                button
            );

        }
    );


    renderOptionState(
        question,
        answer
    );


    if (
        answer &&
        answer.confirmed
    ) {

        elements.feedback.hidden =
            false;


        elements.feedbackTitle.textContent =
            answer.correct
                ? "Resposta correta!"
                : "Resposta incorreta.";


        elements.feedbackMessage.textContent =
            question.explanation;


        elements.feedback.classList.add(
            answer.correct
                ? "is-correct"
                : "is-wrong"
        );


        elements.next.textContent =
            currentQuestionIndex <
                currentQuiz.questions.length - 1
                ? "Próxima questão →"
                : "Ver resultado";


    } else {

        elements.next.textContent =
            "Confirmar resposta";

    }


    updateProgress();

}


/* ==========================================================================
   Seleção
========================================================================== */

function selectAnswer(
    index
) {

    const currentAnswer =
        getCurrentAnswer();


    if (
        currentAnswer &&
        currentAnswer.confirmed
    ) {

        return;

    }


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (
        !question ||
        !Number.isInteger(
            index
        ) ||
        index < 0 ||
        index >=
        question.options.length
    ) {

        return;

    }


    answers[
        currentQuestionIndex
    ] = {

        selected:
            index,

        confirmed:
            false,

        correct:
            false

    };


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            (button) => {

                button.classList.remove(
                    "is-selected"
                );

            }
        );


    const selectedButton =
        document.querySelector(
            `.quiz-option[data-index="${index}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "is-selected"
        );

    }


    const elements =
        getElements();


    elements.next.disabled =
        false;


    saveAttempt();

}


/* ==========================================================================
   Confirmação
========================================================================== */

function confirmAnswer() {

    const currentAnswer =
        getCurrentAnswer();


    if (
        !currentAnswer ||
        currentAnswer.confirmed
    ) {

        return;

    }


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (!question) {

        return;

    }


    const isCorrect =
        currentAnswer.selected ===
        question.correct;


    answers[
        currentQuestionIndex
    ] = {

        selected:
            currentAnswer.selected,

        confirmed:
            true,

        correct:
            isCorrect

    };


    renderQuestion();

    saveAttempt();

}


/* ==========================================================================
   Próxima questão
========================================================================== */

function goToNextQuestion() {

    const currentAnswer =
        getCurrentAnswer();


    if (
        !currentAnswer
    ) {

        return;

    }


    if (
        !currentAnswer.confirmed
    ) {

        confirmAnswer();

        return;

    }


    if (
        currentQuestionIndex >=
        currentQuiz.questions.length - 1
    ) {

        finishQuiz();

        return;

    }


    currentQuestionIndex +=
        1;


    saveAttempt();

    renderQuestion();

}


/* ==========================================================================
   Questão anterior
========================================================================== */

function goToPreviousQuestion() {

    if (
        currentQuestionIndex <=
        0
    ) {

        return;

    }


    currentQuestionIndex -=
        1;


    saveAttempt();

    renderQuestion();

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


        if (
            !Array.isArray(
                history
            )
        ) {

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


function saveResult() {

    const total =
        currentQuiz.questions.length;


    const correct =
        calculateScore();


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    const history =
        getQuizHistory();


    const attemptNumber =
        history.filter(
            (item) =>
                item &&
                item.quizId ===
                currentQuizId
        ).length + 1;


    history.push({

        attemptId,

        attemptNumber,

        quizId:
            currentQuizId,

        score:
            percentage,

        correct,

        total,

        date:
            new Date().toISOString()

    });


    localStorage.setItem(
        getHistoryStorageKey(),
        JSON.stringify(
            history
        )
    );


    localStorage.setItem(
        `visium_quiz_progress_${currentQuizId}`,
        "100"
    );


    clearAttempt();


    return {

        score:
            percentage,

        correct,

        total

    };

}


/* ==========================================================================
   Resultado
========================================================================== */

function finishQuiz() {

    const elements =
        getElements();


    const total =
        currentQuiz.questions.length;


    const correct =
        calculateScore();


    const wrong =
        total -
        correct;


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    saveResult();


    elements.quizCard.hidden =
        true;


    elements.result.hidden =
        false;


    elements.resultScore.textContent =
        `${percentage}%`;


    elements.resultCorrect.textContent =
        correct;


    elements.resultWrong.textContent =
        wrong;


    elements.resultTotal.textContent =
        total;


    if (
        percentage >= 80
    ) {

        elements.resultMessage.textContent =
            "Excelente resultado! Continue mantendo esse ritmo de estudos.";

    } else if (
        percentage >= 60
    ) {

        elements.resultMessage.textContent =
            "Bom resultado. Continue estudando para evoluir ainda mais.";

    } else {

        elements.resultMessage.textContent =
            "Continue estudando e tente novamente para melhorar seu resultado.";

    }

}


/* ==========================================================================
   Reiniciar
========================================================================== */

function restartQuiz() {

    currentQuestionIndex =
        0;


    answers =
        createEmptyAnswerState();


    attemptId =
        createAttemptId();


    window.__visiumQuizStartedAt =
        new Date().toISOString();


    clearAttempt();

    saveAttempt();


    const elements =
        getElements();


    elements.quizCard.hidden =
        false;


    elements.result.hidden =
        true;


    renderQuestion();

}


/* ==========================================================================
   Eventos
========================================================================== */

function initializeEvents() {

    const elements =
        getElements();


    if (
        !elements.next ||
        !elements.previous ||
        !elements.restart
    ) {

        return;

    }


    elements.next.addEventListener(
        "click",
        goToNextQuestion
    );


    elements.previous.addEventListener(
        "click",
        goToPreviousQuestion
    );


    elements.restart.addEventListener(
        "click",
        restartQuiz
    );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeQuiz() {

    const user =
        requireAuthentication();


    if (!user) {

        return;

    }


    currentQuizId =
        getQuizId();


    currentQuiz =
        QUIZ_DATA[
        currentQuizId
        ];


    if (
        !isValidQuiz(
            currentQuiz
        )
    ) {

        console.error(
            "Visium | Quiz inválido:",
            currentQuizId
        );


        window.location.href =
            "/pages/app/quizzes/quizzes.html";


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

    renderQuizHeader();

    const mode =
        getQuizMode();


    /*
     * Refazer explicitamente:
     * descarta somente a tentativa atual e cria
     * uma nova tentativa.
     *
     * O histórico anterior permanece intacto.
     */

    if (
        mode === "restart"
    ) {

        clearAttempt();


        answers =
            createEmptyAnswerState();


        currentQuestionIndex =
            0;


        attemptId =
            createAttemptId();


        window.__visiumQuizStartedAt =
            new Date().toISOString();


        saveAttempt();

    } else {

        /*
         * Continuar:
         * tenta recuperar a tentativa existente.
         */

        const hasAttempt =
            loadAttempt();


        if (!hasAttempt) {

            answers =
                createEmptyAnswerState();


            currentQuestionIndex =
                0;


            attemptId =
                createAttemptId();


            window.__visiumQuizStartedAt =
                new Date().toISOString();


            saveAttempt();

        }

    }


    initializeEvents();

    renderQuestion();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeQuiz
);