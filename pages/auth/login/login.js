/**
 * ==========================================================================
 * Visium
 * Arquivo: login.js
 * --------------------------------------------------------------------------
 * Comportamentos da página de login.
 * ==========================================================================
 */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    () => {


        const form = document.querySelector("#loginForm");



        if (!form) {

            return;

        }




        form.addEventListener(
            "submit",
            (event) => {


                event.preventDefault();



                const email =
                    document.querySelector("#email").value;



                console.info(
                    "Visium | Tentativa de login:",
                    email
                );



                alert(
                    "Login preparado. Integração com backend será adicionada posteriormente."
                );


            }
        );


    }
);