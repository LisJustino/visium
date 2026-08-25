"use strict";

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent.montagem = {

    id: "montagem",

    title: "Montagem",

    category: "MONTAGEM",

    description:
        "Etapas da montagem de lentes oftálmicas, da leitura da Ordem de Serviço ao corte e ajuste.",

    sections: [

        {
            id: "ordem-de-servico",
            title: "Leitura da Ordem de Serviço (OS)",
            content: `
                <h2>Leitura da Ordem de Serviço (OS)</h2>

                <p>
                    A etapa de montagem inicia-se após a finalização do processo
                    de surfaçagem e da aplicação dos tratamentos solicitados
                    pelo cliente ao laboratório.
                </p>

                <p>
                    A Ordem de Serviço (OS) é o documento que contém todas as
                    informações necessárias para a execução da montagem. Sua
                    leitura exige atenção e interpretação correta dos dados,
                    desde a identificação da loja ou do paciente até as
                    especificações técnicas das lentes.
                </p>

                <p>
                    Antes de iniciar qualquer procedimento, o montador deve
                    conferir todas as informações da OS para garantir que o
                    serviço será realizado conforme solicitado.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/armacao.jpeg"
                        alt="Armação utilizada no processo de montagem"
                        loading="lazy"
                    >
                    <figcaption>
                        A montagem começa após a conferência da Ordem de Serviço.
                    </figcaption>
                </figure>
            `
        },

        {
            id: "lensometria",
            title: "Lensometria",
            content: `
                <h2>Lensometria</h2>

                <p>
                    O lensômetro é o equipamento utilizado para conferir o grau
                    das lentes e realizar sua marcação.
                </p>

                <p>
                    Durante a lensometria, o montador verifica se os valores de
                    dioptria esférica (S), cilíndrica (C) e o eixo (A) estão de
                    acordo com a Ordem de Serviço (OS). Também é importante
                    confirmar se o material da lente e os tratamentos
                    solicitados correspondem ao pedido.
                </p>

                <p>
                    Essa conferência garante que as lentes estejam corretas e
                    devidamente alinhadas antes do início da montagem.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/lensometro.jpg"
                        alt="Lensômetro utilizado para conferir lentes"
                        loading="lazy"
                    >
                    <figcaption>
                        Conferência do grau e marcação no lensômetro.
                    </figcaption>
                </figure>
            `
        },

        {
            id: "marcacao-monofocais",
            title: "Marcação de lentes monofocais",
            content: `
                <h2>Marcação de lentes monofocais</h2>

                <p>
                    Com a lente posicionada no lensômetro, realiza-se a
                    conferência do grau conforme a receita.
                </p>

                <p>No equipamento:</p>

                <ul>
                    <li><strong>S</strong> representa o valor esférico;</li>
                    <li><strong>C</strong> representa o valor cilíndrico;</li>
                    <li><strong>A</strong> representa o eixo.</li>
                </ul>

                <p>
                    Nas lentes cilíndricas, é necessário girar a lente até
                    encontrar o eixo correto. Após essa conferência, realiza-se
                    a marcação no lensômetro e reforça-se essa marcação com uma
                    caneta permanente, garantindo melhor visualização durante a
                    blocagem na facetadora.
                </p>

                <p>
                    Também é fundamental identificar corretamente a lente
                    direita (OD) e a esquerda (OE), evitando trocas durante o
                    corte e a montagem.
                </p>
            `
        },

        {
            id: "marcacao-multifocais",
            title: "Marcação de lentes multifocais",
            content: `
                <h2>Marcação de lentes multifocais</h2>

                <p>
                    Nas lentes multifocais, devem ser localizados dois círculos
                    gravados na superfície da lente. Essas marcações são
                    discretas e servem para identificar corretamente o tipo de
                    lente e seu posicionamento.
                </p>

                <p>
                    Dentro desses círculos encontra-se o valor da adição (ADD),
                    que corresponde ao aumento destinado à visão de perto. Essa
                    informação auxilia na identificação das lentes direita (OD)
                    e esquerda (OE).
                </p>

                <p>Após localizar as marcações:</p>

                <ul>
                    <li>destaque os dois círculos com uma caneta permanente;</li>
                    <li>
                        faça um pequeno traço abaixo do valor da adição para
                        facilitar sua identificação durante a montagem;
                    </li>
                    <li>
                        por exemplo, se a adição for <strong>+2,25</strong>, a
                        marcação poderá aparecer como <strong>225</strong> ou
                        <strong>22</strong>, conforme o padrão adotado pelo
                        fabricante.
                    </li>
                </ul>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/bifocal-executive.jpeg"
                        alt="Lente multifocal com referências de montagem"
                        loading="lazy"
                    >
                    <figcaption>
                        Referências utilizadas na marcação de lentes multifocais.
                    </figcaption>
                </figure>
            `
        },

        {
            id: "corte-e-ajuste",
            title: "Corte e ajuste",
            content: `
                <h2>Corte e ajuste</h2>

                <p>
                    O corte das lentes é realizado em máquinas chamadas
                    facetadoras, equipamentos responsáveis por usinar as lentes
                    de acordo com o formato da armação.
                </p>

                <p>
                    As facetadoras processam diferentes materiais de lentes e,
                    dependendo do modelo, também executam:
                </p>

                <ul>
                    <li>furação para armações do tipo balgriff;</li>
                    <li>canaletas para armações de nylon;</li>
                    <li>cortes para armações metálicas e de acetato.</li>
                </ul>

                <p>
                    Após o corte, o montador realiza o acabamento das bordas em
                    uma máquina diamantada e, posteriormente, o polimento das
                    lentes. Esse procedimento proporciona um encaixe preciso,
                    evitando excesso de pressão que possa provocar danos às
                    lentes ou à armação.
                </p>

                <p>
                    Quando necessário, utilizam-se o areeiro ou o ventilete para
                    aquecer armações de acetato. O aquecimento torna o material
                    mais flexível, permitindo ajustes sem causar deformações ou
                    quebras.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/lentes.jpeg"
                        alt="Equipamentos utilizados no corte e ajuste de lentes"
                        loading="lazy"
                    >
                    <figcaption>
                        Equipamentos e lentes na etapa de corte e ajuste.
                    </figcaption>
                </figure>
            `
        }

    ]

};
