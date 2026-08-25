/**
 * Visium
 * Arquivo: data/content/catalog.js
 *
 * Fonte única de metadados e ordem dos conteúdos disponíveis.
 */

"use strict";

window.VISIUM_CONTENT_ORDER = [
    "interpretacao-de-receita",
    "transposicao",
    "dp-dnp",
    "acuidade-visual",
    "lentes-contato",
    "surfacagem-multifocal-bifocal",
    "montagem",
    "armacoes",
    "patologias",
    "ametropias",
    "anatomia"
];

window.VISIUM_CONTENTS = [
    {
        id: "interpretacao-de-receita",
        title: "Interpretação de Receita",
        description: "Interpretação de uma receita oftálmica.",
        url: "/pages/app/reader/reader.html?content=interpretacao-de-receita"
    },
    {
        id: "transposicao",
        title: "Transposição",
        description: "Conceitos e prática de transposição de receitas.",
        url: "/pages/app/reader/reader.html?content=transposicao"
    },
    {
        id: "dp-dnp",
        title: "O que é DP, DNP e Altura",
        description: "Medidas importantes para a montagem óptica.",
        url: "/pages/app/reader/reader.html?content=dp-dnp"
    },
    {
        id: "acuidade-visual",
        title: "Acuidade Visual",
        description: "Avaliação da acuidade visual e principais tipos de optotipos.",
        url: "/pages/app/reader/reader.html?content=acuidade-visual"
    },
    {
        id: "lentes-contato",
        title: "Lentes de Contato",
        description: "Adaptação, cuidados e uso de lentes de contato.",
        url: "/pages/app/reader/reader.html?content=lentes-contato"
    },
    {
        id: "surfacagem-multifocal-bifocal",
        title: "Surfaçagem de Multifocal e Bifocal",
        description: "Conceitos de surfaçagem e lentes multifocais e bifocais.",
        url: "/pages/app/reader/reader.html?content=surfacagem-multifocal-bifocal"
    },
    {
        id: "montagem",
        title: "Montagem",
        description: "Conceitos fundamentais da montagem de óculos.",
        url: "/pages/app/reader/reader.html?content=montagem"
    },
    {
        id: "armacoes",
        title: "Armações",
        description: "Tipos, materiais, partes e medidas de armações.",
        url: "/pages/app/reader/reader.html?content=armacoes"
    },
    {
        id: "patologias",
        title: "Patologias",
        description: "Alterações relacionadas à saúde ocular.",
        url: "/pages/app/reader/reader.html?content=patologias"
    },
    {
        id: "ametropias",
        title: "Ametropias",
        description: "Miopia, hipermetropia, astigmatismo e presbiopia.",
        url: "/pages/app/reader/reader.html?content=ametropias"
    },
    {
        id: "anatomia",
        title: "Anatomia",
        description: "Estruturas do olho e suas funções.",
        url: "/pages/app/reader/reader.html?content=anatomia"
    }
];