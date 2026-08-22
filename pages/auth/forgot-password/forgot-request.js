"use strict";

const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
const forgotPasswordEmail = document.querySelector("#forgotPasswordEmail");
const forgotPasswordEmailError = document.querySelector("#forgotPasswordEmailError");
const forgotPasswordFeedback = document.querySelector("#forgotPasswordFeedback");
const forgotPasswordSubmit = document.querySelector("#forgotPasswordSubmit");
const forgotPasswordSubmitText = document.querySelector("#forgotPasswordSubmitText");
const forgotPasswordSubmitLoading = document.querySelector("#forgotPasswordSubmitLoading");
const forgotPasswordLoginButton = document.querySelector("#forgotPasswordLoginButton");

function showError(message) {
    forgotPasswordEmail.setAttribute("aria-invalid", "true");
    forgotPasswordEmailError.textContent = message;
}

function clearFeedback() {
    forgotPasswordEmail.removeAttribute("aria-invalid");
    forgotPasswordEmailError.textContent = "";
    forgotPasswordFeedback.textContent = "";
    forgotPasswordFeedback.classList.remove("is-success");
    forgotPasswordFeedback.hidden = true;
}

function setLoading(isLoading) {
    forgotPasswordSubmit.disabled = isLoading;
    forgotPasswordSubmitText.hidden = isLoading;
    forgotPasswordSubmitLoading.hidden = !isLoading;
}

async function handleForgotPassword(event) {
    event.preventDefault();
    clearFeedback();

    const email = String(forgotPasswordEmail.value || "").trim().toLowerCase();

    if (!email) {
        showError("Informe seu e-mail.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Informe um e-mail válido.");
        return;
    }

    setLoading(true);

    try {
        const result = await window.VisiumAuth.requestPasswordReset(email);

        if (!result || !result.success) {
            throw new Error(result?.message || "Não foi possível iniciar a recuperação.");
        }

        forgotPasswordFeedback.textContent =
            "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.";
        forgotPasswordFeedback.classList.add("is-success");
        forgotPasswordFeedback.hidden = false;
        forgotPasswordForm.reset();
    } catch (error) {
        console.error("Visium | Erro na recuperação de acesso:", error);
        forgotPasswordFeedback.textContent = "Não foi possível iniciar a recuperação. Tente novamente.";
        forgotPasswordFeedback.hidden = false;
    } finally {
        setLoading(false);
    }
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", handleForgotPassword);
}

if (forgotPasswordLoginButton) {
    forgotPasswordLoginButton.addEventListener("click", () => {
        window.location.href = "/pages/auth/login/login.html";
    });
}