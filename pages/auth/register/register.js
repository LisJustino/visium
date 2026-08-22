/**
 * ==========================================================================
 * Visium
 * Arquivo: register.js
 *
 * Controle da página de Cadastro.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Elementos
========================================================================== */

const registerForm =
    document.querySelector(
        "#registerForm"
    );


const registerName =
    document.querySelector(
        "#registerName"
    );


const registerEmail =
    document.querySelector(
        "#registerEmail"
    );


const registerPassword =
    document.querySelector(
        "#registerPassword"
    );


const registerPasswordConfirmation =
    document.querySelector(
        "#registerPasswordConfirmation"
    );


const registerTerms =
    document.querySelector(
        "#registerTerms"
    );


const registerNameError =
    document.querySelector(
        "#registerNameError"
    );


const registerEmailError =
    document.querySelector(
        "#registerEmailError"
    );


const registerPasswordError =
    document.querySelector(
        "#registerPasswordError"
    );


const registerPasswordConfirmationError =
    document.querySelector(
        "#registerPasswordConfirmationError"
    );


const registerTermsError =
    document.querySelector(
        "#registerTermsError"
    );


const registerFeedback =
    document.querySelector(
        "#registerFeedback"
    );


const registerSubmit =
    document.querySelector(
        "#registerSubmit"
    );


const registerSubmitText =
    document.querySelector(
        "#registerSubmitText"
    );


const registerSubmitLoading =
    document.querySelector(
        "#registerSubmitLoading"
    );


const toggleRegisterPassword =
    document.querySelector(
        "#toggleRegisterPassword"
    );


const toggleRegisterPasswordConfirmation =
    document.querySelector(
        "#toggleRegisterPasswordConfirmation"
    );


const ruleLength =
    document.querySelector(
        "#ruleLength"
    );


const ruleLetter =
    document.querySelector(
        "#ruleLetter"
    );


const ruleNumber =
    document.querySelector(
        "#ruleNumber"
    );


/* ==========================================================================
   Configuração
========================================================================== */

const REGISTER_MIN_PASSWORD_LENGTH =
    8;


const DASHBOARD_URL =
    "/pages/app/dashboard/dashboard.html";


/* ==========================================================================
   Feedback
========================================================================== */

function clearFieldErrors() {

    const fields = [

        registerName,
        registerEmail,
        registerPassword,
        registerPasswordConfirmation,
        registerTerms

    ];


    fields.forEach(
        field => {

            if (!field) {

                return;

            }


            field.removeAttribute(
                "aria-invalid"
            );

        }
    );


    registerNameError.textContent =
        "";

    registerEmailError.textContent =
        "";

    registerPasswordError.textContent =
        "";

    registerPasswordConfirmationError.textContent =
        "";

    registerTermsError.textContent =
        "";

}


function showFieldError(
    field,
    errorElement,
    message
) {

    if (
        !field ||
        !errorElement
    ) {

        return;

    }


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

    if (!registerFeedback) {

        return;

    }


    registerFeedback.textContent =
        message;


    registerFeedback.classList.toggle(
        "is-success",
        type === "success"
    );


    registerFeedback.hidden =
        false;

}


function clearFeedback() {

    if (!registerFeedback) {

        return;

    }


    registerFeedback.textContent =
        "";

    registerFeedback.classList.remove(
        "is-success"
    );

    registerFeedback.hidden =
        true;

}


/* ==========================================================================
   E-mail
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
   Senha
========================================================================== */

function getPasswordRules(
    password
) {

    return {

        length:
            password.length >=
            REGISTER_MIN_PASSWORD_LENGTH,

        letter:
            /[A-Za-zÀ-ÿ]/.test(
                password
            ),

        number:
            /\d/.test(
                password
            )

    };

}


function isValidPassword(
    password
) {

    const rules =
        getPasswordRules(
            password
        );


    return (
        rules.length &&
        rules.letter &&
        rules.number
    );

}


/* ==========================================================================
   Indicadores da senha
========================================================================== */

function updatePasswordRules() {

    if (!registerPassword) {

        return;

    }


    const rules =
        getPasswordRules(
            registerPassword.value
        );


    if (ruleLength) {

        ruleLength.classList.toggle(
            "is-valid",
            rules.length
        );

    }


    if (ruleLetter) {

        ruleLetter.classList.toggle(
            "is-valid",
            rules.letter
        );

    }


    if (ruleNumber) {

        ruleNumber.classList.toggle(
            "is-valid",
            rules.number
        );

    }

}


/* ==========================================================================
   Validação
========================================================================== */

function validateForm() {

    clearFieldErrors();

    clearFeedback();


    const name =
        registerName.value
            .trim();


    const email =
        normalizeEmail(
            registerEmail.value
        );


    const password =
        registerPassword.value;


    const passwordConfirmation =
        registerPasswordConfirmation.value;


    const termsAccepted =
        registerTerms.checked;


    let isValid =
        true;


    /* ----------------------------------------------------------------------
       Nome
    ---------------------------------------------------------------------- */

    if (!name) {

        showFieldError(
            registerName,
            registerNameError,
            "Informe seu nome."
        );

        isValid =
            false;

    } else if (
        name.length <
        2
    ) {

        showFieldError(
            registerName,
            registerNameError,
            "Informe um nome válido."
        );

        isValid =
            false;

    }


    /* ----------------------------------------------------------------------
       E-mail
    ---------------------------------------------------------------------- */

    if (!email) {

        showFieldError(
            registerEmail,
            registerEmailError,
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
            registerEmail,
            registerEmailError,
            "Informe um e-mail válido."
        );

        isValid =
            false;

    }


    /* ----------------------------------------------------------------------
       Senha
    ---------------------------------------------------------------------- */

    if (!password) {

        showFieldError(
            registerPassword,
            registerPasswordError,
            "Crie uma senha."
        );

        isValid =
            false;

    } else if (
        !isValidPassword(
            password
        )
    ) {

        showFieldError(
            registerPassword,
            registerPasswordError,
            "A senha deve possuir pelo menos 8 caracteres, uma letra e um número."
        );

        isValid =
            false;

    }


    /* ----------------------------------------------------------------------
       Confirmação
    ---------------------------------------------------------------------- */

    if (!passwordConfirmation) {

        showFieldError(
            registerPasswordConfirmation,
            registerPasswordConfirmationError,
            "Confirme sua senha."
        );

        isValid =
            false;

    } else if (
        password !==
        passwordConfirmation
    ) {

        showFieldError(
            registerPasswordConfirmation,
            registerPasswordConfirmationError,
            "As senhas não coincidem."
        );

        isValid =
            false;

    }


    /* ----------------------------------------------------------------------
       Termos
    ---------------------------------------------------------------------- */

    if (!termsAccepted) {

        showFieldError(
            registerTerms,
            registerTermsError,
            "Você precisa aceitar os Termos de Uso."
        );

        isValid =
            false;

    }


    return {

        isValid,

        name,

        email,

        password,

        termsAccepted

    };

}


/* ==========================================================================
   Estado do formulário
========================================================================== */

function setLoading(
    isLoading
) {

    if (registerSubmit) {

        registerSubmit.disabled =
            isLoading;

    }


    if (registerSubmitText) {

        registerSubmitText.hidden =
            isLoading;

    }


    if (registerSubmitLoading) {

        registerSubmitLoading.hidden =
            !isLoading;

    }

}


/* ==========================================================================
   Mostrar / ocultar senha
========================================================================== */

function initializePasswordToggle(
    button,
    input
) {

    if (
        !button ||
        !input
    ) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const showingPassword =
                input.type ===
                "text";


            input.type =
                showingPassword
                    ? "password"
                    : "text";


            button.textContent =
                showingPassword
                    ? "Mostrar"
                    : "Ocultar";


            button.setAttribute(
                "aria-label",
                showingPassword
                    ? "Mostrar senha"
                    : "Ocultar senha"
            );


            button.setAttribute(
                "aria-pressed",
                String(
                    !showingPassword
                )
            );

        }
    );

}


/* ==========================================================================
   Cadastro
========================================================================== */

async function handleRegister(
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
        !window.VisiumAuth ||
        typeof window.VisiumAuth.register !==
        "function"
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
            await window.VisiumAuth.register(
                validation.name,
                validation.email,
                validation.password,
                validation.termsAccepted
            );


        if (
            !result ||
            !result.success
        ) {

            showFeedback(
                result?.message ||
                "Não foi possível criar sua conta."
            );

            return;

        }


        showFeedback(
            "Conta criada com sucesso.",
            "success"
        );


        window.setTimeout(
            () => {

                window.location.assign(
                    DASHBOARD_URL
                );

            },
            500
        );

    } catch (error) {

        console.error(
            "Visium | Erro ao criar conta:",
            error
        );


        showFeedback(
            "Não foi possível criar sua conta. Tente novamente."
        );

    } finally {

        setLoading(
            false
        );

    }

}


/* ==========================================================================
   Usuário já autenticado
========================================================================== */

async function redirectAuthenticatedUser() {

    if (
        !window.VisiumAuth ||
        typeof window.VisiumAuth.isAuthenticated !==
        "function"
    ) {

        return;

    }


    try {

        const authenticated =
            await window.VisiumAuth.isAuthenticated();


        if (authenticated) {

            window.location.replace(
                DASHBOARD_URL
            );

        }

    } catch (error) {

        console.error(
            "Visium | Erro ao verificar autenticação:",
            error
        );

    }

}


/* ==========================================================================
   Eventos auxiliares
========================================================================== */

function initializeFormEvents() {

    if (registerPassword) {

        registerPassword.addEventListener(
            "input",
            updatePasswordRules
        );

    }


    if (
        registerPasswordConfirmation &&
        registerPassword
    ) {

        registerPasswordConfirmation.addEventListener(
            "input",
            () => {

                if (
                    registerPasswordConfirmation.value &&
                    registerPasswordConfirmation.value ===
                    registerPassword.value
                ) {

                    registerPasswordConfirmation.removeAttribute(
                        "aria-invalid"
                    );

                    registerPasswordConfirmationError.textContent =
                        "";

                }

            }
        );

    }


    if (registerEmail) {

        registerEmail.addEventListener(
            "blur",
            () => {

                registerEmail.value =
                    normalizeEmail(
                        registerEmail.value
                    );

            }
        );

    }


    if (registerTerms) {

        registerTerms.addEventListener(
            "change",
            () => {

                if (
                    registerTerms.checked
                ) {

                    registerTerms.removeAttribute(
                        "aria-invalid"
                    );

                    registerTermsError.textContent =
                        "";

                }

            }
        );

    }

}


/* ==========================================================================
   Inicialização
========================================================================== */

function initializeRegister() {

    if (
        !registerForm ||
        !registerName ||
        !registerEmail ||
        !registerPassword ||
        !registerPasswordConfirmation ||
        !registerTerms ||
        !registerSubmit
    ) {

        console.error(
            "Visium | Estrutura do formulário de cadastro não encontrada."
        );

        return;

    }


    initializePasswordToggle(
        toggleRegisterPassword,
        registerPassword
    );


    initializePasswordToggle(
        toggleRegisterPasswordConfirmation,
        registerPasswordConfirmation
    );


    initializeFormEvents();


    updatePasswordRules();


    redirectAuthenticatedUser();


    registerForm.addEventListener(
        "submit",
        handleRegister
    );

}


initializeRegister();