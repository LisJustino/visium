window.VisiumContent = window.VisiumContent || {};

window.VisiumContent["interpretacao-de-receita"] = {
    id: "interpretacao-de-receita",
    title: "Interpretação de Receita",
    category: "RECEITAS",
    description: "Interpretação dos principais campos de uma receita oftálmica.",
    sections: [
        {
            id: "estrutura",
            title: "Estrutura da receita",
            content: "<h2>Estrutura da receita</h2><p>Uma receita oftálmica registra os dados necessários para a correção visual de cada olho. Os campos mais comuns são esférico, cilíndrico, eixo, adição e observações.</p><p>Observe sempre o olho direito e o olho esquerdo separadamente antes de interpretar os valores. As medidas normalmente são expressas em dioptrias, em intervalos de 0,25.</p><figure class=\"reader-image\"><img src=\"/assets/img/content/ametropias/receitas/receita-grau-esferico.jpg\" alt=\"Exemplo de grau esférico em receita\" loading=\"lazy\"><figcaption>Exemplo de indicação do grau esférico.</figcaption></figure>"
        },
        {
            id: "esferico",
            title: "Esférico",
            content: "<h2>Valor esférico</h2><p>O valor esférico indica a potência principal da lente. O sinal negativo é usado na correção da miopia e o sinal positivo na correção da hipermetropia.</p><p>Cada olho é avaliado de forma independente. Quando existe diferença de grau entre os olhos, essa condição é chamada anisometropia.</p>"
        },
        {
            id: "cilindro-eixo",
            title: "Cilindro e eixo",
            content: "<h2>Cilindro e eixo</h2><p>O cilindro representa a correção do astigmatismo. O eixo informa a orientação dessa correção em graus, variando de 0° a 180°.</p><p>Os dois valores devem ser interpretados em conjunto: quando existe cilindro, a receita também precisa informar o eixo correspondente.</p><figure class=\"reader-image\"><img src=\"/assets/img/content/ametropias/receitas/receita-lente-cilindrica.jpg\" alt=\"Exemplo de lente cilíndrica\" loading=\"lazy\"><figcaption>Representação da correção cilíndrica.</figcaption></figure>"
        },
        {
            id: "adicao",
            title: "Adição",
            content: "<h2>Adição</h2><p>A adição é o poder dióptrico adicional destinado à visão próxima, especialmente quando há redução da acomodação.</p><p>Para obter o esférico de perto, some a adição ao esférico de longe. Os valores de cilindro e eixo permanecem inalterados.</p>"
        },
        {
            id: "conferencia",
            title: "Conferência",
            content: "<h2>Conferência da receita</h2><p>Confira identificação, olho correspondente, sinais, valores, eixo e adição antes de encaminhar a montagem.</p>"
        }
    ]
};
