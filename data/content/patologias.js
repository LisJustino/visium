"use strict";

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent.patologias = {

    id: "patologias",

    title: "Patologias",

    category: "SAÚDE OCULAR",

    description:
        "Principais patologias oculares, seus sinais e sintomas e a importância do encaminhamento ao especialista.",

    sections: [

        {
            id: "introducao",
            title: "Introdução às patologias",
            content: `
                <h2>Introdução às patologias</h2>

                <p>
                    As patologias oculares são condições que comprometem a
                    visão e a saúde dos olhos, podendo ser causadas por fatores
                    genéticos, infecciosos ou degenerativos.
                </p>

                <p>
                    O conhecimento dessas alterações é fundamental na área
                    óptica, pois auxilia na identificação de sinais que precisam
                    de encaminhamento ao especialista. Neste capítulo, serão
                    apresentadas as principais patologias oculares.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/patologias/pagina-01-imagem-01.png"
                        alt="Ilustração do olho para introdução às patologias oculares"
                        loading="lazy"
                    >
                    <figcaption>
                        Introdução às principais patologias oculares.
                    </figcaption>
                </figure>
            `
        },

        {
            id: "hordeolo",
            title: "Hordéolo",
            content: `
                <h2>Hordéolo</h2>

                <p>
                    É uma inflamação na pálpebra causada por infecção nas
                    glândulas sebáceas. Pode ser externo, quando aparece próximo
                    aos cílios, ou interno, quando ocorre na parte interna da
                    pálpebra.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Inchaço e vermelhidão na pálpebra;</li>
                    <li>Dor e sensação de corpo estranho no olho;</li>
                    <li>Pequeno ponto amarelado com possível saída de pus.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-02-imagem-01.png" alt="Hordéolo interno" loading="lazy">
                    <img src="/assets/img/content/patologias/pagina-02-imagem-02.png" alt="Hordéolo externo" loading="lazy">
                    <figcaption>Exemplos de hordéolo interno e externo.</figcaption>
                </figure>
            `
        },

        {
            id: "calazio",
            title: "Calázio",
            content: `
                <h2>Calázio</h2>

                <p>
                    O calázio é uma inflamação não infecciosa da pálpebra,
                    causada pela obstrução das glândulas responsáveis pela
                    produção de óleo. Essa alteração forma um pequeno nódulo e é
                    mais comum em pessoas com blefarite ou acne rosácea.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Inchaço e vermelhidão no início;</li>
                    <li>Caroço endurecido e geralmente sem dor;</li>
                    <li>Em alguns casos, pode causar visão embaçada.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-03-imagem-01.jpeg" alt="Calázio na pálpebra" loading="lazy">
                    <figcaption>Exemplo de calázio.</figcaption>
                </figure>
            `
        },

        {
            id: "olho-seco",
            title: "Olhos secos",
            content: `
                <h2>Olhos secos</h2>

                <p>
                    O olho seco é uma condição causada pela baixa produção de
                    lágrimas ou pela má qualidade da lubrificação ocular. Isso
                    pode provocar desconforto, irritação e dificuldade para
                    manter os olhos bem hidratados.
                </p>

                <p>
                    Entre as principais causas estão o envelhecimento, uso
                    excessivo de lentes de contato, medicamentos e fatores
                    ambientais, como clima seco e poluição.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Ardor, coceira e sensação de areia nos olhos;</li>
                    <li>Olhos vermelhos e cansados;</li>
                    <li>Visão embaçada que melhora ao piscar.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-04-imagem-01.jpeg" alt="Olho seco" loading="lazy">
                    <figcaption>Exemplo de olho seco.</figcaption>
                </figure>
            `
        },

        {
            id: "pterigio",
            title: "Pterígio",
            content: `
                <h2>Pterígio</h2>

                <p>
                    O pterígio é uma alteração benigna na superfície do olho,
                    geralmente causada pela exposição excessiva ao sol, vento e
                    poeira. Ocorre quando um tecido cresce da conjuntiva em
                    direção à córnea, podendo afetar a visão em casos mais
                    avançados.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Área avermelhada ou esbranquiçada no olho;</li>
                    <li>Irritação, ardência e sensação de corpo estranho;</li>
                    <li>Em casos mais graves, pode causar visão embaçada.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-05-imagem-01.jpeg" alt="Pterígio na superfície do olho" loading="lazy">
                    <figcaption>Exemplo de pterígio.</figcaption>
                </figure>
            `
        },

        {
            id: "catarata",
            title: "Catarata",
            content: `
                <h2>Catarata</h2>

                <p>
                    A catarata acontece quando o cristalino, a lente natural do
                    olho, perde sua transparência com o tempo. Isso dificulta a
                    passagem da luz e causa visão embaçada.
                </p>

                <p>
                    O envelhecimento é a principal causa, mas lesões, doenças,
                    medicamentos e exposição ao sol também podem contribuir.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Visão embaçada;</li>
                    <li>Sensibilidade à luz;</li>
                    <li>Dificuldade para enxergar à noite;</li>
                    <li>Alteração nas cores;</li>
                    <li>Mudanças frequentes no grau dos óculos.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-06-imagem-01.jpeg" alt="Catarata no cristalino" loading="lazy">
                    <figcaption>Exemplo de catarata.</figcaption>
                </figure>
            `
        },

        {
            id: "glaucoma",
            title: "Glaucoma",
            content: `
                <h2>Glaucoma</h2>

                <p>
                    O glaucoma é uma doença causada pelo aumento da pressão
                    dentro do olho, podendo danificar o nervo óptico e
                    comprometer a visão. Isso acontece quando o líquido ocular
                    não é drenado corretamente. Sem tratamento, pode levar à
                    perda da visão.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Perda gradual da visão periférica;</li>
                    <li>Dificuldade para enxergar em estágios avançados;</li>
                    <li>Dor ou pressão nos olhos;</li>
                    <li>Vermelhidão ocular;</li>
                    <li>Visão embaçada ou halos ao redor das luzes.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-07-imagem-01.jpeg" alt="Alteração da visão associada ao glaucoma" loading="lazy">
                    <figcaption>Representação dos efeitos do glaucoma na visão.</figcaption>
                </figure>
            `
        },

        {
            id: "tipos-de-glaucoma",
            title: "Tipos de glaucoma",
            content: `
                <h2>Tipos de glaucoma</h2>

                <h3>Glaucoma de ângulo aberto</h3>
                <p>
                    É o tipo mais comum, representando a maioria dos casos.
                    Desenvolve-se lentamente devido à má drenagem de fluidos,
                    sendo assintomático no início e causando perda de visão
                    periférica com o tempo.
                </p>

                <h3>Glaucoma de ângulo fechado</h3>
                <p>
                    Menos comum, mas muito mais grave. Ocorre quando a íris
                    bloqueia subitamente a drenagem do olho, causando um aumento
                    repentino e severo da pressão ocular que exige atenção
                    médica de emergência.
                </p>

                <h3>Glaucoma de pressão normal</h3>
                <p>
                    Ocorre quando o nervo óptico é danificado mesmo com a
                    pressão intraocular dentro dos padrões normais,
                    frequentemente associado à sensibilidade aumentada ou
                    problemas de fluxo sanguíneo.
                </p>

                <h3>Glaucoma secundário</h3>
                <p>
                    Desenvolve-se como consequência de outras condições ou
                    fatores, como traumas, uso prolongado de medicamentos,
                    especialmente corticoides, diabetes e inflamações como
                    uveíte.
                </p>

                <h3>Glaucoma congênito</h3>
                <p>
                    Uma forma rara presente desde o nascimento, causada por um
                    desenvolvimento anormal no sistema de drenagem ocular.
                    Exige intervenção cirúrgica imediata em bebês para prevenir
                    a cegueira.
                </p>

            `
        },

        {
            id: "ceratocone",
            title: "Ceratocone",
            content: `
                <h2>Ceratocone</h2>

                <p>
                    O ceratocone é uma doença que afeta a córnea, deixando-a
                    mais fina e irregular, o que causa visão embaçada e
                    distorcida. Fatores genéticos e o hábito de coçar os olhos
                    podem contribuir para o problema.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Visão embaçada;</li>
                    <li>Aumento frequente do grau;</li>
                    <li>Sensibilidade à luz;</li>
                    <li>Dificuldade para enxergar à noite;</li>
                    <li>Visão dupla ou distorcida.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-09-imagem-01.jpeg" alt="Ceratocone na córnea" loading="lazy">
                    <figcaption>Exemplo de ceratocone.</figcaption>
                </figure>
            `
        },

        {
            id: "retinopatia-diabetica",
            title: "Retinopatia diabética",
            content: `
                <h2>Retinopatia diabética</h2>

                <p>
                    A retinopatia diabética é uma complicação do diabetes que
                    prejudica os vasos sanguíneos da retina, parte responsável
                    pela visão. Com o tempo, níveis elevados de açúcar no sangue
                    podem danificar esses vasos, causando vazamentos ou
                    crescimento de novos vasos, o que pode levar à perda de
                    visão.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Visão embaçada ou turva;</li>
                    <li>Manchas escuras ou "flutuantes";</li>
                    <li>Dificuldade para enxergar à noite;</li>
                    <li>Perda de visão gradual ou súbita.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-10-imagem-01.png" alt="Retina saudável e retina com retinopatia diabética" loading="lazy">
                    <figcaption>Comparação entre retina saudável e retina afetada.</figcaption>
                </figure>
            `
        },

        {
            id: "conjuntivite-bacteriana",
            title: "Conjuntivite bacteriana",
            content: `
                <h2>Conjuntivite bacteriana</h2>

                <p>
                    É uma infecção nos olhos causada por bactérias como
                    <em>Staphylococcus aureus</em>, <em>Streptococcus pneumoniae</em>
                    e <em>Haemophilus influenzae</em>. Muito contagiosa, pode
                    atingir um ou os dois olhos.
                </p>

                <h3>Principais sintomas</h3>

                <ul>
                    <li>Olhos vermelhos e irritados;</li>
                    <li>Secreção espessa amarelada ou esverdeada;</li>
                    <li>Pálpebras grudadas ao acordar;</li>
                    <li>Sensação de areia nos olhos e lacrimejamento.</li>
                </ul>

                <p>
                    O paciente deve procurar um médico oftalmologista para
                    avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-11-imagem-01.jpeg" alt="Conjuntivite bacteriana" loading="lazy">
                    <figcaption>Exemplo de conjuntivite bacteriana.</figcaption>
                </figure>
            `
        },

        {
            id: "conjuntivite-alergica",
            title: "Conjuntivite alérgica",
            content: `
                <h2>Conjuntivite alérgica</h2>

                <p>
                    É uma inflamação nos olhos desencadeada pelo contato com
                    agentes alérgenos, como pólen, poeira, mofo, pelo de animais
                    e substâncias químicas presentes em maquiagens ou perfumes.
                </p>

                <h3>Sinais e sintomas mais comuns</h3>

                <ul>
                    <li>Coceira forte nos olhos;</li>
                    <li>Olhos vermelhos;</li>
                    <li>Lacrimejamento constante;</li>
                    <li>Sensação de areia ou corpo estranho;</li>
                    <li>Pálpebras inchadas.</li>
                </ul>

                <p>
                    É importante que o paciente consulte um médico
                    oftalmologista para avaliar o caso e indicar o tratamento
                    correto.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-12-imagem-01.jpeg" alt="Conjuntivite alérgica" loading="lazy">
                    <figcaption>Exemplo de conjuntivite alérgica.</figcaption>
                </figure>
            `
        },

        {
            id: "conjuntivite-viral",
            title: "Conjuntivite viral",
            content: `
                <h2>Conjuntivite viral</h2>

                <p>
                    A conjuntivite viral ocorre quando os olhos são infectados
                    por vírus, geralmente associada a gripes, resfriados ou
                    contato com secreções de pessoas contaminadas.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Olhos vermelhos e irritados;</li>
                    <li>Lacrimejamento excessivo;</li>
                    <li>Sensação de areia nos olhos;</li>
                    <li>Inchaço nas pálpebras;</li>
                    <li>Sensibilidade à luz;</li>
                    <li>Pode haver secreção aquosa.</li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao médico oftalmologista
                    para avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-13-imagem-01.jpeg" alt="Conjuntivite viral" loading="lazy">
                    <figcaption>Exemplo de conjuntivite viral.</figcaption>
                </figure>
            `
        },

        {
            id: "ambliopia",
            title: "Ambliopia",
            content: `
                <h2>Ambliopia</h2>

                <p>
                    Popularmente conhecida como "olho preguiçoso", é uma
                    condição ocular em que um dos olhos não se desenvolve
                    normalmente, resultando em visão reduzida, mesmo com o uso
                    de óculos ou lentes corretivas.
                </p>

                <p>
                    A ambliopia ocorre quando o cérebro favorece um olho em
                    detrimento do outro, levando ao desenvolvimento inadequado
                    da visão no olho afetado. A condição é mais comum em
                    crianças, mas pode ser tratada com sucesso se diagnosticada
                    precocemente.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Visão embaçada ou dupla no olho afetado;</li>
                    <li>Dificuldade para enxergar de perto ou de longe com o olho afetado;</li>
                    <li>Tendência a cobrir ou fechar o olho afetado;</li>
                    <li>
                        Pode não haver sintomas evidentes, por isso é importante
                        monitorar as crianças desde cedo.
                    </li>
                </ul>

                <p>
                    O paciente deve ser encaminhado ao médico oftalmologista
                    para avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-14-imagem-01.jpeg" alt="Exemplo de ambliopia" loading="lazy">
                    <figcaption>Exemplo de ambliopia.</figcaption>
                </figure>
            `
        },

        {
            id: "estrabismo",
            title: "Estrabismo",
            content: `
                <h2>Estrabismo</h2>

                <p>
                    É uma condição em que os olhos não se alinham e apontam para
                    direções diferentes. Pode ser contínuo ou intermitente e
                    afetar um ou os dois olhos.
                </p>

                <h3>Sinais e sintomas</h3>

                <ul>
                    <li>Olhos desalinhados: um olho desvia para dentro, fora, cima ou baixo;</li>
                    <li>Visão dupla;</li>
                    <li>Dificuldade para ver em profundidade;</li>
                    <li>Esforço visual, cansaço ou dor de cabeça.</li>
                </ul>

                <p>
                    O estrabismo pode levar à ambliopia se não tratado.
                </p>

                <p>
                    O paciente deve ser encaminhado ao médico oftalmologista
                    para avaliação e tratamento adequado.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/patologias/pagina-15-imagem-01.jpeg" alt="Exemplo de estrabismo" loading="lazy">
                    <figcaption>Exemplo de estrabismo.</figcaption>
                </figure>
            `
        }

    ]

};
