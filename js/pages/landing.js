/**
 * ==========================================================================
 * Visium
 * Arquivo: landing.js
 *
 * Scripts da Landing Page.
 * ==========================================================================
 */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /**
         * Scroll suave para âncoras internas
         */

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(link => {


                link.addEventListener(
                    "click",
                    event => {


                        const target =
                            document.querySelector(
                                link.getAttribute("href")
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth"

                        });


                    }
                );


            });





        /**
         * Animação dos cards ao entrar na tela
         */

        const cards =
            document.querySelectorAll(
                ".content-preview-card, .about-grid article"
            );


        const observer =
            new IntersectionObserver(
                entries => {


                    entries.forEach(entry => {


                        if (entry.isIntersecting) {


                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }


                    });


                },
                {
                    threshold: 0.15
                }
            );



        cards.forEach(card => {


            card.classList.add(
                "hidden"
            );


            observer.observe(
                card
            );


        });


    }
);