import { state } from "./state.js";
import { t } from "./i18n.js";
import { escapeHtml, escapeAttribute, shuffle } from "./dom.js";
import {
    getPhraseProgress,
    setCurrentPhraseProgress,
    getTargetText,
    getUiText,
    getTargetPron,
    getNote,
    getCategoryLabel,
} from "./phrases.js";
import { saveProgress } from "./storage.js";
import { navigateTo } from "./router.js";

const elements = {
    practicePack: null,
    practiceLabel: null,
    practiceCounter: null,
    practiceBody: null,
    revealAnswer: null,
    markKnown: null,
    markHard: null,
    markFavorite: null,
    markLater: null,
};

let onProgressChange = null;

export function initPractice({ onChange } = {}) {
    elements.practicePack = document.querySelector("#practice-pack");
    elements.practiceLabel = document.querySelector("#practice-label");
    elements.practiceCounter = document.querySelector("#practice-counter");
    elements.practiceBody = document.querySelector("#practice-body");
    elements.revealAnswer = document.querySelector("#reveal-answer");
    elements.markKnown = document.querySelector("#mark-known");
    elements.markHard = document.querySelector("#mark-hard");
    elements.markFavorite = document.querySelector("#mark-favorite");
    elements.markLater = document.querySelector("#mark-later");

    onProgressChange = onChange || null;

    elements.practicePack.addEventListener("change", (event) => {
        state.practice.pack = event.target.value;
        rebuildPracticeQueue();
        renderPractice();
    });

    elements.revealAnswer.addEventListener("click", () => {
        state.practice.revealed = true;
        renderPractice();
    });

    elements.markKnown.addEventListener("click", () => {
        updateCurrentPracticePhrase({ known: true, hard: false, correct: 1 });
    });

    elements.markHard.addEventListener("click", () => {
        updateCurrentPracticePhrase({ known: false, hard: true, incorrect: 1 });
    });

    elements.markFavorite.addEventListener("click", () => {
        toggleCurrentPracticeFavorite();
    });

    elements.markLater.addEventListener("click", () => {
        advancePractice();
    });
}

export function populatePracticePack() {
    const baseOptions = [
        { value: "frequent", labelKey: "practice.pack.frequent" },
        { value: "all", labelKey: "practice.pack.all" },
        { value: "hard", labelKey: "practice.pack.hard" },
        { value: "favorites", labelKey: "practice.pack.favorites" },
    ];
    const categoryOptions = state.categories.map((slug) => ({
        value: `category:${slug}`,
        label: getCategoryLabel(slug),
    }));

    elements.practicePack.innerHTML = [
        ...baseOptions.map((option) => `<option value="${escapeAttribute(option.value)}">${escapeHtml(t(option.labelKey))}</option>`),
        ...categoryOptions.map((option) => `<option value="${escapeAttribute(option.value)}">${escapeHtml(option.label)}</option>`),
    ].join("");
    elements.practicePack.value = state.practice.pack;
}

export function renderPractice() {
    const queue = state.practice.queue;
    const current = queue[state.practice.index];
    elements.practiceLabel.textContent = t("practice.packLabel", { value: getPackLabel(state.practice.pack) });
    elements.practiceCounter.textContent = queue.length
        ? t("practice.counter", { current: state.practice.index + 1, total: queue.length })
        : t("practice.counter", { current: 0, total: 0 });

    if (!current) {
        elements.practiceBody.innerHTML = `<p class="placeholder-note">${escapeHtml(t("practice.empty"))}</p>`;
        elements.revealAnswer.hidden = true;
        elements.markKnown.hidden = true;
        elements.markLater.hidden = true;
        elements.markHard.hidden = true;
        elements.markFavorite.hidden = true;
        elements.markFavorite.classList.remove("is-active");
        return;
    }

    const currentProgress = getPhraseProgress(current.id);
    elements.revealAnswer.hidden = state.practice.revealed;
    elements.markKnown.hidden = !state.practice.revealed;
    elements.markLater.hidden = !state.practice.revealed;
    elements.markHard.hidden = !state.practice.revealed;
    elements.markFavorite.hidden = false;
    elements.markFavorite.classList.toggle("is-active", currentProgress.favorite);

    const answerBlock = state.practice.revealed
        ? `
            <div class="answer-block">
                <p class="answer-label">${escapeHtml(t("practice.answerLabel"))}</p>
                <p class="answer-main">${escapeHtml(getTargetText(current))}</p>
                <p class="answer-secondary">${escapeHtml(getTargetPron(current))}</p>
                <p class="answer-secondary">${escapeHtml(getNote(current))}</p>
            </div>
        `
        : `<p class="placeholder-note">${escapeHtml(t("practice.beforeReveal"))}</p>`;

    elements.practiceBody.innerHTML = `
        <div class="prompt-block">
            <p class="prompt-label">${escapeHtml(t("practice.promptLabel"))}</p>
            <p class="prompt-text">${escapeHtml(getUiText(current))}</p>
            <p class="answer-secondary">${escapeHtml(t("practice.categoryPrefix", { value: getCategoryLabel(current.category) }))}</p>
        </div>
        ${answerBlock}
    `;
}

function updateCurrentPracticePhrase(change) {
    const phrase = state.practice.queue[state.practice.index];
    if (!phrase) {
        return;
    }

    const progress = getPhraseProgress(phrase.id);
    const nextProgress = {
        ...progress,
        seen: true,
        known: change.known ?? progress.known,
        hard: change.hard ?? progress.hard,
        favorite: progress.favorite,
        correct: progress.correct + (change.correct || 0),
        incorrect: progress.incorrect + (change.incorrect || 0),
        lastSeen: new Date().toISOString(),
        attempts: progress.attempts + 1,
    };

    setCurrentPhraseProgress(phrase.id, nextProgress);
    saveProgress(state.progress);
    rebuildPracticeQueue();
    if (onProgressChange) {
        onProgressChange();
    }
}

function advancePractice() {
    if (!state.practice.queue.length) {
        return;
    }
    state.practice.index = (state.practice.index + 1) % state.practice.queue.length;
    state.practice.revealed = false;
    renderPractice();
}

function toggleCurrentPracticeFavorite() {
    const phrase = state.practice.queue[state.practice.index];
    if (!phrase) {
        return;
    }

    const progress = getPhraseProgress(phrase.id);
    setCurrentPhraseProgress(phrase.id, {
        ...progress,
        favorite: !progress.favorite,
        seen: true,
    });

    saveProgress(state.progress);
    rebuildPracticeQueue();
    if (onProgressChange) {
        onProgressChange();
    }
}

export function rebuildPracticeQueue() {
    const pack = state.practice.pack;
    const previousPhrase = state.practice.queue[state.practice.index];

    let queue = [];

    if (pack === "frequent") {
        queue = state.phrases.filter((phrase) => phrase.frequency === "very-common");
    } else if (pack === "hard") {
        queue = state.phrases.filter((phrase) => getPhraseProgress(phrase.id).hard);
    } else if (pack === "favorites") {
        queue = state.phrases.filter((phrase) => getPhraseProgress(phrase.id).favorite);
    } else if (pack.startsWith("category:")) {
        const category = pack.slice("category:".length);
        queue = state.phrases.filter((phrase) => phrase.category === category);
    } else {
        queue = [...state.phrases];
    }

    queue = queue.filter((phrase) => !getPhraseProgress(phrase.id).known);
    state.practice.queue = shuffle(queue);
    state.practice.index = findNextPracticeIndex(state.practice.queue, previousPhrase?.id);
    state.practice.revealed = false;
}

function findNextPracticeIndex(queue, previousPhraseId) {
    if (!queue.length || !previousPhraseId) {
        return 0;
    }
    const nextIndex = queue.findIndex((phrase) => phrase.id !== previousPhraseId);
    return nextIndex >= 0 ? nextIndex : 0;
}

export function getPackLabel(pack) {
    const labelMap = {
        frequent: "practice.pack.frequent",
        all: "practice.pack.all",
        hard: "practice.pack.hard",
        favorites: "practice.pack.favorites",
    };
    if (labelMap[pack]) {
        return t(labelMap[pack]);
    }
    if (pack.startsWith("category:")) {
        const slug = pack.slice("category:".length);
        return getCategoryLabel(slug);
    }
    return t("practice.pack.frequent");
}

export function openPracticePack(pack) {
    state.practice.pack = pack;
    elements.practicePack.value = pack;
    rebuildPracticeQueue();
    renderPractice();
    navigateTo("practice");
}
