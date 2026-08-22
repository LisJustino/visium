"use strict";

const FAQ_LOGIN_URL = "/pages/auth/login/login.html";

async function loadFaqHeader() {
    const container = document.querySelector("#appHeaderContainer");

    if (!container) {
        return;
    }

        const response = await fetch("/components/header/header.html?v=20260824");

    if (!response.ok) {
        throw new Error("Não foi possível carregar o cabeçalho.");
    }

    container.innerHTML = await response.text();
}

async function initializeFaq() {
    const user = await window.VisiumAuth?.getCurrentUser();

    if (!user) {
        window.location.replace(FAQ_LOGIN_URL);
        return;
    }

    await loadFaqHeader();
}

document.addEventListener("DOMContentLoaded", initializeFaq);