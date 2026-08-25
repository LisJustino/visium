"use strict";

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent["acuidade-visual"] = {

    id: "acuidade-visual",

    title: "Acuidade Visual",

    category: "VISÃO",

    description:
        "Avaliação da acuidade visual e principais tipos de optotipos.",

    sections: [

        {
            id: "acuidade-visual",
            title: "Acuidade visual",
            content: `
                <h2>Acuidade visual</h2>

                <p>
                    A acuidade visual (AV) corresponde à capacidade funcional
                    do sistema visual de identificar, discriminar e perceber
                    detalhes de objetos com precisão e nitidez em diferentes
                    distâncias.
                </p>

                <p>
                    Trata-se de um dos principais parâmetros da avaliação,
                    sendo utilizada para analisar a qualidade da visão e
                    auxiliar na detecção de alterações refrativas ou funcionais
                    que possam necessitar de correção óptica, por meio de
                    óculos ou lentes de contato.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/avaliacao-acuidade.jpeg" alt="Avaliação da acuidade visual" loading="lazy">
                    <figcaption>Avaliação da acuidade visual.</figcaption>
                </figure>

                <h3>Como a acuidade visual é avaliada?</h3>

                <p>
                    A avaliação da acuidade visual é realizada por meio de
                    tabelas optométricas padronizadas, como a Tabela de
                    Snellen, composta por optotipos apresentados em tamanhos
                    progressivamente reduzidos.
                </p>

                <p>
                    Os resultados da acuidade visual são geralmente expressos
                    em frações, como 20/20, 20/40 ou 20/200, representando a
                    relação entre a distância do exame e a capacidade visual
                    obtida.
                </p>

                <h3>Procedimento de avaliação</h3>

                <ol>
                    <li>O paciente é posicionado a uma distância padronizada da tabela optométrica, habitualmente 6 metros (20 pés).</li>
                    <li>A tabela apresenta fileiras sequenciais de optotipos com redução gradual de tamanho.</li>
                    <li>O exame consiste na identificação e leitura das linhas da tabela.</li>
                    <li>A avaliação é realizada de forma monocular, com a oclusão de um olho por vez.</li>
                    <li>O profissional solicita a leitura dos menores optotipos visíveis pelo paciente.</li>
                </ol>
            `
        },

        {
            id: "optotipos",
            title: "Optotipos",
            content: `
                <h2>Optotipos</h2>

                <h3>Snellen</h3>
                <p>
                    Tabelas optométricas compostas por caracteres alfabéticos
                    padronizados, destinadas à avaliação da acuidade visual
                    para longe em pacientes alfabetizados, adultos ou
                    pediátricos.
                </p>
                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/tabela-snellen.png" alt="Tabela de Snellen" loading="lazy">
                    <figcaption>Tabela de Snellen.</figcaption>
                </figure>

                <h3>Tumbling</h3>
                <p>
                    Tabela optométrica composta pela optotipia "E" em
                    diferentes orientações, indicada para avaliação da
                    acuidade visual em pacientes não alfabetizados, crianças
                    ou indivíduos com limitações de comunicação verbal.
                </p>
                <p>O paciente deve indicar manualmente a direção da abertura do optotipo.</p>
                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/tabela-tumbling.jpeg" alt="Tabela Tumbling" loading="lazy">
                    <figcaption>Tabela Tumbling.</figcaption>
                </figure>

                <h3>Tabela LEA</h3>
                <p>
                    Consiste em um instrumento padronizado para avaliação da
                    acuidade visual, desenvolvido para aplicação em crianças em
                    idade pré-escolar e em indivíduos com limitações na
                    comunicação verbal ou no reconhecimento de optotipos
                    alfabéticos.
                </p>
                <p>
                    A Tabela LEA emprega quatro símbolos geométricos
                    padronizados: círculo, quadrado, casa e maçã ou coração,
                    conforme a versão.
                </p>
                <p>
                    Essa padronização permite uma avaliação confiável da função
                    visual, reduzindo a influência de fatores relacionados à
                    alfabetização ou às habilidades linguísticas do indivíduo
                    avaliado.
                </p>
                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/tabela-lea.jpeg" alt="Tabela LEA" loading="lazy">
                    <figcaption>Tabela LEA.</figcaption>
                </figure>

                <h3>Tabela de Jaeger</h3>
                <p>
                    Tabela de visão próxima composta por textos e optotipos em
                    tamanhos progressivos, utilizada para avaliação da acuidade
                    visual de perto, especialmente em pacientes presbitas e
                    adultos acima de 40 anos.
                </p>
                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/tabela-jaeger.jpeg" alt="Tabela de Jaeger" loading="lazy">
                    <figcaption>Tabela de Jaeger.</figcaption>
                </figure>

                <h3>Bicromático</h3>
                <p>
                    Teste optométrico baseado no princípio bicromático,
                    utilizando os fundos vermelho e verde para refinamento
                    esférico da refração subjetiva, auxiliando na determinação
                    do foco visual mais nítido e no ajuste preciso da
                    prescrição óptica.
                </p>
                <figure class="reader-image">
                    <img src="/assets/img/content/lentes-contato/teste-bicromatico.jpeg" alt="Teste bicromático" loading="lazy">
                    <figcaption>Teste bicromático.</figcaption>
                </figure>
            `
        }

    ]

};
