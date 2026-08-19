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


const registerTermsButton =
    document.querySelector(
        "#registerTermsButton"
    );


/* ==========================================================================
   Regras
========================================================================== */

const MIN_PASSWORD_LENGTH =
    8;


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
            MIN_PASSWORD_LENGTH,

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

    const rules =
        getPasswordRules(
            registerPassword.value
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


    ruleLength.classList.toggle(
        "is-valid",
        rules.length
    );


    ruleLetter.classList.toggle(
        "is-valid",
        rules.letter
    );


    ruleNumber.classList.toggle(
        "is-valid",
        rules.number
    );

}


/* ==========================================================================
   Validação
========================================================================== */

function validateForm() {

    clearFieldErrors();

    clearFeedback();


    const name =
        registerName.value.trim();


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
            "A senha não atende aos requisitos."
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

        registerTerms.setAttribute(
            "aria-invalid",
            "true"
        );


        registerTermsError.textContent =
            "Você precisa aceitar os Termos de Uso.";

        isValid =
            false;

    }


    return {

        isValid,

        name,

        email,

        password,

        passwordConfirmation,

        termsAccepted

    };

}


/* ==========================================================================
   Estado do formulário
========================================================================== */

function setLoading(
    isLoading
) {

    registerSubmit.disabled =
        isLoading;


    registerSubmitText.hidden =
        isLoading;


    registerSubmitLoading.hidden =
        !isLoading;

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
   Termos
========================================================================== */

function initializeTermsButton() {

    if (!registerTermsButton) {

        return;

    }


    registerTermsButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/pages/public/terms/terms.html";

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

        /*
         * A criação definitiva da conta será feita pelo serviço
         * central de autenticação.
         */

        const result =
            await Promise.resolve(
                window.VisiumAuth.register(
                    validation.name,
                    validation.email,
                    validation.password,
                    validation.termsAccepted
                )
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

                window.location.href =
                    "/pages/app/dashboard/dashboard.html";

            },
            400
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
            "/pages/app/dashboard/dashboard.html"
        );

    }

}


/* ==========================================================================
   Eventos auxiliares
========================================================================== */

function initializeFormEvents() {

    registerPassword.addEventListener(
        "input",
        updatePasswordRules
    );


    registerPasswordConfirmation.addEventListener(
        "input",
        () => {

            if (
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


    registerEmail.addEventListener(
        "blur",
        () => {

            registerEmail.value =
                normalizeEmail(
                    registerEmail.value
                );

        }
    );


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
        !registerTerms
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


    initializeTermsButton();


    initializeFormEvents();


    registerForm.addEventListener(
        "submit",
        handleRegister
    );


    updatePasswordRules();


    redirectAuthenticatedUser();

}


initializeRegister();