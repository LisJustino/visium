/**
 * ==========================================================================
 * Visium
 * Arquivo: quiz.js
 *
 * Motor da execução dos quizzes.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Componentes
========================================================================== */

const COMPONENTS = {

    header:
        "/components/header/header.html?v=20260824"

};


const pendingQuizOperations = [];

let quizzesReady = false;

const QUIZ_DATA_VERSION =
    "20260825-answer-balance";


function getBalancedCorrectIndex(
    quizIndex,
    questionIndex,
    optionsLength
) {

    if (
        !Number.isInteger(optionsLength) ||
        optionsLength <= 1
    ) {

        return 0;

    }


    return (
        quizIndex +
        questionIndex
    ) % optionsLength;

}


function rebalanceQuestionAnswer(
    question,
    targetCorrectIndex
) {

    if (
        !question ||
        !Array.isArray(question.options) ||
        !Number.isInteger(question.correct) ||
        question.correct < 0 ||
        question.correct >= question.options.length ||
        targetCorrectIndex === question.correct
    ) {

        return;

    }


    const currentCorrectIndex =
        question.correct;

    const options =
        [
            ...question.options
        ];


    [
        options[targetCorrectIndex],
        options[currentCorrectIndex]
    ] = [
        options[currentCorrectIndex],
        options[targetCorrectIndex]
    ];


    question.options =
        options;

    question.correct =
        targetCorrectIndex;

}


function rebalanceQuizAnswers() {

    Object.values(
        QUIZ_DATA
    ).forEach(
        (
            quiz,
            quizIndex
        ) => {

            if (
                !quiz ||
                !Array.isArray(quiz.questions)
            ) {

                return;

            }


            quiz.questions.forEach(
                (
                    question,
                    questionIndex
                ) => {

                    rebalanceQuestionAnswer(
                        question,
                        getBalancedCorrectIndex(
                            quizIndex,
                            questionIndex,
                            Array.isArray(question.options)
                                ? question.options.length
                                : 0
                        )
                    );

                }
            );

        }
    );

}


function createQuestion(
    text,
    options,
    correct,
    explanation
) {

    return {
        text,
        options,
        correct,
        explanation
    };

}


function addQuestions(
    quizId,
    questions
) {

    if (!quizzesReady) {
        pendingQuizOperations.push(
            () => addQuestions(quizId, questions)
        );
        return;
    }

    QUIZ_DATA[quizId].questions.push(
        ...questions.map(
            ([text, options, correct, explanation]) =>
                createQuestion(
                    text,
                    options,
                    correct,
                    explanation
                )
        )
    );

}


function defineQuiz(
    quizId,
    quiz
) {

    if (!quizzesReady) {
        pendingQuizOperations.push(
            () => defineQuiz(quizId, quiz)
        );
        return;
    }

    QUIZ_DATA[quizId] = quiz;

}


addQuestions(
    "fundamentos-optica",
    [
        ["Qual estrutura controla a entrada de luz no olho?", ["Íris.", "Retina.", "Esclera.", "Cristalino."], 0, "A íris controla o diâmetro da pupila e regula a entrada de luz."],
        ["Qual é a função principal da retina?", ["Sustentar a armação.", "Captar a luz e gerar sinais visuais.", "Medir a DNP.", "Produzir a lente."], 1, "A retina capta a luz e participa da transformação da informação luminosa em sinais visuais."]
    ]
);

addQuestions(
    "ametropias",
    [
        ["Na hipermetropia, o foco tende a se formar:", ["Antes da retina.", "Atrás da retina.", "Na pálpebra.", "No eixo da armação."], 1, "Na hipermetropia, sem correção, o foco tende a ficar atrás da retina."],
        ["Qual alteração refrativa está associada a diferentes meridianos de curvatura?", ["Astigmatismo.", "Presbiopia.", "Emetropia.", "Acomodação normal."], 0, "O astigmatismo está relacionado a diferenças de curvatura entre meridianos."]
    ]
);

addQuestions(
    "dp-dnp",
    [
        ["Por que a DNP deve ser medida para cada olho?", ["Porque os lados do rosto podem ter pequenas diferenças.", "Para escolher a cor da lente.", "Para substituir o grau.", "Porque a DP não existe."], 0, "A medida monocular considera diferenças entre os lados e melhora a centralização."],
        ["Antes de medir a altura de um multifocal, a armação deve estar:", ["Desmontada.", "Sem as hastes.", "Ajustada como será entregue.", "Escolhida apenas pela cor."], 2, "Ajustes posteriores na armação podem alterar o resultado da medição."]
    ]
);

addQuestions(
    "montagem",
    [
        ["Qual etapa deve ocorrer antes da montagem definitiva?", ["Conferência das características da lente.", "Remoção das hastes.", "Alteração do eixo sem receita.", "Dispensa da centralização."], 0, "A conferência verifica se a lente corresponde ao pedido antes da montagem."],
        ["Por que a conferência final é importante?", ["Para verificar se o resultado corresponde ao esperado.", "Para mudar a prescrição.", "Para medir a córnea.", "Para escolher o material da lente depois da entrega."], 0, "A conferência final ajuda a identificar erros antes da entrega."]
    ]
);

addQuestions(
    "lendo-uma-receita",
    [
        ["O que significa a sigla ADD em uma receita?", ["Altura da armação.", "Adição para visão próxima.", "Eixo do cilindro.", "Olho esquerdo."], 1, "ADD indica a adição usada para a visão próxima."],
        ["Na transposição, o que acontece com o eixo?", ["Ele permanece sempre igual.", "Ele é ajustado em 90 graus.", "Ele é retirado da receita.", "Ele vira a adição."], 1, "A transposição ajusta o eixo em 90 graus, além de trocar o sinal do cilindro."]
    ]
);

addQuestions(
    "anatomia",
    [
        ["Qual estrutura regula a quantidade de luz que entra no olho?", ["Íris e pupila.", "Retina e esclera.", "Cristalino e retina.", "Córnea e cílios."], 0, "A íris controla a pupila, regulando a entrada de luz."],
        ["Qual estrutura ajuda a proteger a superfície ocular ao piscar?", ["Pálpebras.", "Retina.", "Cristalino.", "Nervo óptico."], 0, "As pálpebras distribuem a lágrima e protegem a superfície ocular."]
    ]
);

addQuestions(
    "armacoes",
    [
        ["Qual parte conecta as duas frentes da armação?", ["Ponte.", "Haste.", "Plaqueta.", "Aro temporal."], 0, "A ponte conecta os dois aros na frente da armação."],
        ["Qual característica deve ser considerada na escolha da armação?", ["Somente a cor.", "Formato do rosto, grau e conforto.", "Apenas o tamanho da pupila.", "Somente o material da lente."], 1, "A indicação deve considerar adaptação, estética, grau, peso e uso pretendido."]
    ]
);

addQuestions(
    "lentes-contato",
    [
        ["Qual cuidado reduz o risco de contaminação das lentes?", ["Lavar e secar as mãos antes do manuseio.", "Usar água da torneira no estojo.", "Compartilhar as lentes.", "Dormir com elas sem orientação."], 0, "A higiene e a secagem das mãos são essenciais antes de manipular as lentes."],
        ["Qual tabela é indicada para avaliação de visão próxima?", ["Jaeger.", "Snellen exclusivamente para longe.", "Tumbling exclusivamente para longe.", "Tabela de armações."], 0, "A tabela de Jaeger é usada na avaliação da acuidade visual para perto."]
    ]
);

addQuestions(
    "patologias",
    [
        ["Qual alteração pode ser observada em uma queixa visual?", ["Redução da acuidade visual.", "Mudança na cor da armação.", "Aumento da haste.", "Alteração da ponte."], 0, "O conteúdo cita redução da acuidade, alterações no campo e distorções da percepção."],
        ["O conteúdo educacional sobre patologias deve ser usado para:", ["Autodiagnóstico.", "Substituir consulta.", "Apoiar estudos e reconhecer a necessidade de avaliação.", "Escolher tratamento sem avaliação."], 2, "O material apoia o estudo, mas não substitui diagnóstico ou acompanhamento profissional."]
    ]
);

defineQuiz("interpretacao-de-receita", {
    category: "Receitas",
    title: "Interpretação de Receita",
    description: "Teste sua leitura dos principais campos de uma receita oftálmica.",
    questions: [
        createQuestion("O que indica o campo ESF?", ["A potência esférica da lente.", "A orientação do eixo.", "A distância pupilar.", "A altura da armação."], 0, "ESF indica a potência esférica usada na correção."),
        createQuestion("O que indica o eixo?", ["A orientação do cilindro em graus.", "A adição para perto.", "A distância entre as pupilas.", "O material da lente."], 0, "O eixo informa a orientação da correção cilíndrica."),
        createQuestion("Qual sinal costuma corrigir a miopia?", ["Negativo.", "Positivo.", "Sem sinal.", "Somente o sinal do eixo."], 0, "A miopia é geralmente corrigida com potência negativa."),
        createQuestion("Quando o cilindro aparece, qual campo deve acompanhá-lo?", ["Eixo.", "Cor.", "Altura.", "Ponte."], 0, "O eixo é necessário para orientar a correção cilíndrica."),
        createQuestion("Como se calcula o esférico de perto quando há adição?", ["Somando a adição ao esférico de longe.", "Subtraindo o eixo.", "Dividindo o cilindro.", "Trocando OD por OE."], 0, "A adição é somada ao componente esférico de longe."),
        createQuestion("O que significam OD e OE?", ["Olho direito e olho esquerdo.", "Óptica direita e óptica esquerda.", "Objetiva distante e objetiva externa.", "Ordem direita e ordem esquerda."], 0, "OD significa olho direito e OE significa olho esquerdo.")
    ]
});

defineQuiz("acuidade-visual", {
    category: "Visão",
    title: "Acuidade Visual",
    description: "Revise conceitos e procedimentos de avaliação da acuidade visual.",
    questions: [
        createQuestion("O que é acuidade visual?", ["Capacidade de perceber detalhes com nitidez.", "Medida da ponte.", "Tipo de armação.", "Potência do cilindro."], 0, "A acuidade visual descreve a capacidade funcional de identificar e discriminar detalhes."),
        createQuestion("O que são optotipos?", ["Símbolos usados para medir a resolução visual.", "Peças da armação.", "Tipos de lágrimas.", "Medidas de DNP."], 0, "Optotipos são caracteres ou símbolos usados em tabelas de avaliação visual."),
        createQuestion("Qual tabela usa letras para visão de longe?", ["Snellen.", "Jaeger.", "LEA apenas.", "Tumbling apenas."], 0, "A tabela de Snellen usa caracteres alfabéticos padronizados."),
        createQuestion("Como o exame pode avaliar cada olho?", ["De forma monocular.", "Somente com os dois olhos fechados.", "Apenas pela cor da íris.", "Sem tabela."], 0, "A avaliação monocular observa um olho por vez."),
        createQuestion("Qual tabela utiliza símbolos para crianças?", ["LEA.", "Jaeger.", "Snellen alfabética.", "Bicromática."], 0, "A tabela LEA usa símbolos para reduzir a influência da alfabetização."),
        createQuestion("A tabela de Jaeger é associada principalmente à visão:", ["Próxima.", "Periférica exclusivamente.", "Cromática exclusivamente.", "Sem correção."], 0, "Jaeger é usada para avaliação da acuidade visual de perto.")
    ]
});

defineQuiz("surfacagem-multifocal-bifocal", {
    category: "Processos",
    title: "Surfaçagem Multifocal e Bifocal",
    description: "Teste seus conhecimentos sobre surfaçagem, curvatura e lentes multifocais e bifocais.",
    questions: [
        createQuestion("O que é surfaçagem?", ["Trabalho da superfície da lente.", "Limpeza da armação.", "Medição da DNP.", "Avaliação da retina."], 0, "A surfaçagem trabalha a superfície para obter as características ópticas necessárias."),
        createQuestion("A curvatura participa de qual aspecto?", ["Do comportamento óptico da lente.", "Da cor da haste.", "Da proteção da pálpebra.", "Da medida da pupila."], 0, "A curvatura é um elemento da superfície óptica da lente."),
        createQuestion("O que caracteriza uma lente bifocal?", ["Zonas para diferentes distâncias de visão.", "Ausência de áreas ópticas.", "Uso exclusivo como lente de contato.", "Medição da armação."], 0, "A lente bifocal reúne áreas destinadas a diferentes distâncias."),
        createQuestion("O que caracteriza uma lente multifocal?", ["Progressão de potências para diferentes distâncias.", "Uma única potência sem transição.", "Somente uma área para perto.", "Nenhuma correção óptica."], 0, "A lente multifocal apresenta progressão de potências."),
        createQuestion("Por que a superfície deve seguir o projeto da lente?", ["Para obter o comportamento óptico esperado.", "Para escolher a cor do estojo.", "Para medir o rosto.", "Para alterar a prescrição."], 0, "A superfície precisa ser compatível com as características ópticas planejadas."),
        createQuestion("O que deve ser conferido após a montagem?", ["O resultado final e o posicionamento das lentes.", "Somente a cor da embalagem.", "Apenas o nome do cliente.", "Somente o material da haste."], 0, "A conferência final verifica se o resultado corresponde ao esperado.")
    ]
});


/* ==========================================================================
    Quizzes
========================================================================== */

const QUIZ_DATA = {

    "fundamentos-optica": {

        category:
            "Fundamentos",

        title:
            "Fundamentos de Óptica",

        description:
            "Revise conceitos introdutórios sobre o olho humano e o processo visual.",

        questions: [

            {
                text:
                    "Qual é a função principal da córnea no processo visual?",

                options: [
                    "Proteger e participar da focalização da luz.",
                    "Produzir lágrimas continuamente.",
                    "Controlar os movimentos das pálpebras.",
                    "Registrar e armazenar as imagens."
                ],

                correct:
                    0,

                explanation:
                    "A córnea participa da focalização da luz e também atua como uma importante estrutura de proteção."

            },

            {
                text:
                    "Qual estrutura é responsável por receber a imagem formada no olho?",

                options: [
                    "A retina.",
                    "A pálpebra.",
                    "A córnea.",
                    "A íris."
                ],

                correct:
                    0,

                explanation:
                    "A retina recebe a imagem e participa da transformação da luz em sinais para o sistema visual."

            },

            {
                text:
                    "Qual é uma das funções das pálpebras?",

                options: [
                    "Distribuir a lágrima sobre a superfície ocular.",
                    "Corrigir a miopia com uma lente negativa.",
                    "Medir a distância pupilar.",
                    "Formar a imagem atrás da retina."
                ],

                correct:
                    0,

                explanation:
                    "O ato de piscar distribui a lágrima, ajuda na hidratação e protege a superfície ocular."

            },

            {
                text:
                    "O cristalino participa principalmente da:",

                options: [
                    "Acomodação e focalização da luz.",
                    "Proteção externa contra poeira.",
                    "Medição da distância naso-pupilar.",
                    "Produção da lágrima."
                ],

                correct:
                    0,

                explanation:
                    "O cristalino altera sua forma para contribuir com a acomodação e a focalização da luz."

            }

        ]

    },


    "ametropias": {

        category:
            "Ametropias",

        title:
            "Ametropias",

        description:
            "Teste seus conhecimentos sobre miopia, hipermetropia, astigmatismo e presbiopia.",

        questions: [

            {
                text:
                    "O que caracteriza uma ametropia?",

                options: [

                    "Um erro refrativo que impede o foco correto na retina.",

                    "Uma infecção exclusiva das pálpebras.",

                    "Uma alteração apenas na cor dos olhos.",

                    "Uma medida usada para ajustar a armação."

                ],

                correct:
                    0,

                explanation:
                    "A ametropia ocorre quando a luz não é focada corretamente na retina."

            },


            {
                text:
                    "Onde a imagem tende a se formar na miopia sem correção?",

                options: [

                    "Antes da retina.",

                    "Atrás da retina.",

                    "Sobre a pálpebra.",

                    "Na superfície da córnea."

                ],

                correct:
                    0,

                explanation:
                    "Na miopia, o foco se forma antes da retina; lentes negativas ajudam a deslocá-lo para a retina."

            },

            {
                text:
                    "Qual lente é usada, em geral, para corrigir a miopia?",

                options: [
                    "Lente negativa ou divergente.",
                    "Lente positiva ou convergente.",
                    "Lente sem potência em todos os casos.",
                    "Filtro sem função óptica."
                ],

                correct:
                    0,

                explanation:
                    "A correção da miopia utiliza lentes negativas, também chamadas divergentes."

            },

            {
                text:
                    "A presbiopia está relacionada principalmente à redução da:",

                options: [
                    "Acomodação visual.",
                    "Proteção das pálpebras.",
                    "Sensibilidade dos cílios.",
                    "Distância entre as pupilas."
                ],

                correct:
                    0,

                explanation:
                    "A presbiopia está relacionada à redução progressiva da capacidade de acomodação para a visão de perto."

            }

        ]

    },


    "dp-dnp": {

        category:
            "Medição",

        title:
            "O que é DP, DNP e Altura",

        description:
            "Revise conceitos relacionados à distância pupilar e à distância naso-pupilar.",

        questions: [

            {
                text:
                    "O que representa a distância pupilar (DP)?",

                options: [

                    "A distância entre as pupilas.",

                    "A distância entre a córnea e a retina.",

                    "A altura total da armação.",

                    "A espessura do centro da lente."

                ],

                correct:
                    0,

                explanation:
                    "A DP é uma medida importante para a centralização das lentes."

            },

            {
                text:
                    "A DNP representa a distância entre:",

                options: [
                    "A referência nasal e a pupila.",
                    "As duas bordas da armação.",
                    "A retina e o cristalino.",
                    "O centro e a borda da lente."
                ],

                correct:
                    0,

                explanation:
                    "A distância naso-pupilar considera a referência nasal até o centro de cada pupila."

            },

            {
                text:
                    "Por que a medição de DP e DNP é importante na montagem?",

                options: [
                    "Para posicionar corretamente o centro óptico da lente.",
                    "Para escolher a cor da armação.",
                    "Para definir o material da pálpebra.",
                    "Para substituir a avaliação visual."
                ],

                correct:
                    0,

                explanation:
                    "Medidas corretas ajudam a relacionar o centro óptico da lente à posição dos olhos."

            },

            {
                text:
                    "Uma medição de DP ou DNP deve ser realizada:",

                options: [
                    "Com atenção à posição do paciente e ao instrumento utilizado.",
                    "Sem observar a posição dos olhos.",
                    "Apenas depois de montar os óculos.",
                    "Somente estimando a medida pela armação."
                ],

                correct:
                    0,

                explanation:
                    "A precisão depende da atenção à posição do paciente e ao uso adequado do instrumento."

            }

        ]

    },


    "montagem": {

        category:
            "Montagem",

        title:
            "Montagem de Óculos",

        description:
            "Teste seus conhecimentos sobre surfaçagem, curvatura e lentes bifocais.",

        questions: [

            {
                text:
                    "O que é surfaçagem?",

                options: [

                    "O processo de trabalhar a superfície da lente.",

                    "A limpeza externa da armação.",

                    "A medição da distância pupilar.",

                    "A aplicação de maquiagem nos olhos."

                ],

                correct:
                    0,

                explanation:
                    "A surfaçagem permite obter as características ópticas necessárias para a utilização da lente."

            },

            {
                text:
                    "A curvatura está relacionada principalmente à:",

                options: [
                    "Superfície óptica da lente.",
                    "Cor da armação.",
                    "Altura da pálpebra.",
                    "Quantidade de cílios."
                ],

                correct:
                    0,

                explanation:
                    "A curvatura é um dos elementos da superfície óptica e influencia o resultado da fabricação."

            },

            {
                text:
                    "Qual é uma característica das lentes bifocais?",

                options:
                    [
                    "Possuem diferentes áreas destinadas à correção visual.",
                    "Corrigem apenas problemas de proteção ocular.",
                    "Não possuem nenhuma área óptica definida.",
                    "São usadas somente para medir a DP."
                ],

                correct:
                    0,

                explanation:
                    "As lentes bifocais possuem áreas distintas para atender diferentes necessidades de visão."

            },

            {
                text:
                    "O bifocal Flat Top é apresentado como:",

                options:
                    [
                    "Um modelo de lente bifocal.",
                    "Um instrumento de medição.",
                    "Uma estrutura do olho.",
                    "Um tipo de lente de contato gelatinosa."
                ],

                correct:
                    0,

                explanation:
                    "O Flat Top é um dos modelos estudados dentro do conteúdo de lentes bifocais."

            }

        ]

    },


    "lendo-uma-receita": {

        category:
            "Receitas",

        title:
            "Lendo uma Receita",

        description:
            "Aprenda a interpretar campos, sinais e abreviações de uma receita oftálmica.",

        questions: [

            {
                text:
                    "O que indica o campo Esférico (ESF) em uma receita?",

                options: [
                    "O grau esférico usado na correção de miopia ou hipermetropia.",
                    "A orientação do astigmatismo em graus.",
                    "A distância entre as pupilas.",
                    "O poder adicional destinado à visão de perto."
                ],

                correct:
                    0,

                explanation:
                    "O campo ESF informa o grau esférico utilizado para corrigir miopia ou hipermetropia."
            },

            {
                text:
                    "Quando existe um valor no campo Cilíndrico (CIL), qual campo também deve aparecer?",

                options: [
                    "Adição.",
                    "Eixo (°).",
                    "Distância pupilar.",
                    "Observações obrigatoriamente."
                ],

                correct:
                    1,

                explanation:
                    "Sempre que há um valor cilíndrico, o eixo indica a orientação do astigmatismo e deve acompanhar a prescrição."
            },

            {
                text:
                    "Uma receita apresenta ESF de -2,00 para longe e adição de +2,50. Qual é o grau esférico para perto?",

                options: [
                    "-4,50.",
                    "+2,50.",
                    "+0,50.",
                    "-0,50."
                ],

                correct:
                    2,

                explanation:
                    "O grau para perto é obtido somando -2,00 a +2,50, resultando em +0,50 no componente esférico."
            },

            {
                text:
                    "Na legenda de abreviações de uma receita, o que significam OD e OE?",

                options: [
                    "Eixo direito e eixo esquerdo.",
                    "Dioptria direita e dioptria esquerda.",
                    "Olho distante e olho externo.",
                    "Olho direito e olho esquerdo."
                ],

                correct:
                    3,

                explanation:
                    "OD significa olho direito e OE significa olho esquerdo; cada olho é avaliado de forma independente."
            }

        ]

    },


    "anatomia": {

        category:
            "Anatomia",

        title:
            "Anatomia",

        description:
            "Estude as principais estruturas do olho humano e suas funções no processo visual.",

        questions: [

            {
                text:
                    "Qual é uma das principais funções da córnea?",

                options: [
                    "Transformar sinais visuais em memórias.",
                    "Permitir a entrada e participar da refração da luz.",
                    "Produzir todas as lágrimas do olho.",
                    "Controlar a abertura da pupila."
                ],

                correct:
                    1,

                explanation:
                    "A córnea permite a entrada e participa da refração da luz, ajudando a direcioná-la para a retina."
            },

            {
                text:
                    "Como as pálpebras contribuem para a proteção ocular?",

                options: [
                    "Elas formam a imagem na retina.",
                    "Elas ajustam a acomodação do cristalino.",
                    "Elas medem a distância pupilar.",
                    "Elas distribuem a lágrima e ajudam a proteger a superfície ocular."
                ],

                correct:
                    3,

                explanation:
                    "O piscar distribui a lágrima, reduz o ressecamento e ajuda a remover pequenas partículas da superfície ocular."
            },

            {
                text:
                    "O cristalino participa principalmente de qual processo?",

                options: [
                    "Produção da camada externa do olho.",
                    "Proteção contra poeira por meio dos cílios.",
                    "Acomodação e ajuste do foco para diferentes distâncias.",
                    "Medição da acuidade visual."
                ],

                correct:
                    2,

                explanation:
                    "O cristalino altera sua forma para ajustar o foco da visão, processo conhecido como acomodação."
            },

            {
                text:
                    "Qual é o papel da retina no processo visual?",

                options: [
                    "Captar a luz e participar da transformação em sinais visuais.",
                    "Unir os dois aros da armação.",
                    "Produzir a lágrima que lubrifica a córnea.",
                    "Determinar o eixo do astigmatismo."
                ],

                correct:
                    0,

                explanation:
                    "A retina é a camada interna que capta a luz e participa da transformação da informação luminosa em sinais visuais."
            }

        ]

    },


    "armacoes": {

        category:
            "Armações",

        title:
            "Armações",

        description:
            "Revise tipos, materiais, partes, medidas e critérios de indicação de armações.",

        questions: [

            {
                text:
                    "O que caracteriza uma armação de aro fechado?",

                options: [
                    "A lente fica presa apenas por um fio de nylon.",
                    "A lente é fixada diretamente nas hastes e na ponte.",
                    "A lente fica totalmente envolvida pela armação.",
                    "A armação não possui ponte nem hastes."
                ],

                correct:
                    2,

                explanation:
                    "No aro fechado, a lente fica totalmente envolvida pela armação, formando uma opção resistente e tradicional."
            },

            {
                text:
                    "Qual material é flexível, leve e resistente a impactos, sendo indicado também para crianças e esportistas?",

                options: [
                    "Acetato.",
                    "Aço inox.",
                    "Titânio.",
                    "TR90."
                ],

                correct:
                    3,

                explanation:
                    "O TR90 é descrito como flexível, leve e resistente a impactos, características úteis para crianças e esportistas."
            },

            {
                text:
                    "Na medida 52 □ 18 - 140, o que representa o número 18?",

                options: [
                    "A largura horizontal da lente.",
                    "A distância da ponte entre as lentes.",
                    "O comprimento da haste.",
                    "A espessura do aro."
                ],

                correct:
                    1,

                explanation:
                    "Na sequência de medidas, 18 mm representa a ponte, ou seja, a distância entre as lentes."
            },

            {
                text:
                    "Qual orientação é apresentada para a escolha de armação em casos de miopia alta?",

                options: [
                    "Preferir aro fechado e lentes menores.",
                    "Escolher sempre uma armação sem aro.",
                    "Usar apenas armações muito pequenas para progressivas.",
                    "Ignorar conforto e adaptação ao rosto."
                ],

                correct:
                    0,

                explanation:
                    "Para miopia alta, o conteúdo recomenda aro fechado; lentes menores ajudam a reduzir a percepção de espessura."
            }

        ]

    },


    "lentes-contato": {

        category:
            "Lentes de Contato",

        title:
            "Lentes de Contato",

        description:
            "Teste seus conhecimentos sobre adaptação, cuidados e avaliação da acuidade visual.",

        questions: [

            {
                text:
                    "Em qual situação as lentes rígidas gás permeáveis (RGP) são especialmente indicadas no conteúdo?",

                options: [
                    "Somente para uso cosmético, sem finalidade óptica.",
                    "Para ametropias associadas a irregularidades corneanas.",
                    "Apenas para substituir a avaliação de acuidade visual.",
                    "Exclusivamente para pessoas que não precisam de correção."
                ],

                correct:
                    1,

                explanation:
                    "As lentes RGP são apresentadas como opção para irregularidades corneanas, como astigmatismo irregular e ceratocone."
            },

            {
                text:
                    "Qual é um objetivo da anamnese antes da adaptação de lentes de contato?",

                options: [
                    "Coletar condições oculares e sistêmicas e identificar possíveis contraindicações.",
                    "Definir a cor da armação dos óculos.",
                    "Substituir todos os exames e avaliações profissionais.",
                    "Aumentar o tempo de uso sem considerar o fabricante."
                ],

                correct:
                    0,

                explanation:
                    "A anamnese coleta informações relevantes, identifica possíveis contraindicações e ajuda a selecionar uma lente adequada."
            },

            {
                text:
                    "Qual conduta é recomendada antes de manipular lentes de contato?",

                options: [
                    "Usar água do banho para enxaguar as lentes.",
                    "Compartilhar o estojo com outra pessoa.",
                    "Dormir com as lentes sem orientação profissional.",
                    "Higienizar e secar adequadamente as mãos."
                ],

                correct:
                    3,

                explanation:
                    "A higiene e a secagem das mãos devem ser realizadas antes de manipular as lentes para reduzir riscos de contaminação."
            },

            {
                text:
                    "Qual tabela é composta por caracteres alfabéticos e é usada na avaliação da acuidade visual para longe?",

                options: [
                    "Tabela LEA.",
                    "Tabela de Jaeger.",
                    "Tabela de Snellen.",
                    "Tabela Tumbling."
                ],

                correct:
                    2,

                explanation:
                    "A Tabela de Snellen utiliza caracteres alfabéticos padronizados para avaliar a acuidade visual para longe em pacientes alfabetizados."
            }

        ]

    },


    "patologias": {

        category:
            "Patologias",

        title:
            "Patologias",

        description:
            "Revise conceitos introdutórios sobre alterações relacionadas à saúde ocular.",

        questions: [

            {
                text:
                    "Qual é o objetivo principal do conteúdo introdutório sobre patologias?",

                options: [
                    "Prescrever tratamentos individualizados.",
                    "Substituir a avaliação de um profissional habilitado.",
                    "Definir um diagnóstico a partir de qualquer sintoma.",
                    "Apresentar conceitos educacionais sobre alterações do sistema visual."
                ],

                correct:
                    3,

                explanation:
                    "O conteúdo tem finalidade educacional e introdutória; ele não substitui diagnóstico ou acompanhamento profissional."
            },

            {
                text:
                    "Por que a observação de sinais e sintomas é importante?",

                options: [
                    "Pode contribuir para identificar situações que necessitem de avaliação especializada.",
                    "Garante um diagnóstico sem outros procedimentos.",
                    "Elimina a necessidade de acompanhamento profissional.",
                    "Define sozinha a causa da alteração visual."
                ],

                correct:
                    0,

                explanation:
                    "A observação pode ajudar a reconhecer situações que precisam de avaliação especializada, mas não substitui essa avaliação."
            },

            {
                text:
                    "Qual alternativa apresenta apenas exemplos de alterações visuais citadas no conteúdo?",

                options: [
                    "Apenas mudança na cor da armação e dor nas hastes.",
                    "Somente alteração no comprimento dos cílios.",
                    "Redução da acuidade visual, alterações no campo visual e distorções na percepção.",
                    "Apenas aumento da distância pupilar."
                ],

                correct:
                    2,

                explanation:
                    "O conteúdo cita redução da acuidade visual, alterações no campo visual, distorções na percepção e mudanças na sensibilidade visual."
            },

            {
                text:
                    "O que deve orientar uma avaliação adequada de uma alteração visual?",

                options: [
                    "Somente a preferência do usuário.",
                    "As características apresentadas e os procedimentos apropriados para cada situação.",
                    "Apenas uma comparação com sintomas de outra pessoa.",
                    "Somente a escolha de uma lente sem avaliação."
                ],

                correct:
                    1,

                explanation:
                    "A avaliação depende das características apresentadas e dos procedimentos apropriados; o conteúdo não substitui acompanhamento profissional."
            }

        ]

    }

};


quizzesReady = true;

pendingQuizOperations.forEach(
    (operation) => operation()
);

function applyContentAlignedQuizQuestions() {

    const contentAlignedQuestions = {

        "fundamentos-optica": [
            ["Qual estrutura transparente fica na parte frontal do olho e ajuda a focalizar a luz?", ["Córnea.", "Retina.", "Humor vítreo.", "Esclera."], 0, "A córnea permite a entrada da luz e participa de grande parte da focalização."],
            ["Qual estrutura capta a luz e transforma a informação visual em impulsos nervosos?", ["Retina.", "Íris.", "Pálpebra.", "Conjuntiva."], 0, "A retina contém fotorreceptores e envia informações visuais ao cérebro."],
            ["Qual estrutura ajusta o foco para objetos próximos e distantes?", ["Cristalino.", "Esclera.", "Pupila.", "Cílios."], 0, "O cristalino muda sua forma no processo de acomodação."],
            ["O que a íris controla no processo visual?", ["A quantidade de luz que entra pela pupila.", "A marcação da lente no lensômetro.", "A distância entre as pupilas.", "O comprimento da haste."], 0, "A íris altera o tamanho da pupila conforme a iluminação."],
            ["Qual função das pálpebras é destacada no conteúdo?", ["Distribuir a lágrima e proteger a superfície ocular.", "Definir o eixo do astigmatismo.", "Produzir o grau esférico.", "Formar as imagens na retina."], 0, "As pálpebras ajudam na proteção, hidratação e limpeza da superfície ocular."],
            ["Qual é a função da esclera?", ["Proteger e dar sustentação ao globo ocular.", "Regular a entrada de luz.", "Avaliar a visão de perto.", "Corrigir miopia."], 0, "A esclera é a parte branca e resistente que sustenta e protege o olho."]
        ],

        "ametropias": [
            ["O que é uma ametropia?", ["Um erro refrativo em que a luz não focaliza corretamente na retina.", "Uma infecção das glândulas da pálpebra.", "Uma medida da armação gravada na haste.", "Um tipo de tabela optométrica."], 0, "Ametropias são alterações refrativas que prejudicam o foco correto na retina."],
            ["Na miopia sem correção, onde a imagem tende a se formar?", ["Antes da retina.", "Atrás da retina.", "No cristalino sem passar pela córnea.", "Na parte externa da pálpebra."], 0, "Na miopia, o foco se forma antes da retina."],
            ["Qual lente é usada em geral para corrigir a miopia?", ["Lente negativa ou divergente.", "Lente positiva ou convergente.", "Lente sem potência.", "Apenas lente bifocal sem grau."], 0, "A lente negativa ajuda a deslocar o foco para a retina."],
            ["Na hipermetropia, o foco tende a se formar:", ["Atrás da retina.", "Antes da retina.", "No eixo da armação.", "Na superfície da lente já montada."], 0, "Na hipermetropia, o foco tende a ficar teoricamente atrás da retina."],
            ["O astigmatismo está relacionado principalmente a:", ["Irregularidade na curvatura da córnea ou do cristalino.", "Obstrução de glândulas palpebrais.", "Medida da ponte da armação.", "Uso exclusivo da Tabela de Jaeger."], 0, "O astigmatismo ocorre por curvaturas diferentes que formam focos distintos."],
            ["A presbiopia, ou vista cansada, ocorre pela redução da:", ["Capacidade de acomodação visual.", "Distância pupilar.", "Espessura da armação.", "Produção de optotipos."], 0, "A presbiopia está ligada à perda progressiva da acomodação, comum a partir dos 40 anos."]
        ],

        "dp-dnp": [
            ["O que significa DP?", ["Distância entre o centro da pupila direita e o centro da pupila esquerda.", "Distância entre a córnea e o cristalino.", "Dioptria de perto.", "Diâmetro da ponte da armação."], 0, "DP é a distância pupilar medida entre as duas pupilas."],
            ["O que significa DNP?", ["Distância do centro do nariz até o centro de cada pupila.", "Distância entre a retina e a lente.", "Diâmetro nasal da plaqueta.", "Dados necessários da prescrição."], 0, "DNP é a distância naso-pupilar, medida separadamente em cada olho."],
            ["Por que medir a DNP de cada olho separadamente?", ["Porque o rosto pode apresentar pequenas assimetrias.", "Porque a DP não pode ser medida em milímetros.", "Porque substitui a receita oftálmica.", "Porque define o material da lente."], 0, "A medida monocular ajuda a alinhar o centro óptico com cada pupila."],
            ["Qual é o objetivo de alinhar o centro óptico da lente com a pupila?", ["Direcionar a luz corretamente e melhorar conforto e nitidez.", "Escolher a cor da armação.", "Evitar a leitura da OS.", "Alterar o grau da receita."], 0, "O alinhamento correto favorece visão mais nítida, confortável e precisa."],
            ["Antes de medir altura em lentes multifocais, a armação deve estar:", ["Ajustada no rosto como será usada.", "Sem hastes e sem plaquetas.", "Apenas escolhida pela cor.", "Com a lente já cortada definitivamente."], 0, "A altura depende do posicionamento real da armação no rosto."],
            ["Uma medição incorreta de DP ou DNP pode causar:", ["Desconforto, dor de cabeça ou visão embaçada.", "Aumento automático da durabilidade da lente.", "Melhora da adaptação sem ajuste.", "Troca do tipo de conjuntiva."], 0, "A centralização inadequada prejudica conforto e desempenho visual."]
        ],

        "montagem": [
            ["Qual documento reúne as informações necessárias para executar a montagem?", ["Ordem de Serviço (OS).", "Tabela de Jaeger.", "Teste bicromático.", "Cartão de garantia da armação."], 0, "A OS contém identificação, receita e especificações técnicas do serviço."],
            ["Durante a lensometria, o lensômetro é usado para:", ["Conferir o grau das lentes e realizar a marcação.", "Medir a pressão intraocular.", "Avaliar a lágrima antes da lente de contato.", "Escolher o formato do rosto."], 0, "O lensômetro confere valores esféricos, cilíndricos e eixo antes da montagem."],
            ["No lensômetro, a letra S representa:", ["Valor esférico.", "Secreção ocular.", "Sistema de secagem.", "Suporte nasal."], 0, "No conteúdo de montagem, S indica o valor esférico da lente."],
            ["Em lentes cilíndricas, o que deve ser encontrado antes da marcação?", ["O eixo correto.", "A cor da haste.", "O tipo de cílio.", "O valor da ponte da armação."], 0, "A lente deve ser girada até encontrar o eixo correto."],
            ["Nas lentes multifocais, os círculos gravados ajudam a identificar:", ["O tipo de lente, o posicionamento e o valor da adição.", "A presença de conjuntivite.", "A largura horizontal da armação.", "A direção da abertura da Tabela Tumbling."], 0, "As marcações de multifocais orientam posicionamento e identificação da ADD."],
            ["Qual equipamento realiza o corte das lentes no formato da armação?", ["Facetadora.", "Lensômetro.", "Tabela optométrica.", "Lâmpada de fenda."], 0, "A facetadora usina a lente conforme o formato da armação."]
        ],

        "lendo-uma-receita": [
            ["O que o campo ESF indica em uma receita?", ["A potência esférica da lente.", "A orientação do cilindro em graus.", "A medida da ponte.", "O tipo de material da armação."], 0, "ESF indica a potência principal para correção de miopia ou hipermetropia."],
            ["O sinal negativo no valor esférico costuma indicar correção de:", ["Miopia.", "Hipermetropia.", "Calázio.", "Pterígio."], 0, "No conteúdo, o sinal negativo está ligado à correção da miopia."],
            ["O cilindro representa a correção de qual ametropia?", ["Astigmatismo.", "Presbiopia apenas.", "Miopia sem qualquer eixo.", "Olho seco."], 0, "O CIL representa a correção cilíndrica usada no astigmatismo."],
            ["Quando existe cilindro na receita, qual informação deve acompanhá-lo?", ["Eixo em graus.", "Cor da lente.", "Comprimento da haste.", "Tabela usada no exame."], 0, "O eixo orienta a correção cilíndrica e varia de 0° a 180°."],
            ["Para obter o esférico de perto quando há ADD, deve-se:", ["Somar a adição ao esférico de longe.", "Subtrair o eixo do cilindro.", "Trocar OD por OE.", "Dividir a DNP pela ponte."], 0, "A adição é somada ao componente esférico de longe."],
            ["O que significam OD e OE?", ["Olho direito e olho esquerdo.", "Óptica diária e óptica externa.", "Ordem de serviço e eixo.", "Olho distante e olho esférico."], 0, "OD e OE identificam os olhos separadamente na receita."]
        ],

        "anatomia": [
            ["Onde ficam os cílios e qual é sua função principal?", ["Na borda das pálpebras, protegendo contra poeira e agentes externos.", "Na retina, formando cores.", "No cristalino, mudando o foco.", "Na ponte da armação, apoiando a lente."], 0, "Os cílios funcionam como barreira protetora e são sensíveis ao toque."],
            ["Qual estrutura produz lágrimas importantes para hidratação e proteção?", ["Glândulas lacrimais.", "Esclera.", "Pupila.", "Humor vítreo."], 0, "As glândulas lacrimais produzem lágrimas que lubrificam e protegem."],
            ["A conjuntiva recobre principalmente:", ["A parte branca do olho e a região interna das pálpebras.", "O centro da lente multifocal.", "A haste da armação.", "O campo de adição da receita."], 0, "A conjuntiva ajuda a proteger e lubrificar a superfície ocular."],
            ["O humor aquoso ajuda a manter:", ["A nutrição de estruturas anteriores e a pressão intraocular.", "A distância naso-pupilar.", "O tamanho da haste.", "A direção dos optotipos."], 0, "O humor aquoso nutre estruturas e participa do equilíbrio da pressão intraocular."],
            ["O humor vítreo ocupa a parte interna do olho entre:", ["O cristalino e a retina.", "A ponte e a haste.", "A córnea e a lente dos óculos.", "O cílio e a sobrancelha."], 0, "O humor vítreo é uma substância gelatinosa entre cristalino e retina."],
            ["Quais células da retina são citadas como fotorreceptores?", ["Bastonetes e cones.", "Plaquetas e hastes.", "Cílios e sobrancelhas.", "Eixos e cilindros."], 0, "Bastonetes atuam mais em baixa iluminação; cones participam das cores e detalhes."]
        ],

        "armacoes": [
            ["O que é uma armação de óculos?", ["Estrutura que sustenta lentes corretivas ou solares.", "Equipamento usado para medir o grau da lente.", "Tabela usada para visão de perto.", "Membrana que recobre a esclera."], 0, "A armação sustenta as lentes e deve unir estética, conforto e adaptação."],
            ["No aro fechado, a lente fica:", ["Totalmente envolvida pela armação.", "Presa apenas por fio de nylon na parte inferior.", "Fixada diretamente só pelas hastes.", "Sem nenhum apoio frontal."], 0, "O aro fechado envolve toda a lente e é comum no uso diário."],
            ["Qual material é descrito como premium, muito leve e resistente?", ["Titânio.", "Acetato.", "Nylon.", "Papel descartável."], 0, "O titânio é indicado para quem é sensível ao peso e para uso prolongado."],
            ["Na medida 52 □ 18 - 140, o número 52 indica:", ["Calibre da lente, ou largura horizontal da lente.", "Ponte entre as lentes.", "Comprimento da haste.", "Altura da lente progressiva."], 0, "O conteúdo define 52 mm como calibre/largura horizontal da lente."],
            ["Para miopia alta, qual orientação aparece no conteúdo?", ["Preferir aro fechado e lentes menores.", "Usar sempre armação sem aro.", "Escolher somente pela cor.", "Evitar qualquer ajuste no rosto."], 0, "Lentes menores ajudam a reduzir a percepção de espessura em miopia alta."],
            ["Para lentes progressivas, a armação deve evitar:", ["Altura de lente muito pequena.", "Qualquer ponte nasal.", "Aro fechado em todos os casos.", "Medidas gravadas na haste."], 0, "Progressivas precisam de altura suficiente para favorecer adaptação."]
        ],

        "lentes-contato": [
            ["Onde as lentes de contato são usadas?", ["Diretamente na superfície corneana.", "Apenas na haste da armação.", "Sobre a pálpebra fechada.", "Dentro do lensômetro."], 0, "O conteúdo define lentes de contato como dispositivos usados na superfície corneana."],
            ["Quais categorias principais de lentes são apresentadas?", ["Rígidas gás permeáveis e gelatinosas.", "Aro fechado e meio aro.", "Snellen e Jaeger.", "Córnea e esclera."], 0, "O material apresenta RGP e lentes gelatinosas como categorias principais."],
            ["Qual é o objetivo da anamnese antes da adaptação?", ["Coletar informações oculares e sistêmicas e identificar contraindicações.", "Substituir todos os exames profissionais.", "Definir a cor da armação.", "Eliminar a necessidade de higiene."], 0, "A anamnese orienta segurança, conforto e escolha adequada da lente."],
            ["Por que a transmissibilidade ao oxigênio é importante?", ["Porque a córnea depende do oxigênio do ambiente externo.", "Porque muda a ponte da armação.", "Porque define a Tabela de Jaeger.", "Porque substitui a limpeza diária."], 0, "A córnea é avascular e precisa de adequada oxigenação."],
            ["Qual solução exige neutralização antes da inserção das lentes?", ["Peróxido de hidrogênio.", "Água da torneira.", "Soro fisiológico comum.", "Sabonete neutro puro."], 0, "O peróxido faz desinfecção profunda e exige neutralização conforme o fabricante."],
            ["Qual conduta não é recomendada no uso de lentes de contato?", ["Utilizar lentes durante banho, piscina, mar ou chuveiro.", "Lavar e secar as mãos antes do manuseio.", "Trocar a solução diariamente.", "Manter o estojo aberto para secagem."], 0, "Água em banho, piscina, mar ou chuveiro aumenta risco de contaminação."]
        ],

        "patologias": [
            ["Qual é a finalidade do conteúdo de patologias na plataforma?", ["Auxiliar a reconhecer sinais que precisam de encaminhamento ao especialista.", "Ensinar automedicação para cada sintoma.", "Substituir consulta com oftalmologista.", "Definir grau de óculos sem avaliação."], 0, "O conteúdo é educacional e reforça encaminhamento ao especialista."],
            ["O hordéolo é descrito como:", ["Inflamação na pálpebra causada por infecção nas glândulas sebáceas.", "Opacificação do cristalino pelo envelhecimento.", "Alteração da curvatura da córnea.", "Perda de visão periférica por pressão ocular."], 0, "O hordéolo pode ser externo ou interno e envolve infecção em glândulas da pálpebra."],
            ["O calázio ocorre principalmente por:", ["Obstrução das glândulas responsáveis pela produção de óleo.", "Aumento súbito da DNP.", "Uso de tabela de longe.", "Troca do valor de ADD."], 0, "O calázio é uma inflamação não infecciosa ligada à obstrução glandular."],
            ["A catarata acontece quando:", ["O cristalino perde sua transparência.", "A ponte da armação fica curta.", "A lente de contato fica rígida.", "A pupila mede menos que a DNP."], 0, "A catarata dificulta a passagem da luz por opacificação do cristalino."],
            ["O glaucoma está associado no conteúdo a:", ["Aumento da pressão intraocular e dano ao nervo óptico.", "Apenas coceira alérgica sem risco visual.", "Formato oval da córnea sem pressão ocular.", "Medida 52 □ 18 - 140."], 0, "O glaucoma pode comprometer a visão por dano ao nervo óptico."],
            ["O ceratocone afeta qual estrutura?", ["Córnea.", "Cristalino.", "Haste.", "Tabela de Snellen."], 0, "O ceratocone deixa a córnea mais fina e irregular, causando visão distorcida."]
        ],

        "interpretacao-de-receita": [
            ["Quais campos comuns aparecem em uma receita oftálmica segundo o conteúdo?", ["Esférico, cilíndrico, eixo, adição e observações.", "Ponte, haste, charneira e terminal.", "Snellen, Tumbling, LEA e Jaeger.", "Hordéolo, calázio, catarata e glaucoma."], 0, "A estrutura da receita reúne os dados necessários para correção visual."],
            ["Em que unidade os valores da receita normalmente são expressos?", ["Dioptrias, em intervalos de 0,25.", "Milímetros de haste.", "Porcentagem de oxigenação apenas.", "Graus de abertura da pupila."], 0, "O conteúdo informa que as medidas normalmente são em dioptrias, com intervalos de 0,25."],
            ["Quando há diferença de grau entre os olhos, essa condição é chamada:", ["Anisometropia.", "Ambliopia.", "Pterígio.", "Surfaçagem."], 0, "O módulo cita anisometropia para diferença de grau entre os olhos."],
            ["O eixo do cilindro varia de:", ["0° a 180°.", "0° a 90° apenas.", "18 mm a 140 mm.", "20/20 a 20/200."], 0, "O eixo informa a orientação da correção cilíndrica em graus, de 0° a 180°."],
            ["Na adição, o que permanece inalterado ao calcular o perto?", ["Cilindro e eixo.", "Ponte e haste.", "Cílios e pálpebras.", "Tabela e distância do exame."], 0, "O conteúdo diz que cilindro e eixo permanecem inalterados."],
            ["Antes de encaminhar a montagem, deve-se conferir:", ["Identificação, olho correspondente, sinais, valores, eixo e adição.", "Apenas a cor da armação.", "Somente o nome da tabela usada.", "Somente a marca do estojo."], 0, "A conferência evita erro de olho, sinal, valores, eixo e adição."]
        ],

        "acuidade-visual": [
            ["O que é acuidade visual?", ["Capacidade funcional de identificar, discriminar e perceber detalhes com nitidez.", "Medida da distância da ponte.", "Processo de corte das lentes.", "Inflamação das glândulas sebáceas."], 0, "A AV avalia a capacidade de perceber detalhes em diferentes distâncias."],
            ["Como a acuidade visual é avaliada no conteúdo?", ["Por tabelas optométricas padronizadas.", "Pela medida 52 □ 18 - 140.", "Pela escolha do material da armação.", "Pela limpeza do estojo de lentes."], 0, "A avaliação usa tabelas optométricas como Snellen e outros optotipos."],
            ["Qual distância padronizada é citada para o exame?", ["6 metros ou 20 pés.", "18 mm.", "140 mm.", "0,25 dioptria."], 0, "O procedimento cita posicionamento a 6 metros, equivalente a 20 pés."],
            ["O exame é realizado de forma monocular quando:", ["Um olho é ocluído por vez.", "Os dois olhos ficam fechados.", "A lente é cortada na facetadora.", "A armação é desmontada."], 0, "A avaliação monocular observa um olho por vez."],
            ["A Tabela Tumbling utiliza:", ["A optotipia E em diferentes orientações.", "Textos para visão próxima.", "Somente letras alfabéticas padronizadas.", "Círculos gravados de lentes multifocais."], 0, "Na Tumbling, o paciente indica a direção da abertura do E."],
            ["A Tabela de Jaeger é utilizada principalmente para:", ["Avaliação da acuidade visual de perto.", "Corte de lentes em facetadora.", "Identificação da DNP.", "Diagnóstico de catarata."], 0, "Jaeger é uma tabela de visão próxima."]
        ],

        "surfacagem-multifocal-bifocal": [
            ["O que é surfaçagem?", ["Processo de trabalho da superfície da lente para obter características ópticas.", "Leitura dos menores optotipos visíveis.", "Inflamação não infecciosa da pálpebra.", "Medida entre as pupilas."], 0, "Surfaçagem trabalha a superfície da lente conforme a prescrição."],
            ["A definição da superfície influencia principalmente:", ["As zonas de visão e a adaptação do usuário.", "A cor da íris.", "O comprimento dos cílios.", "A senha de acesso à plataforma."], 0, "Superfícies bifocais e multifocais influenciam zonas de visão e adaptação."],
            ["A curvatura da superfície deve ser compatível com:", ["O projeto da lente e a finalidade da correção.", "A cor do estojo.", "A idade do cadastro.", "O formato da sobrancelha."], 0, "A curvatura participa do comportamento óptico da lente."],
            ["O que caracteriza uma lente bifocal?", ["Zonas destinadas a diferentes distâncias de visão.", "Uma única potência sem área para perto.", "Uso apenas sem prescrição.", "Ausência de desenho para perto."], 0, "Bifocais reúnem zonas de visão em uma mesma lente."],
            ["Nas lentes bifocais, o desenho da área para perto varia conforme:", ["O modelo escolhido.", "A cor da armação.", "A direção do optotipo E.", "O tipo de conjuntivite."], 0, "O conteúdo destaca que o desenho da área de perto muda conforme o modelo."],
            ["O que caracteriza uma lente multifocal?", ["Progressão de potências para diferentes distâncias de visão.", "Apenas visão de longe sem transição.", "Corte sem projeto óptico.", "Uso exclusivo como lente de contato."], 0, "Multifocais apresentam progressão de potências."]
        ]

    };


    Object.entries(
        contentAlignedQuestions
    ).forEach(
        (
            [
                quizId,
                questions
            ]
        ) => {

            if (!QUIZ_DATA[quizId]) {

                return;

            }


            QUIZ_DATA[quizId].questions =
                questions.map(
                    ([text, options, correct, explanation]) =>
                        createQuestion(
                            text,
                            options,
                            correct,
                            explanation
                        )
                );

        }
    );

}

applyContentAlignedQuizQuestions();

rebalanceQuizAnswers();


/* ==========================================================================
   Estado
========================================================================== */

let currentQuiz = null;

let currentQuizId = null;

let currentQuestionIndex = 0;

let answers = [];

let attemptId = null;


/* ==========================================================================
   Sessão
========================================================================== */

async function getCurrentUser() {

    return window.VisiumAuth?.getCurrentUser() || null;

}


async function requireAuthentication() {

    const user =
        await getCurrentUser();


    if (!user) {

        window.location.href =
            "/pages/auth/login/login.html";


        return null;

    }


    return user;

}


/* ==========================================================================
   Identificação do usuário
========================================================================== */

function getStoredUser() {

    return window.VisiumStorage?.getStoredUser?.() || null;

}


function getUserKey(
    user
) {

    return window.VisiumStorage?.getUserKey?.(user) || "anonymous";

}


function getSafeStorageKey(
    value
) {

    return window.VisiumStorage?.getSafeStorageKey?.(value) || encodeURIComponent(String(value));

}


/* ==========================================================================
   Query String
========================================================================== */

function getQuizId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "quiz"
    );

}

function getQuizMode() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "mode"
    ) || "continue";

}

/* ==========================================================================
   Chaves de armazenamento
========================================================================== */

function getAttemptStorageKey() {

    return [
        "visium_quiz_attempt",
        getSafeStorageKey(
            getUserKey(
                getStoredUser()
            )
        ),
        getSafeStorageKey(
            currentQuizId
        )
    ].join(
        "_"
    );

}


function getHistoryStorageKey() {

    return [
        "visium_quiz_history",
        getSafeStorageKey(
            getUserKey(
                getStoredUser()
            )
        )
    ].join(
        "_"
    );

}


/* ==========================================================================
   Component Loader
========================================================================== */

async function loadComponent(
    selector,
    path
) {

    const container =
        document.querySelector(
            selector
        );


    if (!container) {

        return false;

    }


    try {

        const response =
            await fetch(
                path
            );


        if (!response.ok) {

            throw new Error(
                `Não foi possível carregar ${path}.`
            );

        }


        container.innerHTML =
            await response.text();


        return true;

    } catch (error) {

        console.error(
            "Visium | Erro ao carregar componente:",
            error
        );


        return false;

    }

}

/* ==========================================================================
   Elementos
========================================================================== */

function getElements() {

    return {

        category:
            document.querySelector(
                "#quizCategory"
            ),

        title:
            document.querySelector(
                "#quizTitle"
            ),

        description:
            document.querySelector(
                "#quizDescription"
            ),

        questionNumber:
            document.querySelector(
                "#questionNumber"
            ),

        score:
            document.querySelector(
                "#quizScore"
            ),

        progressText:
            document.querySelector(
                "#quizProgressText"
            ),

        progressFill:
            document.querySelector(
                "#quizProgressFill"
            ),

        questionText:
            document.querySelector(
                "#questionText"
            ),

        options:
            document.querySelector(
                "#quizOptions"
            ),

        feedback:
            document.querySelector(
                "#quizFeedback"
            ),

        feedbackTitle:
            document.querySelector(
                "#feedbackTitle"
            ),

        feedbackMessage:
            document.querySelector(
                "#feedbackMessage"
            ),

        previous:
            document.querySelector(
                "#previousQuestion"
            ),

        next:
            document.querySelector(
                "#nextQuestion"
            ),

        quizCard:
            document.querySelector(
                "#quizCard"
            ),

        result:
            document.querySelector(
                "#quizResult"
            ),

        resultMessage:
            document.querySelector(
                "#resultMessage"
            ),

        resultScore:
            document.querySelector(
                "#resultScore"
            ),

        resultCorrect:
            document.querySelector(
                "#resultCorrect"
            ),

        resultWrong:
            document.querySelector(
                "#resultWrong"
            ),

        resultTotal:
            document.querySelector(
                "#resultTotal"
            ),

        restart:
            document.querySelector(
                "#restartQuiz"
            )

    };

}


/* ==========================================================================
   Validação do quiz
========================================================================== */

function isValidQuestion(
    question
) {

    if (
        !question ||
        typeof question.text !== "string" ||
        !Array.isArray(
            question.options
        ) ||
        !question.options.length
    ) {

        return false;

    }


    if (
        !Number.isInteger(
            question.correct
        )
    ) {

        return false;

    }


    if (
        question.correct < 0 ||
        question.correct >=
        question.options.length
    ) {

        return false;

    }


    return true;

}


function isValidQuiz(
    quiz
) {

    if (
        !quiz ||
        !Array.isArray(
            quiz.questions
        ) ||
        !quiz.questions.length
    ) {

        return false;

    }


    return quiz.questions.every(
        isValidQuestion
    );

}


/* ==========================================================================
   Cabeçalho
========================================================================== */

function renderQuizHeader() {

    const elements =
        getElements();


    elements.category.textContent =
        currentQuiz.category;


    elements.title.textContent =
        currentQuiz.title;


    elements.description.textContent =
        currentQuiz.description;

}


/* ==========================================================================
   Estado das respostas
========================================================================== */

function createEmptyAnswerState() {

    return currentQuiz.questions.map(
        () => null
    );

}


function normalizeAnswerState(
    storedAnswers
) {

    if (
        !Array.isArray(
            storedAnswers
        )
    ) {

        return createEmptyAnswerState();

    }


    return currentQuiz.questions.map(
        (
            question,
            index
        ) => {

            const stored =
                storedAnswers[index];


            if (
                !stored ||
                !Number.isInteger(
                    stored.selected
                )
            ) {

                return null;

            }


            if (
                stored.selected < 0 ||
                stored.selected >=
                question.options.length
            ) {

                return null;

            }


            return {

                selected:
                    stored.selected,

                confirmed:
                    Boolean(
                        stored.confirmed
                    ),

                correct:
                    Boolean(
                        stored.correct
                    )

            };

        }
    );

}


/* ==========================================================================
   Tentativa
========================================================================== */

function createAttemptId() {

    return [
        Date.now(),
        Math.random()
            .toString(
                36
            )
            .slice(
                2,
                10
            )
    ].join(
        "-"
    );

}


function createAttemptState() {

    return {

        version:
            QUIZ_DATA_VERSION,

        attemptId:
            createAttemptId(),

        quizId:
            currentQuizId,

        currentQuestionIndex:
            0,

        answers:
            createEmptyAnswerState(),

        startedAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };

}


function saveAttempt() {

    if (
        !currentQuiz ||
        !currentQuizId
    ) {

        return;

    }


    const attempt = {

        version:
            QUIZ_DATA_VERSION,

        attemptId,

        quizId:
            currentQuizId,

        currentQuestionIndex,

        answers,

        startedAt:
            window.__visiumQuizStartedAt ||
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        getAttemptStorageKey(),
        JSON.stringify(
            attempt
        )
    );

}


function loadAttempt() {

    const stored =
        localStorage.getItem(
            getAttemptStorageKey()
        );


    if (!stored) {

        return false;

    }


    try {

        const parsed =
            JSON.parse(
                stored
            );


        if (
            !parsed ||
            parsed.quizId !==
            currentQuizId ||
            parsed.version !==
            QUIZ_DATA_VERSION
        ) {

            localStorage.removeItem(
                getAttemptStorageKey()
            );

            return false;

        }


        answers =
            normalizeAnswerState(
                parsed.answers
            );


        currentQuestionIndex =
            Number.isInteger(
                parsed.currentQuestionIndex
            )
                ? Math.min(
                    Math.max(
                        parsed.currentQuestionIndex,
                        0
                    ),
                    currentQuiz.questions.length - 1
                )
                : 0;


        attemptId =
            parsed.attemptId ||
            createAttemptId();


        window.__visiumQuizStartedAt =
            parsed.startedAt ||
            new Date().toISOString();


        return true;

    } catch (error) {

        console.error(
            "Visium | Tentativa inválida:",
            error
        );


        localStorage.removeItem(
            getAttemptStorageKey()
        );


        return false;

    }

}


function clearAttempt() {

    localStorage.removeItem(
        getAttemptStorageKey()
    );

}


/* ==========================================================================
   Estado da questão atual
========================================================================== */

function getCurrentAnswer() {

    return (
        answers[
        currentQuestionIndex
        ] ||
        null
    );

}


function calculateScore() {

    return answers.reduce(
        (
            total,
            answer
        ) => {

            if (
                answer &&
                answer.confirmed &&
                answer.correct
            ) {

                return total + 1;

            }


            return total;

        },
        0
    );

}


/* ==========================================================================
   Progresso
========================================================================== */

function updateProgress() {

    const elements =
        getElements();


    const total =
        currentQuiz.questions.length;


    const current =
        currentQuestionIndex + 1;


    const percentage =
        Math.round(
            (current / total) * 100
        );


    elements.questionNumber.textContent =
        `${current} de ${total}`;


    elements.progressText.textContent =
        `${percentage}%`;


    elements.progressFill.style.width =
        `${percentage}%`;


    elements.score.textContent =
        calculateScore();

}


/* ==========================================================================
   Feedback
========================================================================== */

function hideFeedback() {

    const elements =
        getElements();


    elements.feedback.hidden =
        true;


    elements.feedback.classList.remove(
        "is-correct",
        "is-wrong"
    );


    elements.feedbackTitle.textContent =
        "";


    elements.feedbackMessage.textContent =
        "";

}


/* ==========================================================================
   Estado visual das alternativas
========================================================================== */

function renderOptionState(
    question,
    answer
) {

    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        (button) => {

            const index =
                Number(
                    button.dataset.index
                );


            button.classList.remove(
                "is-selected",
                "is-correct",
                "is-wrong"
            );


            button.disabled =
                false;


            if (
                answer &&
                answer.selected === index
            ) {

                button.classList.add(
                    "is-selected"
                );

            }


            if (
                answer &&
                answer.confirmed
            ) {

                button.disabled =
                    true;


                if (
                    index ===
                    question.correct
                ) {

                    button.classList.add(
                        "is-correct"
                    );

                }


                if (
                    index ===
                    answer.selected &&
                    !answer.correct
                ) {

                    button.classList.add(
                        "is-wrong"
                    );

                }

            }

        }
    );

}


/* ==========================================================================
   Renderização da questão
========================================================================== */

function renderQuestion() {

    const elements =
        getElements();


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (!question) {

        finishQuiz();

        return;

    }


    elements.questionText.textContent =
        question.text;


    elements.options.innerHTML =
        "";


    hideFeedback();


    const answer =
        getCurrentAnswer();


    elements.next.disabled =
        !answer ||
        !Number.isInteger(
            answer.selected
        );


    elements.previous.disabled =
        currentQuestionIndex === 0;


    question.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "quiz-option";


            button.dataset.index =
                index;


            const letter =
                String.fromCharCode(
                    65 + index
                );


            const letterElement =
                document.createElement(
                    "span"
                );


            letterElement.className =
                "quiz-option__letter";


            letterElement.textContent =
                letter;


            const textElement =
                document.createElement(
                    "span"
                );


            textElement.textContent =
                option;


            button.appendChild(
                letterElement
            );


            button.appendChild(
                textElement
            );


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index
                    );

                }
            );


            elements.options.appendChild(
                button
            );

        }
    );


    renderOptionState(
        question,
        answer
    );


    if (
        answer &&
        answer.confirmed
    ) {

        elements.feedback.hidden =
            false;


        elements.feedbackTitle.textContent =
            answer.correct
                ? "Resposta correta!"
                : "Resposta incorreta.";


        elements.feedbackMessage.textContent =
            question.explanation;


        elements.feedback.classList.add(
            answer.correct
                ? "is-correct"
                : "is-wrong"
        );


        elements.next.textContent =
            currentQuestionIndex <
                currentQuiz.questions.length - 1
                ? "Próxima questão →"
                : "Ver resultado";


    } else {

        elements.next.textContent =
            "Confirmar resposta";

    }


    updateProgress();

}


/* ==========================================================================
   Seleção
========================================================================== */

function selectAnswer(
    index
) {

    const currentAnswer =
        getCurrentAnswer();


    if (
        currentAnswer &&
        currentAnswer.confirmed
    ) {

        return;

    }


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (
        !question ||
        !Number.isInteger(
            index
        ) ||
        index < 0 ||
        index >=
        question.options.length
    ) {

        return;

    }


    answers[
        currentQuestionIndex
    ] = {

        selected:
            index,

        confirmed:
            false,

        correct:
            false

    };


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            (button) => {

                button.classList.remove(
                    "is-selected"
                );

            }
        );


    const selectedButton =
        document.querySelector(
            `.quiz-option[data-index="${index}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "is-selected"
        );

    }


    const elements =
        getElements();


    elements.next.disabled =
        false;


    saveAttempt();

}


/* ==========================================================================
   Confirmação
========================================================================== */

function confirmAnswer() {

    const currentAnswer =
        getCurrentAnswer();


    if (
        !currentAnswer ||
        currentAnswer.confirmed
    ) {

        return;

    }


    const question =
        currentQuiz.questions[
        currentQuestionIndex
        ];


    if (!question) {

        return;

    }


    const isCorrect =
        currentAnswer.selected ===
        question.correct;


    answers[
        currentQuestionIndex
    ] = {

        selected:
            currentAnswer.selected,

        confirmed:
            true,

        correct:
            isCorrect

    };


    renderQuestion();

    saveAttempt();

}


/* ==========================================================================
   Próxima questão
========================================================================== */

function goToNextQuestion() {

    const currentAnswer =
        getCurrentAnswer();


    if (
        !currentAnswer
    ) {

        return;

    }


    if (
        !currentAnswer.confirmed
    ) {

        confirmAnswer();

        return;

    }


    if (
        currentQuestionIndex >=
        currentQuiz.questions.length - 1
    ) {

        finishQuiz();

        return;

    }


    currentQuestionIndex +=
        1;


    saveAttempt();

    renderQuestion();

}


/* ==========================================================================
   Questão anterior
========================================================================== */

function goToPreviousQuestion() {

    if (
        currentQuestionIndex <=
        0
    ) {

        return;

    }


    currentQuestionIndex -=
        1;


    saveAttempt();

    renderQuestion();

}


/* ==========================================================================
   Histórico
========================================================================== */

function getQuizHistory() {

    const historyStorageKey =
        getHistoryStorageKey();

    let stored =
        localStorage.getItem(
            historyStorageKey
        );


    if (!stored) {

        const userKey =
            getUserKey(
                getStoredUser()
            );

        const legacyStored =
            userKey !== "anonymous"
                ? localStorage.getItem(
                    "visium_quiz_history_anonymous"
                )
                : null;

        if (legacyStored) {

            localStorage.setItem(
                historyStorageKey,
                legacyStored
            );

            stored =
                legacyStored;

        } else {

            return [];

        }

    }


    try {

        const history =
            JSON.parse(
                stored
            );


        if (
            !Array.isArray(
                history
            )
        ) {

            return [];

        }


        return history;

    } catch (error) {

        console.error(
            "Visium | Histórico de quizzes inválido:",
            error
        );


        return [];

    }

}


function saveResult() {

    const total =
        currentQuiz.questions.length;


    const correct =
        calculateScore();


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    const history =
        getQuizHistory();


    const attemptNumber =
        history.filter(
            (item) =>
                item &&
                item.quizId ===
                currentQuizId
        ).length + 1;


    history.push({

        attemptId,

        attemptNumber,

        quizId:
            currentQuizId,

        score:
            percentage,

        correct,

        total,

        date:
            new Date().toISOString()

    });


    localStorage.setItem(
        getHistoryStorageKey(),
        JSON.stringify(
            history
        )
    );


    localStorage.setItem(
        `visium_quiz_progress_${currentQuizId}`,
        "100"
    );


    clearAttempt();


    return {

        score:
            percentage,

        correct,

        total

    };

}


/* ==========================================================================
   Resultado
========================================================================== */

function finishQuiz() {

    const elements =
        getElements();


    const total =
        currentQuiz.questions.length;


    const correct =
        calculateScore();


    const wrong =
        total -
        correct;


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    saveResult();


    elements.quizCard.hidden =
        true;


    elements.result.hidden =
        false;


    elements.resultScore.textContent =
        `${percentage}%`;


    elements.resultCorrect.textContent =
        correct;


    elements.resultWrong.textContent =
        wrong;


    elements.resultTotal.textContent =
        total;


    if (
        percentage >= 80
    ) {

        elements.resultMessage.textContent =
            "Excelente resultado! Continue mantendo esse ritmo de estudos.";

    } else if (
        percentage >= 60
    ) {

        elements.resultMessage.textContent =
            "Bom resultado. Continue estudando para evoluir ainda mais.";

    } else {

        elements.resultMessage.textContent =
            "Continue estudando e tente novamente para melhorar seu resultado.";

    }

}


/* ==========================================================================
   Reiniciar
========================================================================== */

function restartQuiz() {

    currentQuestionIndex =
        0;


    answers =
        createEmptyAnswerState();


    attemptId =
        createAttemptId();


    window.__visiumQuizStartedAt =
        new Date().toISOString();


    clearAttempt();

    saveAttempt();


    const elements =
        getElements();


    elements.quizCard.hidden =
        false;


    elements.result.hidden =
        true;


    renderQuestion();

}


/* ==========================================================================
   Eventos
========================================================================== */

function initializeEvents() {

    const elements =
        getElements();


    if (
        !elements.next ||
        !elements.previous ||
        !elements.restart
    ) {

        return;

    }


    elements.next.addEventListener(
        "click",
        goToNextQuestion
    );


    elements.previous.addEventListener(
        "click",
        goToPreviousQuestion
    );


    elements.restart.addEventListener(
        "click",
        restartQuiz
    );

}


/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeQuiz() {

    const user =
        await requireAuthentication();


    if (!user) {

        return;

    }


    currentQuizId =
        getQuizId();


    currentQuiz =
        QUIZ_DATA[
        currentQuizId
        ];


    if (
        !isValidQuiz(
            currentQuiz
        )
    ) {

        console.error(
            "Visium | Quiz inválido:",
            currentQuizId
        );


        window.location.href =
            "/pages/app/quizzes/quizzes.html";


        return;

    }


    const headerLoaded =
        await loadComponent(
            "#appHeaderContainer",
            COMPONENTS.header
        );


    if (
        !headerLoaded
    ) {

        return;

    }

    renderQuizHeader();

    const mode =
        getQuizMode();


    /*
     * Refazer explicitamente:
     * descarta somente a tentativa atual e cria
     * uma nova tentativa.
     *
     * O histórico anterior permanece intacto.
     */

    if (
        mode === "restart"
    ) {

        clearAttempt();


        answers =
            createEmptyAnswerState();


        currentQuestionIndex =
            0;


        attemptId =
            createAttemptId();


        window.__visiumQuizStartedAt =
            new Date().toISOString();


        saveAttempt();

    } else {

        /*
         * Continuar:
         * tenta recuperar a tentativa existente.
         */

        const hasAttempt =
            loadAttempt();


        if (!hasAttempt) {

            answers =
                createEmptyAnswerState();


            currentQuestionIndex =
                0;


            attemptId =
                createAttemptId();


            window.__visiumQuizStartedAt =
                new Date().toISOString();


            saveAttempt();

        }

    }


    initializeEvents();

    renderQuestion();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeQuiz
);
