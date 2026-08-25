"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const context = { window: {} };
vm.createContext(context);

for (const file of [
    "data/content/montagem.js",
    "data/content/surfacagem-multifocal-bifocal.js",
    "data/content/lentes-contato.js",
    "data/content/acuidade-visual.js"
]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, {
        filename: file
    });
}

const montagem = context.window.VisiumContent.montagem;
const surfacagem = context.window.VisiumContent["surfacagem-multifocal-bifocal"];
const lentes = context.window.VisiumContent["lentes-contato"];
const acuidade = context.window.VisiumContent["acuidade-visual"];

assert.notDeepEqual(
    montagem.sections.map((section) => section.title),
    surfacagem.sections.map((section) => section.title)
);
assert.match(montagem.description, /montagem/i);
assert.match(surfacagem.description, /surfa/i);
assert.equal(
    Array.from(acuidade.sections, (section) => section.title).join("|"),
    "Acuidade visual|Optotipos"
);
assert.equal(lentes.sections.length, 8);
assert.equal(
    lentes.sections.some((section) => section.id === "optotipos"),
    false
);

console.log("content modules ok");
