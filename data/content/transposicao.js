/**
 * ==========================================================================
 * Visium
 * Arquivo: transposicao.js
 *
 * Conteúdo educacional:
 * Transposição
 *
 * Fonte:
 * TRANSPOSIÇÃO.docx
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Conteúdo
========================================================================== */

const VISIUM_TRANSPOSICAO_CONTENT = {

    id:
        "transposicao",

    category:
        "Óptica",

    title:
        "Transposição",

    description:
        "Aprenda como realizar a transposição de uma receita oftálmica, convertendo o cilindro sem alterar o poder dióptrico da lente.",

    source:
        "TRANSPOSIÇÃO.docx",

    sections: [

        /* ==================================================================
           Introdução
        ================================================================== */

        {

            id:
                "introducao",

            title:
                "Introdução",

            order:
                1,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "Depois de entender como interpretar uma receita oftálmica, o próximo passo é conhecer a transposição, um procedimento muito utilizado na óptica."

                },

                {

                    type:
                        "text",

                    content:
                        "A transposição consiste em converter os valores do cilindro, responsável pela correção do astigmatismo, sem alterar o poder dióptrico da lente."

                },

                {

                    type:
                        "text",

                    content:
                        "Esse processo é necessário porque uma mesma receita pode ser apresentada com cilindro positivo (+) ou cilindro negativo (-), dependendo do padrão adotado pelo profissional que realizou a prescrição."

                },

                {

                    type:
                        "text",

                    content:
                        "Para que a fabricação das lentes seja feita corretamente, muitas vezes é preciso converter esses valores para o padrão utilizado pelo laboratório."

                },

                {

                    type:
                        "text",

                    content:
                        "Essa mudança segue uma regra matemática específica e garante que a correção visual permaneça exatamente a mesma, independentemente da forma como a receita foi escrita."

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/transposição/transposicao-exemplo.jpeg",

                    alt:
                        "Exemplo de transposição de uma receita oftálmica"

                }

            ]

        },


        /* ==================================================================
           Como fazer a transposição
        ================================================================== */

        {

            id:
                "como-fazer",

            title:
                "Como fazer a transposição",

            order:
                2,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "No exemplo apresentado, o valor do cilindro está em sinal positivo (+). Para convertê-lo para sinal negativo (-), basta seguir três etapas simples."

                },

                {

                    type:
                        "list",

                    title:
                        "Etapas da transposição:",

                    items: [

                        "Some o valor esférico com o valor cilíndrico. O resultado será o novo valor da esfera.",

                        "Altere o sinal do cilindro. Se ele estiver positivo (+), passa para negativo (-). Se estiver negativo (-), passa para positivo (+). O valor numérico permanece o mesmo.",

                        "Ajuste o eixo em 90°. Se o eixo for maior que 90°, subtraia 90°. Se o eixo for menor que 90°, some 90°."

                    ]

                },

                {

                    type:
                        "text",

                    content:
                        "Após realizar esses três passos, a receita estará corretamente transposta, mantendo exatamente a mesma correção visual."

                },

                {

                    type:
                        "text",

                    content:
                        "Apenas a forma de representar os valores é alterada, sem modificar a dioptria das lentes."

                }

            ]

        }

    ]

};


/* ==========================================================================
   Registro
========================================================================== */
window.VisiumContent =
    window.VisiumContent || {};

window.VisiumContent.transposicao =
    VISIUM_TRANSPOSICAO_CONTENT;