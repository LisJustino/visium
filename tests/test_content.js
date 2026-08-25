"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const context = { window: {} };
vm.createContext(context);

for (const file of [
    "data/content/montagem.js",
    "data/content/surfacagem-multifocal-bifocal.js"
]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, {
        filename: file
    });
}

const montagem = context.window.VisiumContent.montagem;
const surfacagem = context.window.VisiumContent["surfacagem-multifocal-bifocal"];

assert.notDeepEqual(
    montagem.sections.map((section) => section.title),
    surfacagem.sections.map((section) => section.title)
);
assert.match(montagem.description, /montagem/i);
assert.match(surfacagem.description, /surfa/i);

console.log("content modules ok");
