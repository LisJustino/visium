/**
 * ==========================================================================
 * Visium
 * Arquivo: loader.js
 * ==========================================================================
 */

"use strict";


async function loadComponent(selector, path) {


    const element = document.querySelector(selector);


    if (!element) {

        return;

    }



    try {


        const response = await fetch(path);



        if (!response.ok) {


            throw new Error(
                `Erro ao carregar ${path}`
            );


        }



        element.innerHTML =
            await response.text();



    } catch (error) {


        console.error(
            "Visium | Erro ao carregar componente:",
            error
        );


    }


}




document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadComponent(
            "#site-header",
            "/components/header/header.html"
        );



        loadComponent(
            "#site-footer",
            "/components/footer/footer.html"
        );


    }
);