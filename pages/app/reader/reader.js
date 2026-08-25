/**
 * ==========================================================================
 * Visium
 * Arquivo: reader.js
 *
 * Comportamento da página de leitura de conteúdos.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Configuração
========================================================================== */

const COMPONENTS = {

    header:
        "/components/header/header.html?v=20260824"

};

const CONTENT_ASSET_VERSION =
    "20260847";


const CONTENTS = {

    ametropias: {

        category:
            "REFRAÇÃO",

        title:
            "Ametropias",

        description:
            "Estude miopia, hipermetropia, astigmatismo e presbiopia.",

        sections: [

            {
                title:
                    "Introdução às ametropias",

                content: `
                    <h2>Introdução às ametropias</h2>

                    <p>
                        As ametropias são alterações relacionadas à forma
                        como o sistema óptico do olho direciona a luz para
                        formar uma imagem.
                    </p>

                    <p>
                        Neste conteúdo, você irá conhecer os principais
                        conceitos relacionados à miopia, hipermetropia,
                        astigmatismo e presbiopia.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            O objetivo desta seção é criar uma base para
                            compreender as principais alterações da
                            refração ocular.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Miopia",

                content: `
                    <h2>Miopia</h2>

                    <p>
                        A miopia é uma condição refrativa na qual a imagem
                        de um objeto distante tende a se formar antes da
                        retina quando o olho está em repouso.
                    </p>

                    <h3>Características</h3>

                    <ul>
                        <li>Dificuldade para enxergar objetos distantes.</li>
                        <li>A visão próxima pode permanecer relativamente preservada.</li>
                        <li>A correção óptica utiliza lentes de potência negativa.</li>
                    </ul>

                    <div class="reader-highlight">
                        <p>
                            Na prática óptica, a miopia é corrigida com
                            lentes divergentes.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Hipermetropia",

                content: `
                    <h2>Hipermetropia</h2>

                    <p>
                        A hipermetropia é uma condição refrativa na qual,
                        em determinadas condições, a imagem tende a se
                        formar posteriormente à retina.
                    </p>

                    <h3>Características</h3>

                    <ul>
                        <li>Pode causar dificuldade para visão próxima.</li>
                        <li>O esforço acomodativo pode ser aumentado.</li>
                        <li>A correção utiliza lentes de potência positiva.</li>
                    </ul>

                    <div class="reader-highlight">
                        <p>
                            Na prática óptica, a hipermetropia é corrigida
                            com lentes convergentes.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Astigmatismo",

                content: `
                    <h2>Astigmatismo</h2>

                    <p>
                        O astigmatismo está relacionado a diferenças de
                        curvatura em diferentes meridianos do sistema óptico.
                    </p>

                    <h3>Características</h3>

                    <ul>
                        <li>Pode provocar visão borrada ou distorcida.</li>
                        <li>Pode estar associado à miopia ou hipermetropia.</li>
                        <li>A correção pode envolver componente cilíndrico.</li>
                    </ul>

                    <div class="reader-highlight">
                        <p>
                            O eixo da correção cilíndrica indica a orientação
                            do meridiano correspondente à prescrição.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Presbiopia",

                content: `
                    <h2>Presbiopia</h2>

                    <p>
                        A presbiopia está relacionada à redução progressiva
                        da capacidade de acomodação do sistema visual ao
                        longo da vida.
                    </p>

                    <h3>Características</h3>

                    <ul>
                        <li>Dificuldade crescente para visão próxima.</li>
                        <li>Está relacionada à redução da acomodação.</li>
                        <li>A correção pode exigir adição para perto.</li>
                    </ul>

                    <div class="reader-highlight">
                        <p>
                            A presbiopia não deve ser confundida com uma
                            ametropia de base como miopia ou hipermetropia.
                        </p>
                    </div>
                `
            }

        ]

    },


    "dp-dnp": {

        category:
            "MEDIÇÃO",

        title:
            "DP e DNP",

        description:
            "Conceitos relacionados à distância pupilar e distância naso-pupilar.",

        sections: [

            {
                title:
                    "Introdução",

                content: `
                    <h2>Introdução à DP e DNP</h2>

                    <p>
                        A distância pupilar e a distância naso-pupilar são
                        medidas importantes para a correta centralização
                        das lentes oftálmicas.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            Uma medição adequada contribui para posicionar
                            corretamente o centro óptico da lente em relação
                            ao usuário.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Distância Pupilar",

                content: `
                    <h2>Distância Pupilar</h2>

                    <p>
                        A distância pupilar, ou DP, representa a distância
                        entre as referências pupilares utilizadas durante
                        a medição.
                    </p>

                    <h3>Importância</h3>

                    <ul>
                        <li>Auxilia na centralização das lentes.</li>
                        <li>É utilizada durante a conferência da montagem.</li>
                        <li>Deve ser medida de maneira cuidadosa.</li>
                    </ul>
                `
            },

            {
                title:
                    "Distância Naso-Pupilar",

                content: `
                    <h2>Distância Naso-Pupilar</h2>

                    <p>
                        A DNP representa a distância entre a referência
                        nasal e cada pupila individualmente.
                    </p>

                    <p>
                        Diferentemente de uma medida binocular única,
                        a DNP permite considerar separadamente os lados
                        direito e esquerdo.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            A utilização da DNP pode proporcionar maior
                            precisão na centralização individual das lentes.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Medição",

                content: `
                    <h2>Medição</h2>

                    <p>
                        A medição deve ser realizada com atenção à posição
                        natural do usuário e à referência utilizada pelo
                        instrumento de medição.
                    </p>

                    <ul>
                        <li>Posicione corretamente o usuário.</li>
                        <li>Verifique o alinhamento.</li>
                        <li>Realize a leitura da medida.</li>
                        <li>Confirme o resultado antes do registro.</li>
                    </ul>
                `
            },

            {
                title:
                    "Aplicação na montagem",

                content: `
                    <h2>Aplicação na montagem</h2>

                    <p>
                        As medidas de DP e DNP são utilizadas como referência
                        durante o processo de montagem das lentes.
                    </p>

                    <p>
                        Uma medida incorreta pode resultar em deslocamento
                        do centro óptico em relação à posição esperada.
                    </p>
                `
            }

        ]

    },


    montagem: {

        category:
            "PROCESSOS",

        title:
            "Montagem",

        description:
            "Conheça conceitos e processos relacionados à montagem óptica.",

        sections: [

            {
                title:
                    "Introdução",

                content: `
                    <h2>Introdução à montagem</h2>

                    <p>
                        A montagem óptica reúne etapas necessárias para
                        transformar uma prescrição em um óculos corretamente
                        montado.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            O processo exige atenção às medidas, à prescrição
                            e ao posicionamento correto das lentes.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Conferência da lente",

                content: `
                    <h2>Conferência da lente</h2>

                    <p>
                        Antes da montagem, é importante conferir as
                        características da lente e verificar se elas
                        correspondem ao pedido.
                    </p>

                    <ul>
                        <li>Verificação da potência.</li>
                        <li>Verificação do eixo quando aplicável.</li>
                        <li>Conferência das marcações.</li>
                    </ul>
                `
            },

            {
                title:
                    "Centralização",

                content: `
                    <h2>Centralização</h2>

                    <p>
                        A centralização determina o posicionamento da lente
                        em relação às referências utilizadas na montagem.
                    </p>

                    <p>
                        As medidas obtidas durante o atendimento devem ser
                        respeitadas durante esta etapa.
                    </p>
                `
            },

            {
                title:
                    "Montagem",

                content: `
                    <h2>Montagem</h2>

                    <p>
                        A montagem envolve o posicionamento e a adaptação
                        das lentes à armação escolhida.
                    </p>

                    <h3>Pontos de atenção</h3>

                    <ul>
                        <li>Posicionamento correto da lente.</li>
                        <li>Integridade da armação.</li>
                        <li>Centralização adequada.</li>
                        <li>Conferência final.</li>
                    </ul>
                `
            },

            {
                title:
                    "Conferência final",

                content: `
                    <h2>Conferência final</h2>

                    <p>
                        Depois da montagem, deve ser realizada uma
                        conferência final para verificar se o resultado
                        corresponde ao esperado.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            A conferência final é uma etapa essencial para
                            identificar possíveis erros antes da entrega.
                        </p>
                    </div>
                `
            }

        ]

    },


    patologias: {

        category:
            "SAÚDE OCULAR",

        title:
            "Patologias",

        description:
            "Conteúdos introdutórios sobre patologias relacionadas à visão.",

        sections: [

            {
                title:
                    "Introdução",

                content: `
                    <h2>Introdução às patologias</h2>

                    <p>
                        As patologias oculares envolvem diferentes alterações
                        que podem afetar estruturas e funções relacionadas
                        ao sistema visual.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            Este conteúdo possui finalidade educacional e
                            introdutória.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Importância da observação",

                content: `
                    <h2>Importância da observação</h2>

                    <p>
                        A observação de sinais e sintomas pode contribuir
                        para identificar situações que necessitem de
                        avaliação especializada.
                    </p>

                    <p>
                        A identificação de uma alteração não substitui
                        avaliação realizada por profissional habilitado.
                    </p>
                `
            },

            {
                title:
                    "Alterações visuais",

                content: `
                    <h2>Alterações visuais</h2>

                    <p>
                        Alterações na qualidade da visão podem apresentar
                        diferentes características e causas.
                    </p>

                    <ul>
                        <li>Redução da acuidade visual.</li>
                        <li>Alterações no campo visual.</li>
                        <li>Distorções na percepção.</li>
                        <li>Alterações na sensibilidade visual.</li>
                    </ul>
                `
            },

            {
                title:
                    "Avaliação",

                content: `
                    <h2>Avaliação</h2>

                    <p>
                        A avaliação adequada depende da análise das
                        características apresentadas pelo usuário e dos
                        procedimentos apropriados para cada situação.
                    </p>

                    <div class="reader-highlight">
                        <p>
                            O conteúdo educacional do Visium não substitui
                            diagnóstico ou acompanhamento profissional.
                        </p>
                    </div>
                `
            },

            {
                title:
                    "Revisão",

                content: `
                    <h2>Revisão</h2>

                    <p>
                        Ao finalizar este conteúdo, revise os principais
                        conceitos apresentados e utilize as informações
                        como base para seus estudos.
                    </p>

                    <ul>
                        <li>Revise os conceitos principais.</li>
                        <li>Relacione os conceitos estudados.</li>
                        <li>Avance para os exercícios quando disponíveis.</li>
                    </ul>
                `
            }

        ]

    }

};


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
   Conteúdo atual
========================================================================== */

function getContentKey() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "content"
    );

}


function getCurrentContent() {

    const key =
        getContentKey();


    if (!key) {

        return null;

    }


    return window.VisiumContent?.[key] || CONTENTS[key] || null;

}


function canLoadExternalContent(
    key
) {

    return /^[a-z0-9-]+$/.test(
        String(
            key || ""
        )
    );

}


async function loadExternalContent(
    key
) {

    const sourceKey =
        key === "interpretacao-de-receita"
            ? "lendo-uma-receita"
            : key;

    if (
        !canLoadExternalContent(
            key
        )
    ) {

        return false;

    }


    if (
        window.VisiumContent?.[sourceKey]
    ) {

        if (sourceKey !== key) {

            window.VisiumContent[key] =
                window.VisiumContent[sourceKey];

        }

        return true;

    }


    return new Promise(
        (resolve) => {

            const script =
                document.createElement(
                    "script"
                );


            script.src =
                `/data/content/${sourceKey}.js?v=${CONTENT_ASSET_VERSION}`;

            script.async =
                true;


            script.onload =
                () => {

                    const sourceContent =
                        window.VisiumContent?.[sourceKey];

                    if (
                        sourceContent &&
                        sourceKey !== key
                    ) {

                        window.VisiumContent[key] =
                            sourceContent;

                    }

                    resolve(Boolean(sourceContent));

                };


            script.onerror =
                () => {

                    resolve(
                        false
                    );

                };


            document.head.appendChild(
                script
            );

        }
    );

}


/* ==========================================================================
   Elementos
========================================================================== */

const elements = {

    category:
        document.querySelector(
            "#readerCategory"
        ),

    title:
        document.querySelector(
            "#readerTitle"
        ),

    description:
        document.querySelector(
            "#readerDescription"
        ),

    progressText:
        document.querySelector(
            "#readerProgressText"
        ),

    progressBar:
        document.querySelector(
            "#readerProgressBar"
        ),

    sections:
        document.querySelector(
            "#readerSections"
        ),

    article:
        document.querySelector(
            "#readerArticle"
        ),

    previous:
        document.querySelector(
            "#readerPrevious"
        ),

    next:
        document.querySelector(
            "#readerNext"
        )

};


/* ==========================================================================
   Estado
========================================================================== */

let currentContent = null;

let currentSectionIndex = 0;


/* ==========================================================================
   Compatibilidade com progresso anterior
========================================================================== */

function getLegacyProgressKey() {

    const contentKey =
        getContentKey();


    return `visium_reader_progress_${contentKey}`;

}


function getLegacyContentProgressKey() {

    const contentKey =
        getContentKey();


    return `visium_content_progress_${contentKey}`;

}


function loadLegacyProgress() {

    const key =
        getLegacyProgressKey();


    const saved =
        localStorage.getItem(
            key
        );


    if (
        saved === null
    ) {

        return null;

    }


    const parsed =
        Number(
            saved
        );


    if (
        Number.isNaN(
            parsed
        )
    ) {

        return null;

    }


    return Math.max(
        0,
        Math.min(
            parsed,
            currentContent.sections.length - 1
        )
    );

}


function loadLegacyContentPercentage() {

    const key =
        getLegacyContentProgressKey();


    const saved =
        localStorage.getItem(
            key
        );


    if (
        saved === null
    ) {

        return null;

    }


    const parsed =
        Number(
            saved
        );


    if (
        Number.isNaN(
            parsed
        )
    ) {

        return null;

    }


    return Math.max(
        0,
        Math.min(
            parsed,
            100
        )
    );

}


function migrateLegacyProgress() {

    const contentKey =
        getContentKey();


    if (
        !contentKey ||
        !window.VisiumProgress
    ) {

        return null;

    }


    const existingProgress =
        window.VisiumProgress.getContent(
            contentKey
        );


    if (existingProgress) {

        return existingProgress;

    }


    const legacySection =
        loadLegacyProgress();


    const legacyPercentage =
        loadLegacyContentPercentage();


    if (
        legacySection === null &&
        legacyPercentage === null
    ) {

        return null;

    }


    const sectionIndex =
        legacySection !== null
            ? legacySection
            : 0;


    const percentage =
        legacyPercentage !== null
            ? legacyPercentage
            : calculateProgressPercentage(
                sectionIndex
            );


    return window.VisiumProgress.update(
        contentKey,
        percentage,
        sectionIndex
    );

}


/* ==========================================================================
   Cálculo do progresso
========================================================================== */

function calculateProgressPercentage(
    sectionIndex = currentSectionIndex
) {

    const total =
        currentContent.sections.length;


    if (
        total <= 1
    ) {

        return 100;

    }


    return Math.round(
        (
            sectionIndex /
            (total - 1)
        ) *
        100
    );

}


/* ==========================================================================
   Carregamento do progresso
========================================================================== */

function loadSavedProgress() {

    if (
        !window.VisiumProgress
    ) {

        return 0;

    }


    const contentKey =
        getContentKey();


    const saved =
        window.VisiumProgress.getContent(
            contentKey
        );


    if (saved) {

        return Math.max(
            0,
            Math.min(
                Number(
                    saved.currentSection
                ) || 0,
                currentContent.sections.length - 1
            )
        );

    }


    const migrated =
        migrateLegacyProgress();


    if (migrated) {

        return Math.max(
            0,
            Math.min(
                Number(
                    migrated.currentSection
                ) || 0,
                currentContent.sections.length - 1
            )
        );

    }


    return 0;

}


/* ==========================================================================
   Persistência do progresso
========================================================================== */

function saveProgress() {

    if (
        !window.VisiumProgress
    ) {

        console.error(
            "Visium | Serviço de progresso não disponível."
        );


        return;

    }


    const contentKey =
        getContentKey();


    const percentage =
        calculateProgressPercentage();


    window.VisiumProgress.update(
        contentKey,
        percentage,
        currentSectionIndex
    );

}


/* ==========================================================================
   Cabeçalho
========================================================================== */

function renderHeader() {

    elements.category.textContent =
        currentContent.category;


    elements.title.textContent =
        currentContent.title;


    elements.description.textContent =
        currentContent.description;


    document.title =
        `${currentContent.title} | Visium`;

}


/* ==========================================================================
   Navegação das seções
========================================================================== */

function renderSectionNavigation() {

    elements.sections.innerHTML =
        "";


    currentContent.sections.forEach(
        (section, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "reader-section-link";


            button.dataset.index =
                String(
                    index
                );


            button.textContent =
                `${index + 1}. ${section.title}`;


            button.addEventListener(
                "click",
                () => {

                    goToSection(
                        index
                    );

                }
            );


            elements.sections.appendChild(
                button
            );

        }
    );

}


/* ==========================================================================
   Artigo
========================================================================== */

function renderArticle() {

    elements.article.innerHTML =
        "";


    currentContent.sections.forEach(
        (section, index) => {

            const sectionElement =
                document.createElement(
                    "section"
                );


            sectionElement.className =
                "reader-article__section";


            sectionElement.dataset.index =
                String(
                    index
                );


            /*
             * Conteúdos novos:
             * utilizam uma estrutura baseada em blocks.
             */

            if (
                Array.isArray(
                    section.blocks
                )
            ) {

                section.blocks.forEach(
                    (block) => {

                        if (
                            !block ||
                            !block.type
                        ) {

                            return;

                        }


                        /* --------------------------------------------------
                           Texto
                        -------------------------------------------------- */

                        if (
                            block.type ===
                            "text"
                        ) {

                            const paragraph =
                                document.createElement(
                                    "p"
                                );


                            paragraph.textContent =
                                block.content || "";


                            sectionElement.appendChild(
                                paragraph
                            );


                            return;

                        }


                        /* --------------------------------------------------
                           Imagem
                        -------------------------------------------------- */

                        if (
                            block.type ===
                            "image"
                        ) {

                            const figure =
                                document.createElement(
                                    "figure"
                                );


                            figure.className =
                                "reader-article__figure";


                            const image =
                                document.createElement(
                                    "img"
                                );

                            image.className =
                                "reader-media__image";

                            image.src =
                                block.src || "";


                            image.alt =
                                block.alt || "";


                            image.loading =
                                "lazy";


                            figure.appendChild(
                                image
                            );


                            if (
                                block.caption
                            ) {

                                const caption =
                                    document.createElement(
                                        "figcaption"
                                    );


                                caption.textContent =
                                    block.caption;


                                figure.appendChild(
                                    caption
                                );

                            }


                            sectionElement.appendChild(
                                figure
                            );


                            return;

                        }


                        /* --------------------------------------------------
                           Lista
                        -------------------------------------------------- */

                        if (
                            block.type ===
                            "list"
                        ) {

                            const wrapper =
                                document.createElement(
                                    "div"
                                );


                            wrapper.className =
                                "reader-article__list";


                            if (
                                block.title
                            ) {

                                const title =
                                    document.createElement(
                                        "h3"
                                    );


                                title.textContent =
                                    block.title;


                                wrapper.appendChild(
                                    title
                                );

                            }


                            const list =
                                document.createElement(
                                    "ul"
                                );


                            const items =
                                Array.isArray(
                                    block.items
                                )
                                    ? block.items
                                    : [];


                            items.forEach(
                                (item) => {

                                    const listItem =
                                        document.createElement(
                                            "li"
                                        );


                                    listItem.textContent =
                                        item;


                                    list.appendChild(
                                        listItem
                                    );

                                }
                            );


                            wrapper.appendChild(
                                list
                            );


                            sectionElement.appendChild(
                                wrapper
                            );


                            return;

                        }

                    }
                );


            } else {

                /*
                 * Compatibilidade com conteúdos antigos
                 * que utilizam section.content.
                 */

                sectionElement.innerHTML =
                    section.content || "";

            }


            elements.article.appendChild(
                sectionElement
            );

        }
    );

}


/* ==========================================================================
   Atualização visual
========================================================================== */

function updateActiveSection() {

    const navigationItems =
        elements.sections.querySelectorAll(
            ".reader-section-link"
        );


    navigationItems.forEach(
        (item, index) => {

            item.classList.toggle(
                "is-active",
                index === currentSectionIndex
            );

        }
    );


    const articleSections =
        elements.article.querySelectorAll(
            ".reader-article__section"
        );


    articleSections.forEach(
        (section, index) => {

            section.classList.toggle(
                "is-active",
                index === currentSectionIndex
            );

        }
    );

}


/* ==========================================================================
   Progresso visual
========================================================================== */

function updateProgress() {

    const percentage =
        calculateProgressPercentage();


    elements.progressText.textContent =
        `${percentage}%`;


    elements.progressBar.style.width =
        `${percentage}%`;

}


/* ==========================================================================
   Botões
========================================================================== */

function updateNavigationButtons() {

    const lastIndex =
        currentContent.sections.length - 1;


    elements.previous.disabled =
        currentSectionIndex <= 0;


    elements.next.disabled =
        currentSectionIndex >= lastIndex;


    if (
        currentSectionIndex >= lastIndex
    ) {

        elements.next.textContent =
            "Conteúdo concluído";

    } else {

        elements.next.textContent =
            "Próximo →";

    }

}


/* ==========================================================================
   Navegação
========================================================================== */

function goToSection(
    index
) {

    const lastIndex =
        currentContent.sections.length - 1;


    currentSectionIndex =
        Math.max(
            0,
            Math.min(
                index,
                lastIndex
            )
        );


    updateActiveSection();

    updateProgress();

    updateNavigationButtons();

    saveProgress();

}


function goToPrevious() {

    if (
        currentSectionIndex <= 0
    ) {

        return;

    }


    goToSection(
        currentSectionIndex - 1
    );

}


function goToNext() {

    const lastIndex =
        currentContent.sections.length - 1;


    if (
        currentSectionIndex >= lastIndex
    ) {

        return;

    }


    goToSection(
        currentSectionIndex + 1
    );

}


/* ==========================================================================
   Eventos
========================================================================== */

function initializeNavigation() {

    elements.previous.addEventListener(
        "click",
        goToPrevious
    );


    elements.next.addEventListener(
        "click",
        goToNext
    );

}

/* ==========================================================================
   Inicialização
========================================================================== */

async function initializeReader() {

    const user =
        await requireAuthentication();


    if (!user) {

        return;

    }


    const contentKey =
        getContentKey();


    if (contentKey) {

        await loadExternalContent(
            contentKey
        );

    }


    currentContent =
        getCurrentContent();


    if (!currentContent) {

        console.error(
            "Visium | Conteúdo não encontrado."
        );


        window.location.href =
            "/pages/app/contents/contents.html";


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


    renderHeader();

    renderSectionNavigation();

    renderArticle();


    if (
        !window.VisiumProgress
    ) {

        console.error(
            "Visium | Serviço de progresso não carregado."
        );


        return;

    }


    currentSectionIndex =
        loadSavedProgress();


    /*
     * Abrir o conteúdo já conta como início.
     *
     * Se o conteúdo ainda não possuir progresso,
     * registerAccess cria o registro com status "started".
     */

    window.VisiumProgress.registerAccess(
        getContentKey(),
        currentSectionIndex
    );


    updateActiveSection();

    updateProgress();

    updateNavigationButtons();

    initializeNavigation();

}

document.addEventListener(
    "DOMContentLoaded",
    initializeReader
);
