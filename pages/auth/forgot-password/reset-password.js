/**
 * ==========================================================================
 * Visium
 * Arquivo: reset-password.js
 *
 * Controle da página de redefinição de senha.
 * ==========================================================================
 */

"use strict";

/* ==========================================================================
   Elementos
========================================================================== */

const resetPasswordForm =
    document.querySelector("#resetPasswordForm");

const resetPasswordNew =
    document.querySelector("#resetPasswordNew");

const resetPasswordConfirm =
    document.querySelector("#resetPasswordConfirm");

const resetPasswordNewError =
    document.querySelector("#resetPasswordNewError");

const resetPasswordConfirmError =
    document.querySelector("#resetPasswordConfirmError");

const resetPasswordFeedback =
    document.querySelector("#resetPasswordFeedback");

const resetPasswordSubmit =
    document.querySelector("#resetPasswordSubmit");

const resetPasswordSubmitText =
    document.querySelector("#resetPasswordSubmitText");

const resetPasswordSubmitLoading =
    document.querySelector("#resetPasswordSubmitLoading");

const resetPasswordLoginButton =
    document.querySelector("#resetPasswordLoginButton");

/* ==========================================================================
   Configuração
========================================================================== */

const LOGIN_URL =
    "/pages/auth/login/login.html";

const RESET_TOKEN_KEY =
    "visium_password_reset_token";

const RESET_EMAIL_KEY =
    "visium_password_reset_email";

const MIN_PASSWORD_LENGTH = 8;

/* ==========================================================================
   Feedback
========================================================================== */

function clearErrors() {
    resetPasswordNew.removeAttribute(
        "aria-invalid"
    );

    resetPasswordConfirm.removeAttribute(
        "aria-invalid"
    );

    resetPasswordNewError.textContent = "";

    resetPasswordConfirmError.textContent = "";
}

function clearFeedback() {
    resetPasswordFeedback.textContent = "";

    resetPasswordFeedback.classList.remove(
        "is-success"
    );

    resetPasswordFeedback.hidden = true;
}

function showFieldError(
    field,
    element,
    message
) {
    field.setAttribute(
        "aria-invalid",
        "true"
    );

    element.textContent = message;
}

function showFeedback(
    message,
    type = "error"
) {
    resetPasswordFeedback.textContent =
        message;

    resetPasswordFeedback.classList.toggle(
        "is-success",
        type === "success"
    );

    resetPasswordFeedback.hidden = false;
}

/* ==========================================================================
   Estado
========================================================================== */

function setLoading(isLoading) {
    resetPasswordSubmit.disabled =
        isLoading;

    resetPasswordSubmitText.hidden =
        isLoading;

    resetPasswordSubmitLoading.hidden =
        !isLoading;
}

/* ==========================================================================
   Validação
========================================================================== */

function validateForm() {
    clearErrors();
    clearFeedback();

    const password =
        resetPasswordNew.value;

    const confirmation =
        resetPasswordConfirm.value;

    let isValid = true;

    if (!password) {
        showFieldError(
            resetPasswordNew,
            resetPasswordNewError,
            "Informe uma nova senha."
        );

        isValid = false;
    } else if (
        password.length < MIN_PASSWORD_LENGTH
    ) {
        showFieldError(
            resetPasswordNew,
            resetPasswordNewError,
            "A senha deve possuir pelo menos 8 caracteres."
        );

        isValid = false;
    } else if (
        !/[A-Za-zÀ-ÿ]/.test(password) ||
        !/\d/.test(password)
    ) {
        showFieldError(
            resetPasswordNew,
            resetPasswordNewError,
            "A senha deve conter pelo menos uma letra e um número."
        );

        isValid = false;
    }

    if (!confirmation) {
        showFieldError(
            resetPasswordConfirm,
            resetPasswordConfirmError,
            "Confirme sua nova senha."
        );

        isValid = false;
    } else if (
        password !== confirmation
    ) {
        showFieldError(
            resetPasswordConfirm,
            resetPasswordConfirmError,
            "As senhas não coincidem."
        );

        isValid = false;
    }

    return {
        isValid,
        password
    };
}

/* ==========================================================================
   Redefinição
========================================================================== */

async function handleResetPassword(event) {
    event.preventDefault();

    const validation =
        validateForm();

    if (!validation.isValid) {
        return;
    }

    const token =
        sessionStorage.getItem(
            RESET_TOKEN_KEY
        );

    if (!token) {
        showFeedback(
            "O link de recuperação é inválido ou expirou."
        );

        resetPasswordSubmit.disabled = true;

        return;
    }

    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.resetPassword !==
            "function"
    ) {
        console.error(
            "Visium | Serviço de redefinição não carregado."
        );

        showFeedback(
            "Não foi possível carregar o serviço de redefinição."
        );

        return;
    }

    setLoading(true);

    try {
        const result =
            await window.VisiumAuth.resetPassword(
                token,
                validation.password
            );

        if (
            !result ||
            !result.success
        ) {
            showFeedback(
                result?.message ||
                    "Não foi possível redefinir sua senha."
            );

            return;
        }

        sessionStorage.removeItem(
            RESET_TOKEN_KEY
        );

        sessionStorage.removeItem(
            RESET_EMAIL_KEY
        );

        showFeedback(
            "Senha redefinida com sucesso. Você será direcionado para o login.",
            "success"
        );

        resetPasswordForm.reset();

        window.setTimeout(() => {
            window.location.replace(
                LOGIN_URL
            );
        }, 1000);
    } catch (error) {
        console.error(
            "Visium | Erro ao redefinir senha:",
            error
        );

        showFeedback(
            "Não foi possível redefinir sua senha. Tente novamente."
        );
    } finally {
        setLoading(false);
    }
}

/* ==========================================================================
   Navegação
========================================================================== */

function initializeNavigation() {
    if (!resetPasswordLoginButton) {
        return;
    }

    resetPasswordLoginButton.addEventListener(
        "click",
        () => {
            window.location.assign(
                LOGIN_URL
            );
        }
    );
}

/* ==========================================================================
   Validação inicial do token
========================================================================== */

function validateResetToken() {
    const token =
        sessionStorage.getItem(
            RESET_TOKEN_KEY
        );

    if (token) {
        return true;
    }

    showFeedback(
        "O link de recuperação é inválido ou expirou."
    );

    resetPasswordSubmit.disabled = true;

    resetPasswordNew.disabled = true;

    resetPasswordConfirm.disabled = true;

    return false;
}

/* ==========================================================================
   Inicialização
========================================================================== */

function initializeResetPassword() {
    if (
        !resetPasswordForm ||
        !resetPasswordNew ||
        !resetPasswordConfirm ||
        !resetPasswordSubmit
    ) {
        console.error(
            "Visium | Estrutura da redefinição não encontrada."
        );

        return;
    }

    initializeNavigation();

    const queryToken = new URLSearchParams(
        window.location.search
    ).get("token");

    if (queryToken) {
        sessionStorage.setItem(
            RESET_TOKEN_KEY,
            queryToken
        );
    }

    resetPasswordForm.addEventListener(
        "submit",
        handleResetPassword
    );

    validateResetToken();
}

initializeResetPassword();