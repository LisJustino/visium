/**
 * ==========================================================================
 * Visium
 * Arquivo: anatomia.js
 *
 * Conteúdo educacional:
 * Anatomia
 *
 * Fonte:
 * ANATOMIA .pdf
 * ==========================================================================
 */

const anatomiaContent = {

    id: "anatomia",

    category: "Anatomia",

    title: "Anatomia",

    description:
        "Estudo das principais estruturas do olho humano e suas funções no processo visual.",

    sections: [

        /* ==================================================================
           1. INTRODUÇÃO
        ================================================================== */

        {
            id: "introducao",

            title: "Introdução",

            content: `
                <h2>Anatomia</h2>

                <p>
                    Entender a estrutura dos olhos, incluindo a córnea, a
                    retina, o cristalino e a íris, é essencial para compreender
                    como ocorre a visão e para a formação na área óptica.
                </p>

                <p>
                    Neste capítulo, serão apresentadas as principais partes do
                    olho humano, explicando suas características e a função de
                    cada uma no processo visual.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/anatomia-introducao-01.jpeg"
                        alt="Representação anatômica do olho humano"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da estrutura do olho humano.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/anatomia-introducao-02.jpeg"
                        alt="Diagrama da estrutura interna do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Estruturas internas relacionadas ao processo visual.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           2. PÁLPEBRAS
        ================================================================== */

        {
            id: "palpebras",

            title: "Pálpebras",

            content: `
                <h2>Pálpebras</h2>

                <p>
                    As pálpebras são estruturas móveis responsáveis pela
                    proteção e conservação da saúde ocular. Elas cobrem os
                    olhos durante o ato de piscar, ajudando a manter a
                    superfície ocular sempre protegida e hidratada.
                </p>

                <p>
                    Sua principal função é distribuir a lágrima sobre os olhos,
                    evitando o ressecamento, removendo pequenas partículas e
                    auxiliando na limpeza da superfície ocular.
                </p>

                <p>
                    As pálpebras são formadas por pele, músculos, glândulas e
                    pela conjuntiva, uma fina membrana localizada em sua parte
                    interna. As glândulas presentes nessa região produzem
                    secreções importantes para a lubrificação dos olhos e para
                    a prevenção de infecções.
                </p>

                <p>
                    Podemos comparar as pálpebras a um limpador de para-brisa,
                    pois realizam movimentos constantes que ajudam a manter os
                    olhos limpos, úmidos e protegidos contra poeira e outros
                    agentes externos.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/palpebras-01.jpeg"
                        alt="Estrutura das pálpebras"
                        loading="lazy"
                    >
                    <figcaption>
                        Estruturas relacionadas às pálpebras.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/palpebras-02.jpeg"
                        alt="Anatomia das pálpebras"
                        loading="lazy"
                    >
                    <figcaption>
                        Anatomia das pálpebras.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/palpebras-03.png"
                        alt="Representação das pálpebras"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da região palpebral.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           3. CÍLIOS
        ================================================================== */

        {
            id: "cilios",

            title: "Cílios",

            content: `
                <h2>Cílios</h2>

                <p>
                    Os cílios são pequenos pelos localizados na borda das
                    pálpebras, responsáveis por proteger os olhos contra
                    poeira, sujeira e outros agentes externos que possam causar
                    irritações ou lesões.
                </p>

                <p>
                    Eles são formados por queratina, a mesma proteína presente
                    nos cabelos e nas unhas. Os cílios possuem um ciclo natural
                    de crescimento, renovando-se constantemente com a queda e o
                    nascimento de novos fios.
                </p>

                <p>
                    Além da função de proteção, os cílios também possuem grande
                    sensibilidade ao toque. Quando algo se aproxima dos olhos,
                    eles estimulam o fechamento rápido das pálpebras como forma
                    de defesa.
                </p>

                <p>
                    Os cílios podem ser comparados a uma barreira protetora, que
                    impede a entrada de partículas indesejadas nos olhos,
                    ajudando a manter a superfície ocular mais segura e limpa.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cilios-01.jpeg"
                        alt="Cílios na borda das pálpebras"
                        loading="lazy"
                    >
                    <figcaption>
                        Cílios e sua localização nas pálpebras.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cilios-02.jpeg"
                        alt="Representação dos cílios"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação dos cílios.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           4. GLÂNDULAS LACRIMAIS
        ================================================================== */

        {
            id: "glandulas-lacrimais",

            title: "Glândulas lacrimais",

            content: `
                <h2>Glândulas lacrimais</h2>

                <p>
                    As glândulas lacrimais são estruturas responsáveis pela
                    produção das lágrimas, fundamentais para a proteção,
                    hidratação e lubrificação dos olhos. Elas estão localizadas
                    na região superior externa de cada olho, abaixo das
                    sobrancelhas.
                </p>

                <p>
                    As lágrimas produzidas por essas glândulas mantêm a
                    superfície ocular úmida, evitando o ressecamento e
                    proporcionando maior conforto aos olhos. Além disso,
                    ajudam na remoção de poeira, impurezas e microrganismos,
                    contribuindo para a prevenção de infecções.
                </p>

                <p>
                    As glândulas lacrimais também auxiliam na nutrição da
                    córnea e na manutenção da qualidade da visão, formando uma
                    película protetora sobre os olhos.
                </p>

                <p>
                    Podemos compará-las a um sistema de irrigação, que distribui
                    constantemente a quantidade necessária de umidade para
                    manter os olhos protegidos, limpos e funcionando
                    corretamente.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/glandulas-lacrimais-01.jpeg"
                        alt="Localização das glândulas lacrimais"
                        loading="lazy"
                    >
                    <figcaption>
                        Localização das glândulas lacrimais.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/glandulas-lacrimais-02.jpeg"
                        alt="Sistema lacrimal do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação do sistema lacrimal.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           5. CONJUNTIVA
        ================================================================== */

        {
            id: "conjuntiva",

            title: "Conjuntiva",

            content: `
                <h2>Conjuntiva</h2>

                <p>
                    A conjuntiva é uma membrana fina, transparente e delicada
                    que recobre a parte branca dos olhos, chamada esclera, além
                    da região interna das pálpebras. Sua principal função é
                    proteger e manter a lubrificação da superfície ocular.
                </p>

                <p>
                    Ela é formada por células epiteliais e pequenas glândulas
                    responsáveis pela produção de muco e parte da lágrima,
                    ajudando a manter os olhos úmidos e reduzindo o atrito
                    durante o ato de piscar.
                </p>

                <p>
                    A conjuntiva também atua como uma barreira de proteção
                    contra poeira, bactérias e outros microrganismos que possam
                    causar irritações ou infecções oculares.
                </p>

                <p>
                    Podemos compará-la a um "escudo protetor invisível", que
                    ajuda a preservar a saúde dos olhos, mantendo a superfície
                    ocular limpa, hidratada e protegida contra agentes
                    externos.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/conjuntiva-01.jpeg"
                        alt="Conjuntiva do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da conjuntiva ocular.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           6. ESCLERA
        ================================================================== */

        {
            id: "esclera",

            title: "Esclera",

            content: `
                <h2>Esclera</h2>

                <p>
                    A esclera é a parte branca e resistente do olho,
                    responsável por proteger e dar sustentação ao globo ocular.
                    Ela é formada por um tecido fibroso bastante forte, que
                    ajuda a manter o formato do olho e protege suas estruturas
                    internas contra impactos e agentes externos.
                </p>

                <p>
                    Além da função protetora, a esclera também serve como ponto
                    de fixação para os músculos oculares, permitindo os
                    movimentos dos olhos em diferentes direções.
                </p>

                <p>
                    Sua estrutura resistente contribui para a estabilidade e o
                    bom funcionamento do sistema visual, garantindo maior
                    segurança às partes internas do olho.
                </p>

                <p>
                    A esclera pode ser comparada à estrutura externa de um
                    capacete, que protege o interior contra choques e ajuda a
                    manter tudo firme e protegido.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/esclera-01.jpeg"
                        alt="Esclera do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da esclera.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/esclera-02.png"
                        alt="Localização da esclera no olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Localização da esclera no globo ocular.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           7. CÓRNEA
        ================================================================== */

        {
            id: "cornea",

            title: "Córnea",

            content: `
                <h2>Córnea</h2>

                <p>
                    A córnea é a estrutura transparente localizada na parte
                    frontal do olho. Sua principal função é permitir a entrada
                    e a refração da luz, ajudando a direcioná-la corretamente
                    para a retina, onde as imagens serão formadas de maneira
                    nítida.
                </p>

                <p>
                    Ela é responsável por grande parte do poder de focalização
                    do olho, auxiliando o cristalino no processo de formação da
                    visão.
                </p>

                <p>
                    A córnea é formada por várias camadas de células e possui
                    grande sensibilidade devido à elevada quantidade de
                    terminações nervosas presentes em sua estrutura. Além de
                    sua função óptica, também atua como uma barreira protetora
                    contra poeira, microrganismos e outros agentes externos.
                </p>

                <p>
                    Podemos comparar a córnea a uma lente de precisão, que
                    organiza e direciona a luz para o local correto, garantindo
                    uma visão mais clara e definida.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cornea-01.jpeg"
                        alt="Córnea do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da córnea.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cornea-02.png"
                        alt="Estrutura da córnea"
                        loading="lazy"
                    >
                    <figcaption>
                        Estrutura e localização da córnea.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           8. CRISTALINO
        ================================================================== */

        {
            id: "cristalino",

            title: "Cristalino",

            content: `
                <h2>Cristalino</h2>

                <p>
                    O cristalino é uma estrutura transparente localizada atrás
                    da íris, responsável por auxiliar na focalização da luz
                    sobre a retina. Sua principal função é ajustar o foco da
                    visão para objetos próximos e distantes, permitindo uma
                    imagem mais nítida.
                </p>

                <p>
                    Esse processo é chamado de acomodação e acontece graças à
                    capacidade do cristalino de alterar sua forma conforme a
                    necessidade visual, funcionando de maneira semelhante à
                    lente de uma câmera com foco automático.
                </p>

                <p>
                    O cristalino é formado principalmente por água e proteínas
                    organizadas de forma transparente, permitindo a passagem
                    correta da luz. Quando saudável, mantém-se claro e flexível,
                    contribuindo para uma boa qualidade visual.
                </p>

                <h3>Presbiopia</h3>

                <p>
                    Com o envelhecimento, o cristalino perde parte de sua
                    elasticidade, dificultando a focalização de objetos
                    próximos. Essa condição é conhecida como presbiopia e
                    costuma surgir após os 40 anos.
                </p>

                <h3>Catarata</h3>

                <p>
                    A catarata ocorre quando o cristalino perde sua
                    transparência, tornando-se opaco. Isso provoca visão
                    embaçada ou turva e pode estar relacionada ao
                    envelhecimento, traumas ou ao uso prolongado de alguns
                    medicamentos.
                </p>

                <p>
                    O cristalino pode ser comparado à lente ajustável de uma
                    câmera, que modifica o foco constantemente para garantir
                    imagens mais claras em diferentes distâncias.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cristalino-01.jpeg"
                        alt="Estrutura do cristalino"
                        loading="lazy"
                    >
                    <figcaption>
                        Estrutura do cristalino.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/cristalino-02.jpeg"
                        alt="Cristalino em diferentes condições"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação do cristalino.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           9. RETINA
        ================================================================== */

        {
            id: "retina",

            title: "Retina",

            content: `
                <h2>Retina</h2>

                <p>
                    A retina é a camada interna do olho responsável por captar
                    a luz que entra pela córnea e transformá-la em impulsos
                    nervosos, que são enviados ao cérebro para a formação das
                    imagens.
                </p>

                <p>
                    Ela é composta por células especializadas chamadas
                    fotorreceptores, divididas em dois tipos principais:
                </p>

                <ul>
                    <li>
                        <strong>Bastonetes</strong> — são responsáveis pela
                        visão em ambientes com pouca iluminação, auxiliando na
                        percepção de movimentos, formas e visão noturna.
                    </li>

                    <li>
                        <strong>Cones</strong> — atuam principalmente em locais
                        bem iluminados, sendo responsáveis pela percepção das
                        cores e dos detalhes das imagens.
                    </li>
                </ul>

                <p>
                    A retina desempenha um papel fundamental no processo da
                    visão, pois é nela que ocorre a conversão da luz em sinais
                    elétricos interpretados pelo cérebro.
                </p>

                <p>
                    Podemos compará-la ao sensor de uma câmera fotográfica, que
                    recebe a luz e transforma as informações em imagens com
                    nitidez, cores e detalhes.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/retina-01.jpeg"
                        alt="Retina do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da retina.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/retina-02.jpeg"
                        alt="Estrutura da retina"
                        loading="lazy"
                    >
                    <figcaption>
                        Estrutura relacionada à retina.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           10. ÍRIS
        ================================================================== */

        {
            id: "iris",

            title: "Íris",

            content: `
                <h2>Íris</h2>

                <p>
                    A íris é a parte colorida do olho e tem como principal
                    função controlar a quantidade de luz que entra pela pupila,
                    ajudando na adaptação da visão em diferentes ambientes.
                </p>

                <ul>
                    <li>
                        Em locais muito iluminados, a íris contrai a pupila
                        para reduzir a entrada de luz e proteger as estruturas
                        internas do olho.
                    </li>

                    <li>
                        Em ambientes escuros, a íris dilata a pupila, permitindo
                        a entrada de uma quantidade maior de luz para melhorar
                        a visão.
                    </li>
                </ul>

                <p>
                    A íris é formada por músculos que realizam esses movimentos
                    automaticamente, garantindo maior conforto visual e melhor
                    qualidade da visão.
                </p>

                <p>
                    Podemos compará-la às cortinas de uma janela, que se abrem
                    ou fecham para controlar a luminosidade de um ambiente. Da
                    mesma forma, a íris regula a entrada de luz nos olhos para
                    proporcionar uma visão mais clara e equilibrada.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/iris-01.jpeg"
                        alt="Íris do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da íris.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/iris-02.jpeg"
                        alt="Íris e pupila"
                        loading="lazy"
                    >
                    <figcaption>
                        Íris e pupila em diferentes condições de iluminação.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/iris-03.jpeg"
                        alt="Detalhe da íris"
                        loading="lazy"
                    >
                    <figcaption>
                        Detalhe da estrutura da íris.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           11. PUPILA
        ================================================================== */

        {
            id: "pupila",

            title: "Pupila",

            content: `
                <h2>Pupila</h2>

                <p>
                    A pupila é a abertura localizada no centro da íris,
                    responsável pela entrada de luz no interior do olho. Seu
                    tamanho varia conforme a intensidade da luz no ambiente,
                    sendo controlado pelos músculos da íris.
                </p>

                <ul>
                    <li>
                        Em ambientes claros, a pupila se contrai para diminuir
                        a entrada de luz e proteger os olhos do excesso de
                        luminosidade.
                    </li>

                    <li>
                        Em locais escuros, a pupila se dilata para permitir a
                        passagem de uma quantidade maior de luz, facilitando a
                        visão.
                    </li>
                </ul>

                <p>
                    Esse mecanismo ajuda os olhos a se adaptarem a diferentes
                    condições de iluminação, proporcionando maior conforto e
                    qualidade visual.
                </p>

                <p>
                    A pupila pode ser comparada à abertura de uma janela, que
                    aumenta ou diminui para controlar a quantidade de luz que
                    entra em um ambiente. Da mesma forma, a pupila regula a
                    passagem da luz até a retina, contribuindo para uma visão
                    mais clara e equilibrada.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/pupila-01.jpeg"
                        alt="Pupila do olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação da pupila.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/pupila-02.jpeg"
                        alt="Pupila e íris"
                        loading="lazy"
                    >
                    <figcaption>
                        Relação entre pupila e íris.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           12. HUMOR AQUOSO
        ================================================================== */

        {
            id: "humor-aquoso",

            title: "Humor aquoso",

            content: `
                <h2>Humor aquoso</h2>

                <p>
                    O humor aquoso é um líquido transparente localizado na
                    parte anterior do olho, entre a córnea e o cristalino. Sua
                    principal função é nutrir essas estruturas e auxiliar na
                    manutenção da pressão intraocular, contribuindo para o
                    formato e o bom funcionamento do olho.
                </p>

                <p>
                    Esse líquido é produzido continuamente e drenado por canais
                    específicos, mantendo o equilíbrio da pressão ocular.
                    Quando ocorre dificuldade na drenagem do humor aquoso, a
                    pressão dentro do olho pode aumentar, situação associada ao
                    glaucoma.
                </p>

                <p>
                    Além da função nutritiva, o humor aquoso também ajuda na
                    hidratação e na oxigenação das estruturas oculares que não
                    possuem vasos sanguíneos, como a córnea e o cristalino.
                </p>

                <p>
                    Podemos compará-lo ao óleo de um motor, que circula
                    constantemente para lubrificar, proteger e garantir o
                    funcionamento adequado das peças. Da mesma forma, o humor
                    aquoso mantém o equilíbrio e a saúde das estruturas
                    oculares.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/humor-aquoso-01.png"
                        alt="Humor aquoso no olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Localização do humor aquoso no olho.
                    </figcaption>
                </figure>
            `
        },


        /* ==================================================================
           13. HUMOR VÍTREO
        ================================================================== */

        {
            id: "humor-vitreo",

            title: "Humor vítreo",

            content: `
                <h2>Humor vítreo</h2>

                <p>
                    O humor vítreo é uma substância gelatinosa e transparente
                    que ocupa a parte interna do olho, localizada entre o
                    cristalino e a retina. Sua principal função é manter o
                    formato do globo ocular e auxiliar na proteção das
                    estruturas internas contra impactos.
                </p>

                <p>
                    Além disso, o humor vítreo ajuda a manter a retina
                    posicionada corretamente no fundo do olho, contribuindo
                    para o bom funcionamento da visão.
                </p>

                <p>
                    Diferente do humor aquoso, o humor vítreo não é renovado
                    constantemente. Com o passar do tempo, sua composição pode
                    sofrer alterações naturais, tornando-se mais líquida e
                    favorecendo o aparecimento de pequenas partículas ou
                    opacidades conhecidas como "moscas volantes", percebidas
                    principalmente ao olhar para superfícies claras.
                </p>

                <p>
                    O humor vítreo pode ser comparado a um gel de sustentação,
                    que preenche o interior do olho, ajudando a manter sua
                    estrutura firme, estável e protegida.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/humor-vitreo-01.jpeg"
                        alt="Humor vítreo no olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Representação do humor vítreo.
                    </figcaption>
                </figure>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/anatomia/humor-vitreo-02.png"
                        alt="Localização do humor vítreo no olho"
                        loading="lazy"
                    >
                    <figcaption>
                        Localização do humor vítreo no globo ocular.
                    </figcaption>
                </figure>
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

    window.VisiumContent.anatomia =
        anatomiaContent;

}