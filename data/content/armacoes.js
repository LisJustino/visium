/**
 * ==========================================================================
 * Visium
 * Arquivo: armacoes.js
 *
 * Conteúdo educacional:
 * Armações
 *
 * Fonte:
 * ARMAÇÕES.docx
 * ==========================================================================
 */

const armacoesContent = {

    id: "armacoes",

    category: "Armações",

    title: "Armações",

    description:
        "Estudo dos principais tipos, materiais, partes, medidas e critérios de indicação de armações de óculos.",

    sections: [

        {
            id: "introducao",

            title: "O que é uma armação?",

            content: `
                <h2>O que é uma armação de óculos?</h2>

                <p>
                    A armação é a estrutura que sustenta as lentes corretivas
                    ou solares. Ela deve unir estética, conforto, resistência
                    e boa adaptação ao rosto.
                </p>

                <p>
                    A escolha adequada depende de fatores técnicos e estéticos.
                </p>

                <ul>
                    <li>Formato do rosto.</li>
                    <li>Grau das lentes.</li>
                    <li>Peso da lente.</li>
                    <li>Uso diário ou ocasional.</li>
                    <li>Estilo do cliente.</li>
                </ul>
            `
        },


        {
            id: "tipos",

            title: "Tipos de armações",

            content: `
                <h2>Tipos de armações</h2>

                <h3>Aro fechado (Full Rim)</h3>

                <p>
                    No modelo de aro fechado, a lente fica totalmente envolvida
                    pela armação. É uma opção resistente, tradicional e muito
                    usada no dia a dia.
                </p>

                <h4>Indicações</h4>

                <ul>
                    <li>Graus altos.</li>
                    <li>Crianças.</li>
                    <li>Uso diário.</li>
                    <li>Lentes mais espessas.</li>
                </ul>

                <p>
                    Materiais comuns: acetato, metal e TR90.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/aro-fechado.png"
                        alt="Armação de óculos com aro fechado"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação com aro fechado.
                    </figcaption>
                </figure>

                <h3>Meio aro (Nylon / Half Rim)</h3>

                <p>
                    No modelo de meio aro, a parte superior possui armação e a
                    parte inferior da lente é presa por um fio de nylon.
                </p>

                <h4>Indicações</h4>

                <ul>
                    <li>Pessoas que querem um modelo mais leve.</li>
                    <li>Visual discreto.</li>
                    <li>Lentes com boa resistência, como policarbonato.</li>
                </ul>

                <p>
                    Materiais comuns: metal, nylon e titânio.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/meio-aro-01.png"
                        alt="Armação de óculos meio aro"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação meio aro.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/meio-aro-02.png"
                        alt="Detalhe de modelo meio aro"
                        loading="lazy"
                    >
                    <figcaption>
                        Detalhe de modelo com fio de nylon.
                    </figcaption>
                </figure>

                <h3>Sem aro (3 peças / parafusada)</h3>

                <p>
                    A armação sem aro não possui estrutura ao redor da lente. A
                    lente é presa diretamente nas hastes e na ponte.
                </p>

                <h4>Indicações</h4>

                <ul>
                    <li>Visual sofisticado.</li>
                    <li>Pessoas que gostam de armação quase invisível.</li>
                </ul>

                <div class="reader-highlight">
                    <p>
                        Evite modelos sem aro para lentes muito pesadas ou graus
                        muito altos.
                    </p>
                </div>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/sem-aro.png"
                        alt="Armação de óculos sem aro"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação sem aro.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "materiais",

            title: "Materiais",

            content: `
                <h2>Materiais das armações</h2>

                <h3>Acetato</h3>

                <p>
                    O acetato é um material nobre, mais grosso e resistente, com
                    muitas opções de cores e estampas.
                </p>

                <h4>Vantagens</h4>

                <ul>
                    <li>Confortável.</li>
                    <li>Durável.</li>
                    <li>Visual moderno.</li>
                </ul>

                <p>
                    É indicado para modelos grandes e para pessoas que gostam
                    de uma armação com mais destaque.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/acetato.png"
                        alt="Armação de acetato"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação em acetato.
                    </figcaption>
                </figure>

                <h3>Metal</h3>

                <p>
                    As armações de metal costumam ser finas e leves, com visual
                    mais clássico e discreto.
                </p>

                <p>
                    Materiais comuns: monel, aço inox e alumínio.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/metal-01.png"
                        alt="Armação metálica discreta"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação metálica.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/metal-02.png"
                        alt="Modelo de armação de metal"
                        loading="lazy"
                    >
                    <figcaption>
                        Modelo de metal com visual clássico.
                    </figcaption>
                </figure>

                <h3>Titânio</h3>

                <p>
                    O titânio é considerado um material premium, muito leve e de
                    alta resistência.
                </p>

                <p>
                    É indicado para pessoas sensíveis ao peso da armação e para
                    uso prolongado.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/titanio-01.png"
                        alt="Armação de titânio"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação em titânio.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/titanio-02.png"
                        alt="Detalhe de armação de titânio"
                        loading="lazy"
                    >
                    <figcaption>
                        Detalhe de modelo em titânio.
                    </figcaption>
                </figure>

                <h3>TR90</h3>

                <p>
                    O TR90 é um material flexível, leve e resistente a impactos.
                </p>

                <p>
                    É indicado para crianças, esportistas e pessoas que precisam
                    de mais conforto.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/tr90.png"
                        alt="Armação em TR90"
                        loading="lazy"
                    >
                    <figcaption>
                        Armação em TR90.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "estrutura",

            title: "Estrutura da armação",

            content: `
                <h2>Estrutura da armação</h2>

                <ol>
                    <li><strong>Aro:</strong> parte que segura a lente.</li>
                    <li><strong>Ponte:</strong> parte que fica apoiada no nariz e une os dois aros.</li>
                    <li><strong>Plaquetas:</strong> apoios de silicone ou plástico no nariz.</li>
                    <li><strong>Hastes:</strong> laterais que passam pelas orelhas.</li>
                    <li><strong>Charneira ou dobradiça:</strong> une a haste ao frontal.</li>
                    <li><strong>Terminal:</strong> parte final da haste que apoia atrás da orelha.</li>
                    <li><strong>Parafusos:</strong> fixam componentes da armação.</li>
                </ol>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/armacoes/estrutura-armacao.png"
                        alt="Partes principais de uma armação de óculos"
                        loading="lazy"
                    >
                    <figcaption>
                        Principais partes da armação.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "medidas",

            title: "Medidas da armação",

            content: `
                <h2>Medidas da armação</h2>

                <p>
                    As medidas da armação normalmente aparecem na haste. Um
                    exemplo comum é:
                </p>

                <div class="reader-highlight">
                    <p>
                        <strong>52 □ 18 - 140</strong>
                    </p>
                </div>

                <ul>
                    <li><strong>52 mm:</strong> calibre da lente, ou seja, a largura horizontal da lente.</li>
                    <li><strong>18 mm:</strong> ponte, ou seja, a distância entre as lentes.</li>
                    <li><strong>140 mm:</strong> comprimento da haste, ou seja, o tamanho da lateral.</li>
                </ul>
            `
        },


        {
            id: "indicacao",

            title: "Indicação pelo grau",

            content: `
                <h2>Indicação de armação pelo grau</h2>

                <h3>Miopia alta</h3>

                <p>
                    Prefira aro fechado. Lentes menores ajudam a reduzir a
                    percepção de espessura.
                </p>

                <h3>Hipermetropia</h3>

                <p>
                    Pode usar vários modelos, respeitando conforto, medidas e
                    adaptação ao rosto.
                </p>

                <h3>Astigmatismo</h3>

                <p>
                    Prefira armações firmes para manter o eixo correto.
                </p>

                <h3>Progressivas</h3>

                <p>
                    Evite armações muito pequenas. Uma altura de lente maior
                    favorece a adaptação.
                </p>

                <div class="reader-highlight">
                    <p>
                        A armação deve ficar confortável no nariz, não apertar
                        as têmporas, posicionar bem a pupila na lente, respeitar
                        o rosto do cliente e unir estética com necessidade
                        visual.
                    </p>
                </div>
            `
        }

    ]

};


/* ==========================================================================
   Exportação
========================================================================== */

if (typeof window !== "undefined") {

    window.VisiumContent =
        window.VisiumContent || {};

    window.VisiumContent.armacoes =
        armacoesContent;

}
