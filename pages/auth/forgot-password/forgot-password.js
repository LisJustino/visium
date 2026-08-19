/**
 * ==========================================================================
 * Visium
 * Arquivo: forgot-password.js
 *
 * Controle da página de recuperação de acesso.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Elementos
========================================================================== */

const forgotPasswordForm =
    document.querySelector(
        "#forgotPasswordForm"
    );


const forgotPasswordEmail =
    document.querySelector(
        "#forgotPasswordEmail"
    );


const forgotPasswordEmailError =
    document.querySelector(
        "#forgotPasswordEmailError"
    );


const forgotPasswordFeedback =
    document.querySelector(
        "#forgotPasswordFeedback"
    );


const forgotPasswordSubmit =
    document.querySelector(
        "#forgotPasswordSubmit"
    );


const forgotPasswordSubmitText =
    document.querySelector(
        "#forgotPasswordSubmitText"
    );


const forgotPasswordSubmitLoading =
    document.querySelector(
        "#forgotPasswordSubmitLoading"
    );


const forgotPasswordLoginButton =
    document.querySelector(
        "#forgotPasswordLoginButton"
    );


/* ==========================================================================
   Configuração
========================================================================== */

const LOGIN_URL =
    "/pages/auth/login/login.html";


/* ==========================================================================
   Validação
========================================================================== */

function normalizeEmail(
    email
) {

    return String(
        email || ""
    )
        .trim()
        .toLowerCase();

}


function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


/* ==========================================================================
   Feedback
========================================================================== */

function clearFieldErrors() {

    forgotPasswordEmail.removeAttribute(
        "aria-invalid"
    );

    forgotPasswordEmailError.textContent =
        "";

}


function clearFeedback() {

    forgotPasswordFeedback.textContent =
        "";

    forgotPasswordFeedback.classList.remove(
        "is-success"
    );

    forgotPasswordFeedback.hidden =
        true;

}


function showFieldError(
    message
) {

    forgotPasswordEmail.setAttribute(
        "aria-invalid",
        "true"
    );

    forgotPasswordEmailError.textContent =
        message;

}


function showFeedback(
    message,
    type = "error"
) {

    forgotPasswordFeedback.textContent =
        message;

    forgotPasswordFeedback.classList.toggle(
        "is-success",
        type === "success"
    );

    forgotPasswordFeedback.hidden =
        false;

}


/* ==========================================================================
   Estado do formulário
========================================================================== */

function setLoading(
    isLoading
) {

    forgotPasswordSubmit.disabled =
        isLoading;

    forgotPasswordSubmitText.hidden =
        isLoading;

    forgotPasswordSubmitLoading.hidden =
        !isLoading;

}


/* ==========================================================================
   Solicitação
========================================================================== */

function handleForgotPassword(
    event
) {

    event.preventDefault();


    clearFieldErrors();

    clearFeedback();


    const email =
        normalizeEmail(
            forgotPasswordEmail.value
        );


    if (!email) {

        showFieldError(
            "Informe seu e-mail."
        );

        return;

    }


    if (
        !isValidEmail(
            email
        )
    ) {

        showFieldError(
            "Informe um e-mail válido."
        );

        return;

    }


    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.requestPasswordReset !==
            "function"
    ) {

        console.error(
            "Visium | Serviço de recuperação não carregado."
        );


        showFeedback(
            "Não foi possível carregar o serviço de recuperação."
        );

        return;

    }


    setLoading(
        true
    );


    try {

        const result =
            window.VisiumAuth.requestPasswordReset(
                email
            );


        if (
            !result ||
            !result.success
        ) {

            showFeedback(
                result?.message ||
                "Não foi possível iniciar a recuperação."
            );

            return;

        }


        /*
         * O token será utilizado na próxima etapa
         * do fluxo de redefinição.
         */

        sessionStorage.setItem(
            "visium_password_reset_token",
            result.token
        );


        sessionStorage.setItem(
            "visium_password_reset_email",
            email
        );


        showFeedback(
            "Solicitação validada. Você será direcionado para criar uma nova senha.",
            "success"
        );


        window.setTimeout(
            () => {

                window.location.href =
                    "/pages/auth/forgot-password/reset-password.html";

            },
            500
        );

    } catch (error) {

        console.error(
            "Visium | Erro na recuperação de acesso:",
            error
        );


        showFeedback(
            "Não foi possível iniciar a recuperação. Tente novamente."
        );

    } finally {

        setLoading(
            false
        );

    }

}


/* ==========================================================================
   Navegação
========================================================================== */

function initializeNavigation() {

    if (
        forgotPasswordLoginButton
    ) {

        forgotPasswordLoginButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    LOGIN_URL;

            }
        );

    }

}


/* ==========================================================================
   Inicialização
========================================================================== */

function initializeForgotPassword() {

    if (
        !forgotPasswordForm ||
        !forgotPasswordEmail ||
        !forgotPasswordSubmit
    ) {

        console.error(
            "Visium | Estrutura da recuperação de acesso não encontrada."
        );

        return;

    }


    initializeNavigation();


    forgotPasswordForm.addEventListener(
        "submit",
        handleForgotPassword
    );

}


initializeForgotPassword();