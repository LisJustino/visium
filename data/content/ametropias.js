/**
 * ==========================================================================
 * Visium
 * Arquivo: ametropias.js
 *
 * Conteúdo educacional:
 * Ametropias
 *
 * Fonte:
 * Ametropias.pdf.pdf
 * ==========================================================================
 */

const ametropiasContent = {

    id: "ametropias",

    category: "Óptica",

    title: "Ametropias",

    description:
        "Estudo dos principais erros refrativos: miopia, hipermetropia, astigmatismo e presbiopia.",

    sections: [

        /* ==================================================================
           1. INTRODUÇÃO
        ================================================================== */

        {
            id: "introducao",

            title: "Introdução",

            content: `
                <h2>Ametropias</h2>

                <p>
                    A ametropia é um defeito refrativo no qual a luz que entra
                    no olho não é focada corretamente na retina.
                </p>

                <p>
                    As principais ametropias são:
                </p>

                <ul>
                    <li><strong>Miopia</strong> — dificuldade para enxergar de longe.</li>
                    <li><strong>Hipermetropia</strong> — dificuldade para enxergar de perto.</li>
                    <li><strong>Astigmatismo</strong> — visão borrada ou distorcida em qualquer distância.</li>
                    <li><strong>Presbiopia</strong> — perda da acomodação visual relacionada à idade.</li>
                </ul>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/ametropias-introducao.jpg"
                        alt="Introdução às ametropias"
                        loading="lazy"
                    >
                    <figcaption>
                        Principais ametropias e seus efeitos na visão.
                    </figcaption>
                </figure>

                <div class="reader-highlight">
                    <p>
                        <strong>Curiosidade:</strong>
                        A miopia tende a continuar evoluindo até a idade adulta.
                        Em algumas pessoas, a estabilização ocorre por volta dos
                        18 anos, mas é comum a miopia continuar aumentando até
                        por volta dos 21 anos.
                    </p>
                </div>
            `
        },


        /* ==================================================================
           2. MIOPIA
        ================================================================== */

        {
            id: "miopia",

            title: "Miopia",

            content: `
                <h2>Miopia</h2>

                <p>
                    A miopia é um erro refrativo mundialmente comum,
                    caracterizado pela dificuldade de enxergar nitidamente
                    objetos distantes, enquanto a visão de perto permanece
                    normal.
                </p>

                <p>
                    O problema ocorre porque o globo ocular é mais longo que o
                    normal ou a córnea é muito curva. Essa anatomia faz com que
                    os raios de luz focalizem a imagem antes da retina, gerando
                    uma visão embaçada de longe e sintomas como dores de cabeça
                    e cansaço visual.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/miopia/miopia-formacao-foco.jpeg"
                        alt="Formação do foco na miopia"
                        loading="lazy"
                    >
                    <figcaption>
                        Formação do foco na miopia.
                    </figcaption>
                </figure>

                <p>
                    A correção é feita com lentes negativas (divergentes), que
                    empurram o foco para a retina.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/miopia/miopia-exemplo.jpeg"
                        alt="Exemplo de miopia"
                        loading="lazy"
                    >
                    <figcaption>
                        Exemplo relacionado à miopia.
                    </figcaption>
                </figure>

                <p>
                    Na escolha dos óculos, graus altos de miopia geram lentes
                    com bordas grossas; por isso, recomenda-se o uso de armações
                    pequenas e de aro fechado para disfarçar a espessura do
                    vidro.
                </p>
            `
        },


        /* ==================================================================
           3. HIPERMETROPIA
        ================================================================== */

        {
            id: "hipermetropia",

            title: "Hipermetropia",

            content: `
                <h2>Hipermetropia</h2>

                <p>
                    A hipermetropia é um erro refrativo caracterizado pela
                    dificuldade de focar objetos próximos, enquanto a visão de
                    longe costuma ser clara, embora possa embaçar em graus
                    mais altos.
                </p>

                <p>
                    O distúrbio ocorre porque o globo ocular é mais curto que o
                    normal ou a córnea é muito plana. Essa anatomia faz com que
                    os raios de luz focalizem a imagem teoricamente atrás da
                    retina, gerando uma visão borrada de perto e sintomas como
                    fadiga ocular, lacrimejamento e dores de cabeça após a
                    leitura.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/hipermetropia/hipermetropia-formacao-foco.jpeg"
                        alt="Formação do foco na hipermetropia"
                        loading="lazy"
                    >
                    <figcaption>
                        Formação do foco na hipermetropia.
                    </figcaption>
                </figure>

                <p>
                    A correção é feita com lentes positivas (convergentes), que
                    adiantam o foco para a retina.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/hipermetropia/hipermetropia-exemplo.jpeg"
                        alt="Exemplo de hipermetropia"
                        loading="lazy"
                    >
                    <figcaption>
                        Exemplo relacionado à hipermetropia.
                    </figcaption>
                </figure>

                <p>
                    Na escolha dos óculos, graus elevados de hipermetropia
                    geram lentes com o centro grosso e bordas finas; por isso,
                    recomenda-se o uso de armações menores e centralizadas para
                    reduzir o peso e o efeito visual de "olhos arregalados".
                </p>
            `
        },


        /* ==================================================================
           4. ASTIGMATISMO
        ================================================================== */

        {
            id: "astigmatismo",

            title: "Astigmatismo",

            content: `
                <h2>Astigmatismo</h2>

                <p>
                    O astigmatismo é um erro refrativo que causa visão borrada
                    e distorcida a qualquer distância, afetando tanto a visão
                    de perto quanto a de longe simultaneamente.
                </p>

                <p>
                    O problema ocorre devido a uma irregularidade na curvatura
                    da córnea ou do cristalino, que apresentam um formato
                    ovalado, similar a uma bola de futebol americano, em vez
                    de esférico.
                </p>

                <p>
                    Essa anatomia irregular faz com que os raios de luz se
                    refratem em direções diferentes, formando múltiplos pontos
                    de foco na retina, o que deforma o contorno dos objetos e
                    causa dores de cabeça e fadiga ocular.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-formacao-foco.jpeg"
                        alt="Formação dos focos no astigmatismo"
                        loading="lazy"
                    >
                    <figcaption>
                        Formação dos focos no astigmatismo.
                    </figcaption>
                </figure>

                <p>
                    A correção é feita com lentes cilíndricas, que possuem
                    espessuras variadas em eixos específicos para compensar a
                    deformação da córnea.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-exemplo-geral.jpeg"
                        alt="Exemplo geral de astigmatismo"
                        loading="lazy"
                    >
                    <figcaption>
                        Exemplo geral de astigmatismo.
                    </figcaption>
                </figure>

                <p>
                    Na escolha dos óculos, graus altos de astigmatismo exigem
                    armações mais rígidas, como as de aro fechado em acetato,
                    que mantêm a lente perfeitamente imóvel e evitam distorções
                    visuais provocadas pelo giro da lente.
                </p>
            `
        },


        /* ==================================================================
           5. TIPOS DE ASTIGMATISMO
        ================================================================== */

        {
            id: "tipos-astigmatismo",

            title: "Tipos de astigmatismo",

            content: `
                <h2>Tipos de astigmatismo</h2>

                <p>
                    O astigmatismo tem tipos diferentes porque a irregularidade
                    do olho pode acontecer de maneiras diferentes, tanto no
                    formato quanto na localização do problema.
                </p>

                <p>
                    Imagine a córnea como uma bola perfeitamente redonda.
                    Num olho sem astigmatismo, ela tem curvatura uniforme.
                </p>

                <p>
                    No astigmatismo, ela fica mais parecida com uma bola de
                    rugby: mais curva em uma direção do que em outra.
                    Isso cria focos diferentes da luz dentro do olho, causando
                    visão distorcida.
                </p>

                <h3>Onde está a irregularidade</h3>

                <ul>
                    <li><strong>Córnea</strong> — astigmatismo corneano.</li>
                    <li><strong>Cristalino</strong> — astigmatismo lenticular.</li>
                </ul>

                <h3>Formato da curvatura</h3>

                <ul>
                    <li><strong>Regular</strong> — mais organizado, fácil de corrigir.</li>
                    <li><strong>Irregular</strong> — formato desigual, mais difícil de corrigir.</li>
                </ul>

                <h3>Como a luz foca</h3>

                <ul>
                    <li>Junto com miopia.</li>
                    <li>Junto com hipermetropia.</li>
                    <li>Mistura dos dois.</li>
                </ul>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-tipo-01.png"
                        alt="Tipos de astigmatismo"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação dos tipos de astigmatismo.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-tipo-02.png"
                        alt="Classificação do astigmatismo"
                        loading="lazy"
                    >
                    <figcaption>
                        Classificação do astigmatismo.
                    </figcaption>
                </figure>

                <div class="reader-highlight">
                    <p>
                        Essas diferenças são importantes porque mudam os
                        sintomas, o grau de dificuldade visual, o tipo de lente
                        indicada, a possibilidade de cirurgia e a forma de
                        correção.
                    </p>
                </div>
            `
        },


        /* ==================================================================
           6. ASTIGMATISMO MIOPICO
        ================================================================== */

        {
            id: "astigmatismo-miopico",

            title: "Astigmatismo miópico",

            content: `
                <h2>Astigmatismo miópico</h2>

                <p>
                    O astigmatismo miópico simples ocorre quando um foco está
                    na retina e outro antes dela.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-exemplo-01.jpeg"
                        alt="Astigmatismo miópico simples"
                        loading="lazy"
                    >
                    <figcaption>
                        Astigmatismo miópico simples.
                    </figcaption>
                </figure>

                <p>
                    O astigmatismo miópico composto acontece quando os dois
                    focos estão antes da retina, tratando-se de uma miopia
                    combinada com astigmatismo.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-exemplo-02.jpeg"
                        alt="Astigmatismo miópico composto"
                        loading="lazy"
                    >
                    <figcaption>
                        Astigmatismo miópico composto.
                    </figcaption>
                </figure>

                <h3>Exemplos</h3>

                <ul>
                    <li>DE 0,00 DC -2,25 Eixo 90°.</li>
                    <li>DE -1,50 DC -2,00 Eixo 110°.</li>
                </ul>
            `
        },


        /* ==================================================================
           7. ASTIGMATISMO HIPERMETROPICO E MISTO
        ================================================================== */

        {
            id: "astigmatismo-hipermetropico-misto",

            title: "Astigmatismo hipermetrópico e misto",

            content: `
                <h2>Astigmatismo hipermetrópico e misto</h2>

                <h3>Hipermetrópico simples</h3>

                <p>
                    O astigmatismo hipermetrópico simples ocorre quando um dos
                    focos está na retina e outro depois dela.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/astigmatismo/astigmatismo-exemplo-03.jpeg"
                        alt="Astigmatismo hipermetrópico simples"
                        loading="lazy"
                    >
                    <figcaption>
                        Astigmatismo hipermetrópico simples.
                    </figcaption>
                </figure>

                <h3>Hipermetrópico composto</h3>

                <p>
                    O astigmatismo hipermetrópico composto ocorre quando os dois
                    focos ficam depois da retina.
                </p>

                <h3>Misto</h3>

                <p>
                    O astigmatismo misto ocorre quando um foco se encontra
                    depois da retina e o outro antes.
                </p>
            `
        },


        /* ==================================================================
           8. PRESBIOPIA
        ================================================================== */

        {
            id: "presbiopia",

            title: "Presbiopia",

            content: `
                <h2>Presbiopia</h2>

                <p>
                    A presbiopia, popularmente conhecida como "vista cansada",
                    é o envelhecimento natural dos olhos que dificulta o foco
                    de objetos e textos próximos, surgindo universalmente a
                    partir dos 40 anos.
                </p>

                <p>
                    O problema ocorre devido à perda progressiva da elasticidade
                    da lente interna do olho, o cristalino, associada ao
                    enfraquecimento dos músculos ciliares.
                </p>

                <p>
                    Essa anatomia reduz a capacidade de acomodação visual,
                    impedindo o olho de mudar de foco rapidamente e forçando a
                    pessoa a afastar os braços, como para ler o celular, para
                    conseguir enxergar.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/presbiopia/presbiopia-formacao-foco.jpeg"
                        alt="Formação do foco na presbiopia"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da formação do foco na presbiopia.
                    </figcaption>
                </figure>

                <p>
                    A correção é feita com lentes positivas (convergentes) em
                    óculos de leitura simples, bifocais ou multifocais.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/ametropias/presbiopia/presbiopia-exemplo.jpeg"
                        alt="Exemplo de presbiopia"
                        loading="lazy"
                    >
                    <figcaption>
                        Exemplo relacionado à presbiopia.
                    </figcaption>
                </figure>

                <p>
                    Na escolha da armação, o uso de lentes multifocais exige
                    modelos com altura vertical maior, acima de 30 mm,
                    garantindo espaço suficiente para acomodar os três campos
                    de visão: perto, intermediário e longe.
                </p>
            `
        }

    ]
};


/* ==========================================================================
   Exportação
========================================================================== */

/* ==========================================================================
   Exportação
========================================================================== */

if (typeof window !== "undefined") {

    window.VisiumContent =
        window.VisiumContent || {};

    window.VisiumContent.ametropias =
        ametropiasContent;

}