/**
 * ==========================================================================
 * Visium
 * Arquivo: content.js
 * --------------------------------------------------------------------------
 * Responsável pelos comportamentos da página de conteúdos.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Inicialização
========================================================================== */


document.addEventListener("DOMContentLoaded", () => {


    initializePage();


});



/* ==========================================================================
   Inicialização da página
========================================================================== */


function initializePage() {


    logPageLoaded();


    initializeCards();


}



/* ==========================================================================
   Logs
========================================================================== */


function logPageLoaded() {


    console.info(
        "Visium | Página de conteúdos carregada."
    );


}



/* ==========================================================================
   Cards de conteúdo
========================================================================== */


function initializeCards() {


    const cards = document.querySelectorAll(
        ".content-card"
    );


    if (!cards.length) {


        return;


    }


    cards.forEach((card) => {


        card.addEventListener(
            "mouseenter",
            () => {


                card.classList.add(
                    "is-active"
                );


            }
        );


        card.addEventListener(
            "mouseleave",
            () => {


                card.classList.remove(
                    "is-active"
                );


            }
        );


    });


}