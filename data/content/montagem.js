/**
 * ==========================================================================
 * Visium
 * Arquivo: montagem.js
 *
 * Conteúdo educacional:
 * Montagens de Multifocais e Bifocais
 * ==========================================================================
 */

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent.montagem = {

    id: "montagem",

    title: "Montagem",

    category: "MONTAGEM",

    description:
        "Estudo das superfícies bifocais e multifocais, surfaçagem, curvatura e lentes bifocais.",

    sections: [

        {
            id: "superficies",

            title: "Superfícies Bifocais e Multifocais",

            content: `
                <h2>Superfícies Bifocais e Multifocais</h2>

                <p>
                    As superfícies bifocais e multifocais fazem parte dos
                    processos relacionados à fabricação e montagem de lentes
                    destinadas a diferentes necessidades de visão.
                </p>

                <p>
                    Neste conteúdo serão apresentados conceitos relacionados
                    à surfaçagem, curvatura e às principais características
                    das lentes bifocais.
                </p>
            `
        },


        {
            id: "surfacagem",

            title: "O que é surfaçagem?",

            content: `
                <h2>O que é surfaçagem?</h2>

                <p>
                    A surfaçagem é o processo utilizado para trabalhar a
                    superfície da lente, permitindo obter as características
                    ópticas necessárias para sua utilização.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/surfacagem.jpeg"
                        alt="Processo de surfaçagem de lentes"
                        loading="lazy"
                    >
                    <figcaption>
                        Processo de surfaçagem.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "como-e-feito",

            title: "Como é feito?",

            content: `
                <h2>Como é feito?</h2>

                <p>
                    O processo de surfaçagem trabalha a superfície da lente
                    de acordo com as características ópticas desejadas.
                </p>
            `
        },


        {
            id: "por-que-surfacar",

            title: "Por que surfaçar?",

            content: `
                <h2>Por que surfaçar?</h2>

                <p>
                    A surfaçagem permite trabalhar a lente para que ela
                    apresente a curvatura e as características necessárias
                    para sua aplicação óptica.
                </p>
            `
        },


        {
            id: "curvatura",

            title: "Curvatura",

            content: `
                <h2>Curvatura</h2>

                <p>
                    A curvatura é um dos elementos relacionados à superfície
                    óptica da lente e ao resultado obtido durante o processo
                    de fabricação.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/lentes.jpeg"
                        alt="Lentes utilizadas no processo óptico"
                        loading="lazy"
                    >
                    <figcaption>
                        Lentes e suas superfícies ópticas.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "lentes-bifocais",

            title: "Lentes Bifocais",

            content: `
                <h2>Lentes Bifocais</h2>

                <p>
                    As lentes bifocais possuem diferentes áreas destinadas
                    à correção visual, permitindo atender diferentes
                    necessidades de visão em uma mesma lente.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/armacao.jpeg"
                        alt="Lente bifocal em armação"
                        loading="lazy"
                    >
                    <figcaption>
                        Lente bifocal aplicada à montagem.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "flat-top",

            title: "Bifocal Flat Top",

            content: `
                <h2>Bifocal Flat Top</h2>

                <p>
                    O bifocal Flat Top é um dos modelos apresentados no
                    material de estudo sobre lentes bifocais.
                </p>
            `
        },


        {
            id: "executive",

            title: "Bifocal Executive",

            content: `
                <h2>Bifocal Executive</h2>

                <p>
                    O bifocal Executive é outro modelo de lente bifocal
                    apresentado no material.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/bifocal-executive.jpeg"
                        alt="Lente bifocal Executive"
                        loading="lazy"
                    >
                    <figcaption>
                        Bifocal Executive.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/bifocal-executive-02.jpeg"
                        alt="Detalhe da lente bifocal Executive"
                        loading="lazy"
                    >
                    <figcaption>
                        Detalhe da lente bifocal Executive.
                    </figcaption>
                </figure>
            `
        }

    ]

};