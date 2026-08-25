/**
 * ==========================================================================
 * Visium
 * Arquivo: montagem.js
 *
 * Conteúdo educacional:
 * Montagem de lentes oftálmicas
 * ==========================================================================
 */

window.VisiumContent = window.VisiumContent || {};

window.VisiumContent.montagem = {

    id: "montagem",

    title: "Montagem",

    category: "MONTAGEM",

    description:
        "Etapas da montagem de lentes oftálmicas, da conferência da receita à inspeção final.",

    sections: [

        {
            id: "conferencia",

            title: "Conferência da montagem",

            content: `
                <h2>Conferência da montagem</h2>

                <p>
                    A montagem começa com a conferência da receita, da armação
                    e das medidas do usuário. Essa etapa evita que uma medida
                    incorreta avance para o corte da lente.
                </p>

                <p>
                    Confira olho direito e esquerdo, esfera, cilindro, eixo,
                    adição, DP ou DNP e altura de montagem quando necessário.
                </p>
            `
        },


        {
            id: "medidas",

            title: "Medidas e centralização",

            content: `
                <h2>Medidas e centralização</h2>

                <p>
                    A centralização posiciona o centro óptico e, nas lentes
                    progressivas, as referências de montagem em relação aos
                    olhos e à armação.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/armacao.jpeg"
                        alt="Armação usada na montagem de lentes"
                        loading="lazy"
                    >
                    <figcaption>
                        A armação deve estar ajustada antes da centralização.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "blocagem",

            title: "Blocagem e corte",

            content: `
                <h2>Blocagem e corte</h2>

                <p>
                    Depois de marcar as referências, a lente é bloqueada e
                    cortada de acordo com o formato interno da armação. O
                    recorte precisa respeitar o eixo, a altura e a espessura.
                </p>
            `
        },


        {
            id: "montagem",

            title: "Encaixe na armação",

            content: `
                <h2>Encaixe na armação</h2>

                <p>
                    No encaixe, observe se a lente assenta sem tensão, se o
                    bisel acompanha o aro e se não há folgas ou deformações.
                    A armação não deve ser forçada para receber a lente.
                </p>
            `
        },


        {
            id: "conferencia-final",

            title: "Conferência final",

            content: `
                <h2>Conferência final</h2>

                <p>
                    Finalizada a montagem, confira a limpeza, a estabilidade
                    das lentes, a simetria da armação e a correspondência
                    entre a receita e os poderes medidos no lensômetro.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/lensometro.jpg"
                        alt="Lensômetro usado na conferência das lentes"
                        loading="lazy"
                    >
                    <figcaption>
                        Conferência dos poderes com lensômetro.
                    </figcaption>
                </figure>
            `
        },


        {
            id: "ajustes",

            title: "Ajustes e entrega",

            content: `
                <h2>Ajustes e entrega</h2>

                <p>
                    Faça os ajustes finais de plaquetas, hastes e apoio nasal.
                    A armação deve ficar nivelada, confortável e alinhada ao
                    rosto antes da entrega ao cliente.
                </p>

                <figure class="reader-image">
                    <img
                        src="/assets/img/content/montagem/lentes.jpeg"
                        alt="Lentes prontas para montagem óptica"
                        loading="lazy"
                    >
                    <figcaption>
                        Lentes prontas para a etapa de montagem.
                    </figcaption>
                </figure>
            `
        }
    ]

};