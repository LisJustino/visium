"use strict";

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent["dp-dnp"] = {

    id: "dp-dnp",

    title: "DP, DNP e Altura",

    category: "MEDIÇÃO",

    description:
        "Entenda como DP, DNP e altura influenciam a centralização, o conforto e a adaptação dos óculos.",

    sections: [

        {
            id: "conceito-geral",
            title: "DP, DNP e altura",
            content: `
                <h2>DP, DNP e altura</h2>

                <p>
                    A pupila é a abertura por onde a luz entra nos olhos e
                    inicia o processo da visão. Para que os óculos ofereçam a
                    melhor correção possível, o centro óptico das lentes precisa
                    estar alinhado com a posição da pupila.
                </p>

                <p>
                    Esse alinhamento é essencial para que a luz seja direcionada
                    corretamente, proporcionando uma visão mais nítida,
                    confortável e precisa. Quanto mais exato for o ajuste em
                    relação ao reflexo corneano, melhor tende a ser o desempenho
                    das lentes no dia a dia.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/dp-dnp/hero.jpg" alt="Medição das referências para centralização das lentes" loading="lazy">
                    <figcaption>Referências usadas na medição óptica.</figcaption>
                </figure>
            `
        },

        {
            id: "dnp",
            title: "O que é DNP?",
            content: `
                <h2>O que é DNP?</h2>

                <p>
                    DNP significa Distância Naso-Pupilar. É a medida do centro
                    do nariz até o centro de cada pupila.
                </p>

                <p>
                    Essa medida é importante na confecção dos óculos porque
                    garante que o centro da lente fique alinhado corretamente
                    com cada olho. Como ninguém tem o rosto completamente
                    simétrico, medir os dois lados separadamente ajuda a evitar
                    dor de cabeça, visão embaçada e desconforto.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/dp-dnp/ilustracao-dp-dnp.jpg" alt="Ilustração da distância naso-pupilar" loading="lazy">
                    <figcaption>Medida do nariz até o centro de cada pupila.</figcaption>
                </figure>
            `
        },

        {
            id: "dp",
            title: "O que é DP?",
            content: `
                <h2>O que é DP: Distância Pupilar</h2>

                <p>
                    A Distância Pupilar (DP) é a medida, em milímetros, entre o
                    centro da pupila direita e o centro da pupila esquerda.
                </p>

                <h3>Por que a DP é importante?</h3>

                <p>
                    Toda lente de óculos tem um ponto central onde a visão fica
                    mais nítida. Para enxergar bem, esse ponto precisa ficar
                    alinhado exatamente com a pupila. A DP é a medida usada para
                    garantir esse alinhamento.
                </p>

                <p>
                    Uma DP incorreta pode causar desconforto visual, dores de
                    cabeça e fadiga ocular, mesmo que o grau da lente esteja
                    certo. Por isso, medir a DP é essencial para o conforto e a
                    qualidade da visão.
                </p>
            `
        },

        {
            id: "pupilometro-digital",
            title: "Medição com pupilômetro digital",
            content: `
                <h2>Como medir com pupilômetro digital?</h2>

                <ol>
                    <li>O cliente apoia o pupilômetro na ponte do nariz, como se fosse um óculos.</li>
                    <li>O aparelho emite um feixe de luz que reflete na córnea do cliente.</li>
                    <li>O profissional observa pela ocular o reflexo da luz no olho.</li>
                    <li>A linha de referência do pupilômetro deve ser alinhada ao ponto de luz refletido na córnea.</li>
                </ol>

                <h3>Por que medir pela luz?</h3>

                <p>
                    O reflexo corneano, também chamado reflexo de Purkinje,
                    corresponde ao eixo visual, o ponto real por onde a pessoa
                    enxerga. O centro da pupila pode se deslocar um pouco de
                    acordo com a iluminação, enquanto o reflexo corneano é mais
                    estável.
                </p>

                <p>
                    Medir pelo reflexo ajuda a evitar erros de paralaxe e
                    favorece a centralização da lente para longe.
                </p>

                <figure class="reader-image">
                    <img src="/assets/img/content/dp-dnp/foroptero.jpg" alt="Equipamento utilizado em medições ópticas" loading="lazy">
                    <figcaption>Equipamento de medição óptica.</figcaption>
                </figure>
            `
        },

        {
            id: "medicao-manual",
            title: "Medição manual com régua",
            content: `
                <h2>Medição manual com régua milimetrada</h2>

                <p>
                    Esse é o método tradicional quando não há um pupilômetro
                    disponível.
                </p>

                <ol>
                    <li>Fique na mesma altura do cliente, a aproximadamente 40 cm de distância.</li>
                    <li>Peça para o cliente olhar para o seu olho esquerdo com o olho direito dele, e vice-versa, mantendo o olhar para longe.</li>
                    <li>Com a régua apoiada na ponte do nariz, meça do centro do nariz até o centro de cada pupila.</li>
                    <li>Considere como centro da pupila o meio visual do círculo escuro do olho.</li>
                </ol>

                <h3>Observação</h3>

                <p>
                    A pupila dilata e contrai com a luz, então o centro pode
                    mudar entre 0,5 mm e 1 mm. Por isso, o pupilômetro é mais
                    confiável quando disponível.
                </p>

                <h3>Erro comum</h3>

                <p>
                    Medir com o cliente olhando para a ponta do nariz ou para a
                    sua caneta gera convergência e faz a DNP ficar menor que a
                    real. Para óculos de longe, o cliente deve olhar reto e para
                    longe.
                </p>
            `
        },

        {
            id: "altura",
            title: "Altura do multifocal e visão simples",
            content: `
                <h2>Altura do multifocal e da visão simples</h2>

                <p>
                    A altura do multifocal é uma das medidas mais importantes na
                    confecção de lentes progressivas. Ela define a posição exata
                    das áreas de visão para longe, intermediária e perto dentro
                    da lente.
                </p>

                <p>
                    Quando essa medida é feita corretamente, o usuário enxerga
                    com conforto e se adapta com mais facilidade. Se a altura
                    estiver incorreta, podem surgir dificuldade para focar,
                    distorção, necessidade de levantar ou abaixar a cabeça e
                    desconforto durante o uso.
                </p>

                <h3>Como medir a altura do multifocal</h3>

                <ol>
                    <li>Ajuste a armação exatamente como ela será entregue ao cliente.</li>
                    <li>Confira se plaquetas, hastes e inclinação estão na posição correta.</li>
                    <li>Peça para o cliente colocar a armação e olhar para um ponto distante, mantendo a cabeça em posição natural.</li>
                    <li>Marque na lente de demonstração o centro da pupila de cada olho.</li>
                    <li>Meça, com régua milimetrada ou equipamento digital, a distância entre a parte inferior interna do aro e a marca da pupila.</li>
                    <li>Faça a medição separadamente em cada olho, pois podem existir diferenças entre os lados.</li>
                </ol>

                <figure class="reader-image">
                    <img src="/assets/img/content/dp-dnp/altura.jpg" alt="Medição da altura de montagem" loading="lazy">
                    <figcaption>Referência para medição da altura.</figcaption>
                </figure>
            `
        },

        {
            id: "cuidados-e-erros",
            title: "Cuidados essenciais e erros de adaptação",
            content: `
                <h2>Cuidados essenciais</h2>

                <ul>
                    <li>Faça a medição somente depois que a armação estiver totalmente ajustada.</li>
                    <li>Oriente o cliente a olhar para longe, mantendo a postura natural.</li>
                    <li>Meça cada olho individualmente.</li>
                    <li>Respeite sempre a altura mínima indicada pelo fabricante da lente progressiva.</li>
                    <li>Se a armação for ajustada novamente após a medição, confira a altura antes de finalizar o pedido.</li>
                </ul>

                <p>
                    Erros aparentemente simples podem causar a não adaptação ou
                    até mesmo uma adaptação inadequada. Por isso, é fundamental
                    seguir tecnicamente todos os passos, inclusive na medição
                    para óculos de visão simples.
                </p>
            `
        }

    ]

};
