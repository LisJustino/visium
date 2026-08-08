/**
 * ==========================================================================
 * Visium
 * Arquivo: forgot-password.js
 * --------------------------------------------------------------------------
 * Comportamentos da página de recuperação de senha.
 * ==========================================================================
 */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    () => {


        const form =
            document.querySelector("#forgotPasswordForm");



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
                    "Visium | Recuperação de senha:",
                    email
                );





                alert(
                    "Instruções de recuperação preparadas. A integração com backend será adicionada posteriormente."
                );



            }
        );


    }
);