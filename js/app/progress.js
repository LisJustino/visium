/**
 * ==========================================================================
 * Visium
 * Arquivo: progress.js
 *
 * Serviço compartilhado de progresso do usuário.
 *
 * Responsabilidades:
 * - Registrar conteúdos iniciados.
 * - Atualizar percentual de progresso.
 * - Controlar estado do conteúdo.
 * - Registrar a seção atual.
 * - Registrar o último conteúdo acessado.
 * - Persistir os dados por usuário.
 *
 * Este arquivo não manipula elementos da interface.
 * Reader, Dashboard e Meu Progresso utilizam este serviço.
 * ==========================================================================
 */

"use strict";


/* ==========================================================================
   Configuração
========================================================================== */

const VISIUM_PROGRESS_STORAGE_KEY =
    "visium_progress";


const VISIUM_PROGRESS_VERSION =
    1;


/* ==========================================================================
   Usuário atual
========================================================================== */

function getProgressCurrentUser() {

    const storedUser =
        localStorage.getItem(
            "visium_user"
        );


    if (!storedUser) {

        return null;

    }


    try {

        return JSON.parse(
            storedUser
        );

    } catch (error) {

        console.error(
            "Visium | Não foi possível ler o usuário atual:",
            error
        );


        return null;

    }

}


/* ==========================================================================
   Identificação do usuário
========================================================================== */

function getProgressUserId() {

    const user =
        getProgressCurrentUser();


    if (!user) {

        return "anonymous";

    }


    if (user.id) {

        return String(
            user.id
        );

    }


    if (user.email) {

        return String(
            user.email
        )
            .trim()
            .toLowerCase();

    }


    if (user.username) {

        return String(
            user.username
        )
            .trim()
            .toLowerCase();

    }


    if (user.name) {

        return String(
            user.name
        )
            .trim()
            .toLowerCase();

    }


    return "anonymous";

}


/* ==========================================================================
   Estrutura padrão
========================================================================== */

function createEmptyProgressStore() {

    return {

        version:
            VISIUM_PROGRESS_VERSION,

        users: {}

    };

}


/* ==========================================================================
   Estrutura padrão do usuário
========================================================================== */

function createEmptyUserProgress() {

    return {

        contents: {},

        lastContent:
            null

    };

}


/* ==========================================================================
   Leitura
========================================================================== */

function readProgressStore() {

    const storedData =
        localStorage.getItem(
            VISIUM_PROGRESS_STORAGE_KEY
        );


    if (!storedData) {

        return createEmptyProgressStore();

    }


    try {

        const parsedData =
            JSON.parse(
                storedData
            );


        if (
            !parsedData ||
            typeof parsedData !== "object"
        ) {

            return createEmptyProgressStore();

        }


        if (
            !parsedData.users ||
            typeof parsedData.users !== "object"
        ) {

            parsedData.users = {};

        }


        if (!parsedData.version) {

            parsedData.version =
                VISIUM_PROGRESS_VERSION;

        }


        return parsedData;

    } catch (error) {

        console.error(
            "Visium | Dados de progresso inválidos:",
            error
        );


        return createEmptyProgressStore();

    }

}


/* ==========================================================================
   Escrita
========================================================================== */

function writeProgressStore(
    store
) {

    try {

        localStorage.setItem(
            VISIUM_PROGRESS_STORAGE_KEY,
            JSON.stringify(
                store
            )
        );


        return true;

    } catch (error) {

        console.error(
            "Visium | Não foi possível salvar o progresso:",
            error
        );


        return false;

    }

}


/* ==========================================================================
   Dados do usuário
========================================================================== */

function getUserProgressStore(
    store
) {

    const userId =
        getProgressUserId();


    if (
        !store.users[userId] ||
        typeof store.users[userId] !== "object"
    ) {

        store.users[userId] =
            createEmptyUserProgress();

    }


    if (
        !store.users[userId].contents ||
        typeof store.users[userId].contents !== "object"
    ) {

        store.users[userId].contents = {};

    }


    if (
        !Object.prototype.hasOwnProperty.call(
            store.users[userId],
            "lastContent"
        )
    ) {

        store.users[userId].lastContent =
            null;

    }


    return store.users[userId];

}


/* ==========================================================================
   Normalização do conteúdo
========================================================================== */

function normalizeContentId(
    contentId
) {

    if (
        contentId === null ||
        contentId === undefined
    ) {

        return "";

    }


    return String(
        contentId
    ).trim();

}


/* ==========================================================================
   Normalização do percentual
========================================================================== */

function normalizeProgress(
    progress
) {

    const numericProgress =
        Number(
            progress
        );


    if (
        Number.isNaN(
            numericProgress
        )
    ) {

        return 0;

    }


    return Math.min(
        100,
        Math.max(
            0,
            Math.round(
                numericProgress
            )
        )
    );

}


/* ==========================================================================
   Estado do conteúdo
========================================================================== */

function getProgressStatus(
    progress,
    hasBeenOpened
) {

    const normalizedProgress =
        normalizeProgress(
            progress
        );


    if (
        normalizedProgress >= 100
    ) {

        return "completed";

    }


    if (
        normalizedProgress > 0
    ) {

        return "in_progress";

    }


    if (
        hasBeenOpened
    ) {

        return "started";

    }


    return "not_started";

}


/* ==========================================================================
   Timestamp atual
========================================================================== */

function getCurrentTimestamp() {

    return new Date().toISOString();

}


/* ==========================================================================
   Timestamp seguro de conclusão
========================================================================== */

function getCompletionTimestamp(
    startedAt,
    currentTimestamp
) {

    if (!startedAt) {

        return currentTimestamp;

    }


    const startedTime =
        new Date(
            startedAt
        ).getTime();


    const currentTime =
        new Date(
            currentTimestamp
        ).getTime();


    if (
        Number.isNaN(
            startedTime
        ) ||
        Number.isNaN(
            currentTime
        )
    ) {

        return currentTimestamp;

    }


    return new Date(
        Math.max(
            startedTime,
            currentTime
        )
    ).toISOString();

}


/* ==========================================================================
   Criar registro de conteúdo
========================================================================== */

function createContentProgress(
    contentId
) {

    const normalizedContentId =
        normalizeContentId(
            contentId
        );


    if (!normalizedContentId) {

        return null;

    }


    const timestamp =
        getCurrentTimestamp();


    return {

        contentId:
            normalizedContentId,

        progress:
            0,

        currentSection:
            0,

        status:
            "started",

        startedAt:
            timestamp,

        lastAccessedAt:
            timestamp,

        completedAt:
            null

    };

}


/* ==========================================================================
   Obter progresso
========================================================================== */

function getContentProgress(
    contentId
) {

    const normalizedContentId =
        normalizeContentId(
            contentId
        );


    if (!normalizedContentId) {

        return null;

    }


    const store =
        readProgressStore();


    const userProgress =
        getUserProgressStore(
            store
        );


    return (
        userProgress.contents[
            normalizedContentId
        ] ||
        null
    );

}


/* ==========================================================================
   Registrar conteúdo iniciado
========================================================================== */

function startContent(
    contentId,
    sectionIndex = 0
) {

    const normalizedContentId =
        normalizeContentId(
            contentId
        );


    if (!normalizedContentId) {

        return null;

    }


    const store =
        readProgressStore();


    const userProgress =
        getUserProgressStore(
            store
        );


    let content =
        userProgress.contents[
            normalizedContentId
        ];


    const timestamp =
        getCurrentTimestamp();


    if (!content) {

        content =
            createContentProgress(
                normalizedContentId
            );

    }


    content.currentSection =
        Math.max(
            0,
            Number(
                sectionIndex
            ) || 0
        );


    content.lastAccessedAt =
        timestamp;


    if (!content.startedAt) {

        content.startedAt =
            timestamp;

    }


    content.status =
        getProgressStatus(
            content.progress,
            true
        );


    if (
        content.status !==
        "completed"
    ) {

        content.completedAt =
            null;

    }


    userProgress.contents[
        normalizedContentId
    ] =
        content;


    userProgress.lastContent = {

        id:
            normalizedContentId,

        section:
            content.currentSection,

        progress:
            content.progress,

        status:
            content.status,

        accessedAt:
            timestamp

    };


    writeProgressStore(
        store
    );


    return content;

}


/* ==========================================================================
   Atualizar progresso
========================================================================== */

function updateContentProgress(
    contentId,
    progress,
    sectionIndex = 0
) {

    const normalizedContentId =
        normalizeContentId(
            contentId
        );


    if (!normalizedContentId) {

        return null;

    }


    const store =
        readProgressStore();


    const userProgress =
        getUserProgressStore(
            store
        );


    let content =
        userProgress.contents[
            normalizedContentId
        ];


    const timestamp =
        getCurrentTimestamp();


    if (!content) {

        content =
            createContentProgress(
                normalizedContentId
            );

    }


    const normalizedProgress =
        normalizeProgress(
            progress
        );


    const normalizedSection =
        Math.max(
            0,
            Number(
                sectionIndex
            ) || 0
        );


    content.progress =
        normalizedProgress;


    content.currentSection =
        normalizedSection;


    content.lastAccessedAt =
        timestamp;


    if (!content.startedAt) {

        content.startedAt =
            timestamp;

    }


    content.status =
        getProgressStatus(
            normalizedProgress,
            true
        );


    if (
        normalizedProgress >= 100
    ) {

        content.progress =
            100;

        content.status =
            "completed";

        content.completedAt =
            getCompletionTimestamp(
                content.startedAt,
                timestamp
            );

    } else {

        content.completedAt =
            null;

    }


    userProgress.contents[
        normalizedContentId
    ] =
        content;


    userProgress.lastContent = {

        id:
            normalizedContentId,

        section:
            normalizedSection,

        progress:
            normalizedProgress,

        status:
            content.status,

        accessedAt:
            timestamp

    };


    writeProgressStore(
        store
    );


    return content;

}


/* ==========================================================================
   Registrar acesso
========================================================================== */

function registerContentAccess(
    contentId,
    sectionIndex = 0
) {

    const normalizedContentId =
        normalizeContentId(
            contentId
        );


    if (!normalizedContentId) {

        return null;

    }


    const currentProgress =
        getContentProgress(
            normalizedContentId
        );


    if (!currentProgress) {

        return startContent(
            normalizedContentId,
            sectionIndex
        );

    }


    return updateContentProgress(
        normalizedContentId,
        currentProgress.progress,
        sectionIndex
    );

}


/* ==========================================================================
   Último conteúdo
========================================================================== */

function getLastContent() {

    const store =
        readProgressStore();


    const userProgress =
        getUserProgressStore(
            store
        );


    return (
        userProgress.lastContent ||
        null
    );

}


/* ==========================================================================
   Todos os conteúdos
========================================================================== */

function getAllContentProgress() {

    const store =
        readProgressStore();


    const userProgress =
        getUserProgressStore(
            store
        );


    return {
        ...userProgress.contents
    };

}


/* ==========================================================================
   Conteúdos por estado
========================================================================== */

function getContentsByStatus(
    status
) {

    const contents =
        getAllContentProgress();


    return Object.values(
        contents
    ).filter(
        (content) =>
            content.status === status
    );

}


/* ==========================================================================
   Conteúdos iniciados
========================================================================== */

function getStartedContents() {

    return getContentsByStatus(
        "started"
    );

}


/* ==========================================================================
   Conteúdos em andamento
========================================================================== */

function getInProgressContents() {

    return getContentsByStatus(
        "in_progress"
    );

}


/* ==========================================================================
   Conteúdos concluídos
========================================================================== */

function getCompletedContents() {

    return getContentsByStatus(
        "completed"
    );

}


/* ==========================================================================
   Quantidade de conteúdos iniciados
========================================================================== */

function getStartedContentCount() {

    const contents =
        getAllContentProgress();


    return Object.values(
        contents
    ).filter(
        (content) =>
            content.status !==
            "not_started"
    ).length;

}


/* ==========================================================================
   Quantidade em andamento
========================================================================== */

function getInProgressContentCount() {

    return getInProgressContents()
        .length;

}


/* ==========================================================================
   Quantidade concluída
========================================================================== */

function getCompletedContentCount() {

    return getCompletedContents()
        .length;

}


/* ==========================================================================
   Progresso médio
========================================================================== */

function getAverageProgress() {

    const contents =
        Object.values(
            getAllContentProgress()
        );


    if (!contents.length) {

        return 0;

    }


    const total =
        contents.reduce(
            (
                sum,
                content
            ) =>
                sum +
                normalizeProgress(
                    content.progress
                ),
            0
        );


    return Math.round(
        total /
        contents.length
    );

}


/* ==========================================================================
   Limpar progresso
========================================================================== */

function clearCurrentUserProgress() {

    const store =
        readProgressStore();


    const userId =
        getProgressUserId();


    if (
        store.users &&
        store.users[userId]
    ) {

        delete store.users[userId];

    }


    return writeProgressStore(
        store
    );

}


/* ==========================================================================
   API pública
========================================================================== */

window.VisiumProgress = {

    getCurrentUser:
        getProgressCurrentUser,

    getUserId:
        getProgressUserId,

    getContent:
        getContentProgress,

    start:
        startContent,

    update:
        updateContentProgress,

    registerAccess:
        registerContentAccess,

    getLastContent:
        getLastContent,

    getAll:
        getAllContentProgress,

    getByStatus:
        getContentsByStatus,

    getStarted:
        getStartedContents,

    getInProgress:
        getInProgressContents,

    getCompleted:
        getCompletedContents,

    getStartedCount:
        getStartedContentCount,

    getInProgressCount:
        getInProgressContentCount,

    getCompletedCount:
        getCompletedContentCount,

    getAverage:
        getAverageProgress,

    clear:
        clearCurrentUserProgress

};


/* ==========================================================================
   Diagnóstico
========================================================================== */

console.info(
    "Visium | Serviço de progresso carregado."
);