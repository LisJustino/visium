"use strict";

const PRIVACY_LOGIN_URL = "/pages/auth/login/login.html";

async function loadPrivacyHeader() {
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

async function initializePrivacy() {
    const user = await window.VisiumAuth?.getCurrentUser();

    if (!user) {
        window.location.replace(PRIVACY_LOGIN_URL);
        return;
    }

    await loadPrivacyHeader();
}

document.addEventListener("DOMContentLoaded", initializePrivacy);