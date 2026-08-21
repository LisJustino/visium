/**
 * ==========================================================================
 * Visium
 * Arquivo: landing.js
 *
 * Comportamento da Landing Page.
 * ==========================================================================
 */

"use strict";


const REGISTER_URL =
    "/pages/auth/register/register.html";


/* ========================================================================== 
   Navegação
========================================================================== */

function initializeRegisterButtons() {

    document
        .querySelectorAll(
            "#registerButton"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        window.location.assign(
                            REGISTER_URL
                        );

                    }
                );

            }
        );

}


/* ==========================================================================
   Inicialização
========================================================================== */

function initializeLanding() {

    initializeRegisterButtons();

    console.log(
        "Visium | Landing Page inicializada."
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initializeLanding
);