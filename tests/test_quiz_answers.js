"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const context = {
    window: {},
    document: {
        addEventListener() {}
    }
};

vm.createContext(context);

const source = `${fs.readFileSync("pages/app/quizzes/quiz.js", "utf8")}
window.__TEST_QUIZ_DATA = QUIZ_DATA;`;

vm.runInContext(source, context, {
    filename: "pages/app/quizzes/quiz.js"
});

const questions = Object.values(context.window.__TEST_QUIZ_DATA)
    .flatMap((quiz) => quiz.questions);

assert.ok(questions.length > 0);

const distribution = [0, 0, 0, 0];

for (const question of questions) {
    assert.ok(Array.isArray(question.options));
    assert.ok(question.options.length > 0);
    assert.ok(Number.isInteger(question.correct));
    assert.ok(question.correct >= 0);
    assert.ok(question.correct < question.options.length);

    if (question.correct < distribution.length) {
        distribution[question.correct] += 1;
    }
}

const total = questions.length;
const firstOptionShare = distribution[0] / total;

assert.ok(
    firstOptionShare <= 0.4,
    `correct answers are still concentrated on A: ${distribution.join(", ")}`
);

assert.ok(
    distribution.filter((count) => count > 0).length >= 4,
    `correct answers should use A, B, C and D: ${distribution.join(", ")}`
);

console.log("quiz answers balanced");
