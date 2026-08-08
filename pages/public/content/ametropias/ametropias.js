/**
 * ==========================================================================
 * Visium
 * Arquivo: ametropias.js
 * --------------------------------------------------------------------------
 * Comportamentos da página de Ametropias.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Inicialização
========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePage();

    enableSmoothScroll();

});


/* ==========================================================================
   Inicialização da página
========================================================================== */

function initializePage() {

    console.info("Visium | Página Ametropias carregada.");

}


/* ==========================================================================
   Scroll suave para âncoras internas
========================================================================== */

function enableSmoothScroll() {

    const links = document.querySelectorAll(
        '.module-index a[href^="#"]'
    );


    links.forEach((link) => {


        link.addEventListener("click", (event) => {


            event.preventDefault();


            const targetId = link.getAttribute("href");


            const target = document.querySelector(targetId);


            if (!target) {

                return;

            }


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


        });


    });


}