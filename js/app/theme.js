"use strict";

(function () {

    const STORAGE_KEY = "visium_theme";
    const ZOOM_STORAGE_KEY = "visium_zoom";
    const DARK_THEME = "dark";
    const LIGHT_THEME = "light";
    const ZOOM_LEVELS = [90, 100, 110, 125, 150];

    function getStoredTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY);

        if (storedTheme === DARK_THEME || storedTheme === LIGHT_THEME) {
            return storedTheme;
        }

        return null;
    }

    function getPreferredTheme() {
        return LIGHT_THEME;
    }

    function applyTheme(theme) {
        const normalizedTheme = theme === DARK_THEME
            ? DARK_THEME
            : LIGHT_THEME;

        document.documentElement.dataset.theme = normalizedTheme;
        document.documentElement.style.colorScheme = normalizedTheme;

        return normalizedTheme;
    }

    function updateToggle(toggle, theme) {
        const darkThemeIsActive = theme === DARK_THEME;
        const nextThemeLabel = darkThemeIsActive
            ? "Ativar tema claro"
            : "Ativar tema escuro";

        toggle.setAttribute("aria-pressed", String(darkThemeIsActive));
        toggle.setAttribute("aria-label", nextThemeLabel);
        toggle.title = nextThemeLabel;
        toggle.querySelector("[data-theme-label]").textContent = darkThemeIsActive
            ? "Claro"
            : "Escuro";
    }

    function getZoomLevel() {
        const storedZoom = Number(
            localStorage.getItem(ZOOM_STORAGE_KEY)
        );

        return ZOOM_LEVELS.includes(storedZoom)
            ? storedZoom
            : 100;
    }

    function applyZoom(zoomLevel) {
        document.documentElement.style.fontSize = `${zoomLevel}%`;
        return zoomLevel;
    }

    function updateZoomControls(controls, zoomLevel) {
        const resetButton = controls.querySelector("[data-zoom-reset]");

        if (resetButton) {
            resetButton.textContent = `${zoomLevel}%`;
            resetButton.setAttribute("aria-label", `Restaurar tamanho do texto (${zoomLevel}%)`);
        }
    }

    function createZoomControls() {
        let controls = document.querySelector("[data-zoom-controls]");

        if (!controls) {
            const target = document.querySelector(
                ".app-header__left, .landing-header__actions, .terms-nav, .login-header, .register-header, .forgot-password-header"
            );

            if (!target) {
                return;
            }

            controls = document.createElement("div");
            controls.className = "app-header__tools";
            controls.dataset.zoomControls = "true";
            controls.setAttribute("aria-label", "Controles de tamanho do texto");
            controls.innerHTML = "<button type=\"button\" data-zoom-out aria-label=\"Diminuir tamanho do texto\">A-</button><button type=\"button\" data-zoom-reset aria-label=\"Restaurar tamanho do texto\">100%</button><button type=\"button\" data-zoom-in aria-label=\"Aumentar tamanho do texto\">A+</button>";

            const themeToggle =
                target.querySelector("[data-theme-toggle]");

            if (themeToggle) {
                target.insertBefore(
                    controls,
                    themeToggle.nextSibling
                );
            } else {
                target.appendChild(controls);
            }
        }

        if (controls.dataset.zoomInitialized === "true") {
            return;
        }

        controls.dataset.zoomInitialized = "true";
        const currentZoom = applyZoom(getZoomLevel());
        updateZoomControls(controls, currentZoom);

        controls.querySelector("[data-zoom-out]").addEventListener("click", function () {
            const currentIndex = ZOOM_LEVELS.indexOf(getZoomLevel());
            const nextZoom = ZOOM_LEVELS[Math.max(0, currentIndex - 1)];
            localStorage.setItem(ZOOM_STORAGE_KEY, String(nextZoom));
            updateZoomControls(controls, applyZoom(nextZoom));
        });

        controls.querySelector("[data-zoom-reset]").addEventListener("click", function () {
            localStorage.setItem(ZOOM_STORAGE_KEY, "100");
            updateZoomControls(controls, applyZoom(100));
        });

        controls.querySelector("[data-zoom-in]").addEventListener("click", function () {
            const currentIndex = ZOOM_LEVELS.indexOf(getZoomLevel());
            const nextZoom = ZOOM_LEVELS[Math.min(ZOOM_LEVELS.length - 1, currentIndex + 1)];
            localStorage.setItem(ZOOM_STORAGE_KEY, String(nextZoom));
            updateZoomControls(controls, applyZoom(nextZoom));
        });
    }

    function createToggle() {
        let toggle = document.querySelector("[data-theme-toggle]");

        if (!toggle) {
            const target = document.querySelector(
                ".app-header__right, .landing-header__actions, .terms-nav, .login-header, .register-header, .forgot-password-header"
            );

            if (!target) {
                return;
            }

            toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "theme-toggle";
            toggle.dataset.themeToggle = "true";
            toggle.innerHTML = "<span aria-hidden=\"true\">Tema</span><span data-theme-label></span>";
            target.appendChild(toggle);
        }

        if (
            toggle.dataset.themeInitialized ===
            "true"
        ) {
            return;
        }

        toggle.dataset.themeInitialized =
            "true";

        const currentTheme = applyTheme(getStoredTheme() || getPreferredTheme());
        updateToggle(toggle, currentTheme);

        toggle.addEventListener("click", function () {
            const nextTheme = document.documentElement.dataset.theme === DARK_THEME
                ? LIGHT_THEME
                : DARK_THEME;

            localStorage.setItem(STORAGE_KEY, nextTheme);
            updateToggle(toggle, applyTheme(nextTheme));
        });

    }

    applyTheme(getStoredTheme() || getPreferredTheme());
    applyZoom(getZoomLevel());

    document.addEventListener("DOMContentLoaded", function () {
        createToggle();
        createZoomControls();
    });

    const themeObserver =
        new MutationObserver(function () {
            createToggle();
            createZoomControls();
        });

    themeObserver.observe(
        document.body,
        {
            childList:
                true,

            subtree:
                true

        }
    );

})();
