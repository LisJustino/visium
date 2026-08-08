/**
 * ==========================================================================
 * Visium
 * Arquivo: register.js
 * --------------------------------------------------------------------------
 * Comportamentos da página de cadastro.
 * ==========================================================================
 */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    () => {


        const form =
            document.querySelector("#registerForm");



        if (!form) {

            return;

        }





        form.addEventListener(
            "submit",
            (event) => {


                event.preventDefault();



                const password =
                    document.querySelector("#password").value;



                const confirmPassword =
                    document.querySelector("#confirmPassword").value;





                if (password !== confirmPassword) {


                    alert(
                        "As senhas não são iguais."
                    );


                    return;

                }





                const name =
                    document.querySelector("#name").value;



                const email =
                    document.querySelector("#email").value;





                console.info(
                    "Visium | Cadastro:",
                    {
                        name,
                        email
                    }
                );





                alert(
                    "Cadastro preparado. Integração com backend será adicionada posteriormente."
                );



            }
        );


    }
);