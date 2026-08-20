/**
 * ==========================================================================
 * Visium
 * Arquivo: login.js
 *
 * Controle da página de Login.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Elementos
========================================================================== */

const loginForm =
    document.querySelector(
        "#loginForm"
    );


const loginEmail =
    document.querySelector(
        "#loginEmail"
    );


const loginPassword =
    document.querySelector(
        "#loginPassword"
    );


const loginEmailError =
    document.querySelector(
        "#loginEmailError"
    );


const loginPasswordError =
    document.querySelector(
        "#loginPasswordError"
    );


const loginFeedback =
    document.querySelector(
        "#loginFeedback"
    );


const loginSubmit =
    document.querySelector(
        "#loginSubmit"
    );


const loginSubmitText =
    document.querySelector(
        "#loginSubmitText"
    );


const loginSubmitLoading =
    document.querySelector(
        "#loginSubmitLoading"
    );


const togglePassword =
    document.querySelector(
        "#togglePassword"
    );


const registerButton =
    document.querySelector(
        "#registerButton"
    );


const forgotPasswordButton =
    document.querySelector(
        "#forgotPasswordButton"
    );


/* ==========================================================================
   Redirecionamento
========================================================================== */

const DASHBOARD_URL =
    "/pages/app/dashboard/dashboard.html";


const REGISTER_URL =
    "/pages/auth/register/register.html";


const FORGOT_PASSWORD_URL =
    "/pages/auth/forgot-password/forgot-password.html";


/* ==========================================================================
   Feedback
========================================================================== */

function clearFieldErrors() {

    loginEmailError.textContent =
        "";

    loginPasswordError.textContent =
        "";

    loginEmail.removeAttribute(
        "aria-invalid"
    );

    loginPassword.removeAttribute(
        "aria-invalid"
    );

}


function showFieldError(
    field,
    errorElement,
    message
) {

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    errorElement.textContent =
        message;

}


function showFeedback(
    message,
    type = "error"
) {

    loginFeedback.textContent =
        message;

    loginFeedback.classList.toggle(
        "is-success",
        type === "success"
    );

    loginFeedback.hidden =
        false;

}


function clearFeedback() {

    loginFeedback.textContent =
        "";

    loginFeedback.classList.remove(
        "is-success"
    );

    loginFeedback.hidden =
        true;

}


/* ==========================================================================
   Validação
========================================================================== */

function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


function validateForm() {

    clearFieldErrors();

    clearFeedback();


    const email =
        loginEmail.value
            .trim()
            .toLowerCase();


    const password =
        loginPassword.value;


    let isValid =
        true;


    if (!email) {

        showFieldError(
            loginEmail,
            loginEmailError,
            "Informe seu e-mail."
        );

        isValid =
            false;

    } else if (
        !isValidEmail(
            email
        )
    ) {

        showFieldError(
            loginEmail,
            loginEmailError,
            "Informe um e-mail válido."
        );

        isValid =
            false;

    }


    if (!password) {

        showFieldError(
            loginPassword,
            loginPasswordError,
            "Informe sua senha."
        );

        isValid =
            false;

    }


    return {

        isValid,

        email,

        password

    };

}


/* ==========================================================================
   Estado do formulário
========================================================================== */

function setLoading(
    isLoading
) {

    loginSubmit.disabled =
        isLoading;


    loginSubmitText.hidden =
        isLoading;


    loginSubmitLoading.hidden =
        !isLoading;

}


/* ==========================================================================
   Mostrar / ocultar senha
========================================================================== */

function initializePasswordToggle() {

    if (!togglePassword) {

        return;

    }


    togglePassword.addEventListener(
        "click",
        () => {

            const showingPassword =
                loginPassword.type ===
                "text";


            loginPassword.type =
                showingPassword
                    ? "password"
                    : "text";


            togglePassword.textContent =
                showingPassword
                    ? "Mostrar"
                    : "Ocultar";


            togglePassword.setAttribute(
                "aria-label",
                showingPassword
                    ? "Mostrar senha"
                    : "Ocultar senha"
            );


            togglePassword.setAttribute(
                "aria-pressed",
                String(
                    !showingPassword
                )
            );

        }
    );

}


/* ==========================================================================
   Navegação
========================================================================== */

function initializeNavigation() {

    if (
        registerButton
    ) {

        registerButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    REGISTER_URL;

            }
        );

    }


    if (
        forgotPasswordButton
    ) {

        forgotPasswordButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    FORGOT_PASSWORD_URL;

            }
        );

    }

}


/* ==========================================================================
   Login
========================================================================== */

function handleLogin(
    event
) {

    event.preventDefault();


    const validation =
        validateForm();


    if (
        !validation.isValid
    ) {

        return;

    }


    if (
        !window.VisiumAuth
    ) {

        console.error(
            "Visium | Serviço de autenticação não carregado."
        );


        showFeedback(
            "Não foi possível carregar o serviço de autenticação."
        );

        return;

    }


    setLoading(
        true
    );


    try {

        const result =
            window.VisiumAuth.login(
                validation.email,
                validation.password
            );


        if (
            !result ||
            !result.success
        ) {

            showFeedback(
                result?.message ||
                "E-mail ou senha inválidos."
            );

            setLoading(
                false
            );

            return;

        }


        showFeedback(
            "Login realizado com sucesso.",
            "success"
        );


        /*
         * A sessão já foi criada pelo VisiumAuth.
         * O redirecionamento é imediato e determinístico.
         */

        window.location.assign(
            DASHBOARD_URL
        );

    } catch (error) {

        console.error(
            "Visium | Erro ao realizar login:",
            error
        );


        showFeedback(
            "Não foi possível realizar o login. Tente novamente."
        );


        setLoading(
            false
        );

    }

}


/* ==========================================================================
   Usuário já autenticado
========================================================================== */

function redirectAuthenticatedUser() {

    if (
        !window.VisiumAuth
    ) {

        return;

    }


    if (
        window.VisiumAuth.isAuthenticated()
    ) {

        window.location.replace(
            DASHBOARD_URL
        );

    }

}


/* ==========================================================================
   Inicialização
========================================================================== */

function initializeLogin() {

    if (
        !loginForm ||
        !loginEmail ||
        !loginPassword ||
        !loginSubmit ||
        !loginSubmitText ||
        !loginSubmitLoading
    ) {

        console.error(
            "Visium | Estrutura do formulário de login não encontrada."
        );

        return;

    }


    initializePasswordToggle();

    initializeNavigation();


    loginForm.addEventListener(
        "submit",
        handleLogin
    );


    redirectAuthenticatedUser();

}


initializeLogin();