"use strict";

(function initializeEmailSuggestions() {
    const providers = [
        "gmail.com",
        "outlook.com",
        "hotmail.com",
        "yahoo.com.br",
        "icloud.com"
    ];

    document.querySelectorAll('input[type="email"]').forEach((input, index) => {
        const listId = `emailSuggestions-${index}`;
        const list = document.createElement("datalist");

        list.id = listId;
        input.setAttribute("list", listId);
        input.parentElement.appendChild(list);

        input.addEventListener("input", () => {
            const localPart = input.value.split("@")[0].trim();
            const hasAtSymbol = input.value.includes("@");

            list.replaceChildren();

            if (!localPart || !hasAtSymbol) {
                return;
            }

            providers.forEach(provider => {
                const option = document.createElement("option");
                option.value = `${localPart}@${provider}`;
                list.appendChild(option);
            });
        });
    });
})();
