/**
 * ==========================================================================
 * Visium
 * Arquivo: lendo-uma-receita.js
 *
 * Conteúdo educacional:
 * Lendo uma receita
 *
 * Fonte:
 * LENDO UMA RECEITA.docx
 *
 * Observação:
 * Conteúdo estruturado a partir do material-fonte.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Conteúdo
========================================================================== */

const VISIUM_LENDO_UMA_RECEITA_CONTENT = {

    id:
        "lendo-uma-receita",

    category:
        "RECEITAS",

    title:
        "Interpretação de Receita",

    description:
        "Aprenda a interpretar os principais campos, sinais e abreviações presentes em uma receita oftálmica.",

    source:
        "LENDO UMA RECEITA.docx",

    sections: [

        /* ==================================================================
           Introdução
        ================================================================== */

        {

            id:
                "introducao",

            title:
                "Lendo uma receita",

            order:
                1,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "As receitas oftalmológicas fazem parte da rotina de diversos profissionais da área da saúde visual e exigem atenção na hora da leitura e da interpretação. Neste módulo, você conhecerá os principais elementos que compõem uma prescrição, aprenderá como realizar a transposição de receitas e compreenderá o significado das abreviações e siglas mais utilizadas."

                },

                {

                    type:
                        "text",

                    content:
                        "Ao longo do conteúdo, serão apresentados exemplos e explicações que facilitarão a interpretação correta das informações, proporcionando mais segurança na análise das prescrições."

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/lendo-uma-receita/receita-modelo.jpeg",

                    alt:
                        "Modelo de receita oftálmica"

                },

                {

                    type:
                        "list",

                    title:
                        "Uma receita oftálmica pode apresentar os campos:",

                    items: [

                        "Esférico.",

                        "Cilíndrico.",

                        "Eixo.",

                        "Adição.",

                        "Observações."

                    ]

                },

                {

                    type:
                        "text",

                    content:
                        "As medidas são expressas em dioptrias e, na maioria dos casos, variam em intervalos de 0,25 dioptria."

                }

            ]

        },


        /* ==================================================================
           Esférico
        ================================================================== */

        {

            id:
                "esferico",

            title:
                "Esférico",

            order:
                2,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "O campo Esférico (ESF) indica o grau da lente utilizado para corrigir miopia ou hipermetropia. Esse valor é sempre acompanhado por um sinal que identifica o tipo de correção necessária."

                },

                {

                    type:
                        "list",

                    title:
                        "O sinal apresentado no campo Esférico indica:",

                    items: [

                        "Sinal negativo (-): utilizado para corrigir a miopia.",

                        "Sinal positivo (+): utilizado para corrigir a hipermetropia."

                    ]

                },

                {

                    type:
                        "text",

                    content:
                        "O valor informado representa a potência da lente necessária para proporcionar uma visão mais nítida, conforme a necessidade visual de cada paciente."

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/lendo-uma-receita/receita-esferico.jpeg",

                    alt:
                        "Exemplo de receita com grau esférico"

                },

                {

                    type:
                        "text",

                    content:
                        "O sinal apresentado no campo Esférico (ESF) da receita oftálmica indica o tipo de correção visual prescrita."

                },

                {

                    type:
                        "text",

                    content:
                        "Na miopia, quando o valor é precedido pelo sinal negativo (-), a prescrição corresponde à correção da miopia. Pessoas com essa condição apresentam dificuldade para enxergar objetos distantes com nitidez."

                },

                {

                    type:
                        "text",

                    content:
                        "Na hipermetropia, quando o valor é precedido pelo sinal positivo (+), a prescrição refere-se à correção da hipermetropia. Nesse caso, a dificuldade costuma estar relacionada à visão de perto, podendo variar conforme o grau e a idade do paciente."

                },

                {

                    type:
                        "highlight",

                    title:
                        "Atenção",

                    content:
                        "Cada olho é avaliado de forma independente. Por esse motivo, uma mesma receita pode apresentar miopia em um olho e hipermetropia no outro. Essa condição é denominada anisometropia, caracterizada pela diferença de grau ou de erro refrativo entre os dois olhos."

                }

            ]

        },


        /* ==================================================================
           Cilíndrico
        ================================================================== */

        {

            id:
                "cilindrico",

            title:
                "Cilíndrico",

            order:
                3,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "O campo Cilíndrico (CIL) da receita oftálmica informa o grau utilizado para a correção do astigmatismo, erro refrativo causado por uma curvatura irregular da córnea ou do cristalino."

                },

                {

                    type:
                        "text",

                    content:
                        "O valor pode ser apresentado com sinal negativo (-) ou positivo (+), dependendo do padrão de prescrição adotado pelo profissional ou pelo equipamento utilizado durante o exame."

                },

                {

                    type:
                        "text",

                    content:
                        "No Brasil, é mais comum que o grau cilíndrico seja registrado em cilindro negativo."

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/lendo-uma-receita/receita-cilindrico-eixo.jpeg",

                    alt:
                        "Exemplo de receita com grau cilíndrico e eixo"

                },

                {

                    type:
                        "highlight",

                    title:
                        "Transposição",

                    content:
                        "Quando a prescrição é emitida em cilindro positivo, pode ser necessária a realização da transposição da receita. Esse procedimento converte a prescrição para o formato equivalente em cilindro negativo, preservando exatamente a mesma correção óptica e garantindo compatibilidade com o padrão utilizado por grande parte dos laboratórios e fabricantes de lentes."

                }

            ]

        },


        /* ==================================================================
           Eixo
        ================================================================== */

        {

            id:
                "eixo",

            title:
                "Eixo",

            order:
                4,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "Sempre que houver um valor no campo Cilíndrico, a receita também apresentará um Eixo (°)."

                },

                {

                    type:
                        "text",

                    content:
                        "O eixo determina a orientação do astigmatismo e indica o posicionamento exato em que a lente cilíndrica deverá ser confeccionada para proporcionar a correção adequada da visão."

                },

                {

                    type:
                        "text",

                    content:
                        "Esse valor é expresso em graus, variando de 0° a 180°, e é indispensável para a fabricação correta das lentes. Sem a indicação do eixo, o grau cilíndrico não pode ser interpretado nem confeccionado de forma precisa."

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/lendo-uma-receita/direcao-eixo.jpeg",

                    alt:
                        "Diagrama da direção do eixo"

                },

                {

                    type:
                        "text",

                    content:
                        "Em casos de astigmatismo, a receita médica ou optométrica indicará não apenas o grau cilíndrico, mas também o eixo correspondente. Esse dado especifica a angulação exata para o posicionamento das lentes durante a fabricação, assegurando a correção eficaz da ametropia."

                }

            ]

        },


        /* ==================================================================
           Adição
        ================================================================== */

        {

            id:
                "adicao",

            title:
                "Adição (ADD)",

            order:
                5,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "Na prescrição óptica, o campo de adição refere-se ao poder dióptrico adicional destinado à correção da presbiopia, disfunção visual acomodativa comum após os 40 anos."

                },

                {

                    type:
                        "text",

                    content:
                        "Algumas receitas apresentam o valor final para visão de perto já calculado. Outras informam apenas o valor de adição, que deverá ser acrescido à dioptria de longe."

                },

                {

                    type:
                        "text",

                    content:
                        "Os valores de adição são estabelecidos, em geral, entre +0,75 D e +4,00 D, com progressão em passos de 0,25 D, respeitando-se as particularidades de cada caso clínico."

                },

                {

                    type:
                        "text",

                    content:
                        "Quando a prescrição apresenta apenas os valores de grau esférico para longe e o campo de adição preenchido, o grau para visão de perto é obtido somando-se o valor esférico de longe ao valor da adição."

                },

                {

                    type:
                        "highlight",

                    title:
                        "Importante",

                    content:
                        "Esse cálculo se aplica exclusivamente ao componente esférico da receita. Os valores de dioptria cilíndrica e eixo, quando existentes, permanecem inalterados."

                },

                {

                    type:
                        "examples",

                    title:
                        "Como calcular o grau para perto",

                    items: [

                        "-2,00 + 2,50 = +0,50. Esse será o grau para perto.",

                        "+1,00 + 2,50 = +3,50. É sempre uma soma; o sinal negativo já faz o ajuste na conta."

                    ]

                },

                {

                    type:
                        "image",

                    src:
                        "/assets/img/lendo-uma-receita/resumo-prescricao.jpeg",

                    alt:
                        "Resumo de uma prescrição oftálmica"

                }

            ]

        },


        /* ==================================================================
           Abreviações
        ================================================================== */

        {

            id:
                "abreviacoes",

            title:
                "Abreviações nas receitas",

            order:
                6,

            blocks: [

                {

                    type:
                        "text",

                    content:
                        "Ao analisar uma receita oftálmica, é comum encontrar diversas abreviações. Elas são utilizadas para tornar o preenchimento da prescrição mais prático e objetivo, mas podem gerar dúvidas para quem não está familiarizado com esses termos."

                },

                {

                    type:
                        "text",

                    content:
                        "Pensando nisso, reunimos as principais siglas encontradas nas receitas, acompanhadas de seus respectivos significados. Com esse guia, a leitura da prescrição se torna mais simples, facilitando a compreensão de cada informação e reduzindo a chance de interpretações erradas."

                },

                {

                    type:
                        "list",

                    title:
                        "Principais abreviações",

                    items: [

                        "AD = Adição",

                        "DIP = Distância interpupilar",

                        "AO = Ambos os olhos",

                        "DP = Distância pupilar",

                        "AM = A medir",

                        "DNP = Distância naso-pupilar",

                        "ASF = Asférico",

                        "DV = Distância do vértice",

                        "ALT = Altura",

                        "ESF = Esférico",

                        "AR = Antirreflexo",

                        "H.L. = High Lite",

                        "B = Base",

                        "INF = Inferior",

                        "BPC = Base prismática central",

                        "I = Intermediária",

                        "BPI = Base prismática inferior",

                        "L = Longe",

                        "BPS = Base prismática superior",

                        "MM = Milímetro",

                        "BIF = Bifocal",

                        "N = Nasal",

                        "CIL = Cilíndrico",

                        "OD = Olho direito",

                        "COR = Tonalidade (tons)",

                        "OE = Olho esquerdo",

                        "CO = Centro óptico",

                        "° = Grau",

                        "CR39 = Resina orgânica",

                        "P = Perto",

                        "CC = Côncavo (a)",

                        "PL = Plano",

                        "CV = Convexo (a)",

                        "RX = Receita",

                        "D ou DIOP = Dioptria",

                        "SUP = Superior",

                        "DE = Dioptria esférica",

                        "T = Temporal",

                        "DC = Dioptria cilíndrica",

                        "TABO = Diagrama TABO",

                        "DCL = Distância córnea-lente"

                    ]

                }

            ]

        }

    ]

};


/* ==========================================================================
   Exportação
========================================================================== */

if (
    typeof window !== "undefined"
) {

    window.VisiumContent =
        window.VisiumContent || {};

    window.VisiumContent["lendo-uma-receita"] =
        VISIUM_LENDO_UMA_RECEITA_CONTENT;

}
