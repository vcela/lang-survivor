import { state } from "./state.js";
import { t } from "./i18n.js";
import { escapeHtml, escapeAttribute, shuffle } from "./dom.js";
import { getTargetText, getUiText } from "./phrases.js";

const elements = {
    quizBody: null,
    startQuiz: null,
};

export function initQuiz() {
    elements.quizBody = document.querySelector("#quiz-body");
    elements.startQuiz = document.querySelector("#start-quiz");

    elements.startQuiz.addEventListener("click", startQuiz);
}

export function renderQuizIntro() {
    elements.quizBody.innerHTML = `
        <div>
            <p class="eyebrow">${escapeHtml(t("quiz.fiveQuestions"))}</p>
            <p class="quiz-question">${escapeHtml(t("quiz.intro"))}</p>
            <p class="quiz-subtitle">${escapeHtml(t("quiz.introNote"))}</p>
        </div>
    `;
}

function startQuiz() {
    const pool = shuffle([...state.phrases.filter((phrase) => phrase.frequency === "very-common")]).slice(0, 5);
    state.quiz = {
        active: true,
        questions: pool.map(createQuizQuestion),
        index: 0,
        score: 0,
        answered: false,
    };

    renderQuizQuestion();
}

function createQuizQuestion(correctPhrase) {
    const distractors = shuffle(state.phrases.filter((phrase) => phrase.id !== correctPhrase.id))
        .slice(0, 3)
        .map((phrase) => getTargetText(phrase));

    return {
        prompt: getUiText(correctPhrase),
        correct: getTargetText(correctPhrase),
        options: shuffle([getTargetText(correctPhrase), ...distractors]),
    };
}

function renderQuizQuestion() {
    const question = state.quiz.questions[state.quiz.index];

    if (!question) {
        elements.quizBody.innerHTML = `
            <div>
                <p class="eyebrow">${escapeHtml(t("quiz.done"))}</p>
                <p class="quiz-question">${escapeHtml(t("quiz.score", { score: state.quiz.score, total: state.quiz.questions.length }))}</p>
                <p class="quiz-subtitle">${escapeHtml(t("quiz.again"))}</p>
            </div>
        `;
        return;
    }

    elements.quizBody.innerHTML = `
        <div>
            <p class="eyebrow">${escapeHtml(t("quiz.questionOf", { current: state.quiz.index + 1, total: state.quiz.questions.length }))}</p>
            <p class="quiz-question">${escapeHtml(t("quiz.prompt", { phrase: question.prompt }))}</p>
        </div>
        <div class="list-stack">
            ${question.options.map((option) => `
                <button class="quiz-option" type="button" data-option="${escapeAttribute(option)}">${escapeHtml(option)}</button>
            `).join("")}
        </div>
    `;

    elements.quizBody.querySelectorAll("[data-option]").forEach((button) => {
        button.addEventListener("click", () => evaluateQuizAnswer(button.dataset.option || ""));
    });
}

function evaluateQuizAnswer(selectedOption) {
    if (state.quiz.answered) {
        return;
    }

    state.quiz.answered = true;
    const question = state.quiz.questions[state.quiz.index];

    elements.quizBody.querySelectorAll("[data-option]").forEach((button) => {
        const option = button.dataset.option || "";
        if (option === question.correct) {
            button.classList.add("correct");
        }
        if (option === selectedOption && option !== question.correct) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedOption === question.correct) {
        state.quiz.score += 1;
    }

    window.setTimeout(() => {
        state.quiz.index += 1;
        state.quiz.answered = false;
        renderQuizQuestion();
    }, 700);
}
