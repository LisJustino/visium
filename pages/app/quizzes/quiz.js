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

let currentQuestionIndex = 0;

let score = 0;

let selectedAnswer = null;

let answerConfirmed = false;


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
                "/index.html";

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
        score;

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


    selectedAnswer =
        null;


    answerConfirmed =
        false;


    elements.questionText.textContent =
        question.text;


    elements.options.innerHTML =
        "";


    hideFeedback();


    elements.next.disabled =
        true;


    elements.next.textContent =
        "Confirmar resposta";


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


            button.innerHTML = `

                <span class="quiz-option__letter">
                    ${letter}
                </span>

                <span>
                    ${option}
                </span>

            `;


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


    updateProgress();

}


/* ==========================================================================
   Seleção
========================================================================== */

function selectAnswer(
    index
) {

    if (
        answerConfirmed
    ) {

        return;

    }


    selectedAnswer =
        index;


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

}


/* ==========================================================================
   Confirmação
========================================================================== */

function confirmAnswer() {

    if (
        selectedAnswer === null ||
        answerConfirmed
    ) {

        return;

    }


    const elements =
        getElements();


    const question =
        currentQuiz.questions[
            currentQuestionIndex
        ];


    answerConfirmed =
        true;


    const isCorrect =
        selectedAnswer ===
        question.correct;


    if (isCorrect) {

        score += 1;

    }


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            (button) => {

                const index =
                    Number(
                        button.dataset.index
                    );


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
                    index === selectedAnswer &&
                    !isCorrect
                ) {

                    button.classList.add(
                        "is-wrong"
                    );

                }

            }
        );


    elements.feedback.hidden =
        false;


    elements.feedbackTitle.textContent =
        isCorrect
            ? "Resposta correta!"
            : "Resposta incorreta.";


    elements.feedbackMessage.textContent =
        question.explanation;


    elements.feedback.classList.add(
        isCorrect
            ? "is-correct"
            : "is-wrong"
    );


    if (
        currentQuestionIndex <
        currentQuiz.questions.length - 1
    ) {

        elements.next.textContent =
            "Próxima questão →";

    } else {

        elements.next.textContent =
            "Ver resultado";

    }


    elements.next.disabled =
        false;


    elements.score.textContent =
        score;

}


/* ==========================================================================
   Próxima questão
========================================================================== */

function goToNextQuestion() {

    if (!answerConfirmed) {

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


    renderQuestion();

}


/* ==========================================================================
   Histórico
========================================================================== */

function saveResult() {

    const total =
        currentQuiz.questions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    const historyKey =
        "visium_quiz_history";


    let history = [];


    const stored =
        localStorage.getItem(
            historyKey
        );


    if (stored) {

        try {

            const parsed =
                JSON.parse(
                    stored
                );


            if (
                Array.isArray(
                    parsed
                )
            ) {

                history =
                    parsed;

            }

        } catch (error) {

            console.error(
                "Visium | Histórico inválido:",
                error
            );

        }

    }


    history.push({

        quizId:
            getQuizId(),

        score:
            percentage,

        correct:
            score,

        total:
            total,

        date:
            new Date().toISOString()

    });


    localStorage.setItem(
        historyKey,
        JSON.stringify(
            history
        )
    );


    localStorage.setItem(
        `visium_quiz_progress_${getQuizId()}`,
        "100"
    );

}


/* ==========================================================================
   Resultado
========================================================================== */

function finishQuiz() {

    const elements =
        getElements();


    const total =
        currentQuiz.questions.length;


    const wrong =
        total - score;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    saveResult();


    elements.quizCard.hidden =
        true;


    elements.result.hidden =
        false;


    elements.resultScore.textContent =
        `${percentage}%`;


    elements.resultCorrect.textContent =
        score;


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


    score =
        0;


    selectedAnswer =
        null;


    answerConfirmed =
        false;


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


    const quizId =
        getQuizId();


    currentQuiz =
        QUIZ_DATA[
            quizId
        ];


    if (!currentQuiz) {

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


    initializeSidebar();

    initializeLogout();

    initializeProfileButton();

    renderQuizHeader();

    initializeEvents();

    renderQuestion();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeQuiz
);