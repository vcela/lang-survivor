import { state } from "./state.js";
import { t } from "./i18n.js";
import { escapeHtml, escapeAttribute, iconBookmark, iconCheck, iconAlert } from "./dom.js";
import {
    getFilteredPhrases,
    getPhraseProgress,
    setCurrentPhraseProgress,
    getTargetText,
    getUiText,
    getTargetPron,
    getNote,
    getCategoryLabel,
    getFrequencyLabel,
    isTargetVerified,
} from "./phrases.js";
import { saveProgress } from "./storage.js";
import { rebuildPracticeQueue } from "./practice.js";

const elements = {
    searchInput: null,
    categoryFilter: null,
    statusFilter: null,
    phraseResultsMeta: null,
    phraseList: null,
};

let onProgressChange = null;

export function initCatalog({ onChange } = {}) {
    elements.searchInput = document.querySelector("#search-input");
    elements.categoryFilter = document.querySelector("#category-filter");
    elements.statusFilter = document.querySelector("#status-filter");
    elements.phraseResultsMeta = document.querySelector("#phrase-results-meta");
    elements.phraseList = document.querySelector("#phrase-list");

    onProgressChange = onChange || null;

    elements.searchInput.addEventListener("input", (event) => {
        state.filters.search = event.target.value.trim().toLowerCase();
        renderPhraseCatalog();
    });

    elements.categoryFilter.addEventListener("change", (event) => {
        state.filters.category = event.target.value;
        renderPhraseCatalog();
    });

    elements.statusFilter.addEventListener("change", (event) => {
        state.filters.status = event.target.value;
        renderPhraseCatalog();
    });
}

export function populateCategoryFilter() {
    const placeholder = elements.categoryFilter.querySelector('option[value="all"]');
    elements.categoryFilter.innerHTML = "";
    if (placeholder) {
        elements.categoryFilter.appendChild(placeholder);
    }

    state.categories.forEach((slug) => {
        const option = document.createElement("option");
        option.value = slug;
        option.textContent = getCategoryLabel(slug);
        elements.categoryFilter.appendChild(option);
    });
}

export function renderPhraseCatalog() {
    const filtered = getFilteredPhrases();
    elements.phraseResultsMeta.textContent = t("catalog.shown", {
        shown: filtered.length,
        total: state.phrases.length,
    });
    elements.phraseList.innerHTML = filtered.map(renderPhraseCard).join("");

    elements.phraseList.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("click", handlePhraseAction);
    });
}

function renderPhraseCard(phrase) {
    const progress = getPhraseProgress(phrase.id);
    const statusTags = [];

    if (progress.known) {
        statusTags.push(`<span class="tag tag-sea">${escapeHtml(t("status.known"))}</span>`);
    }
    if (progress.hard) {
        statusTags.push(`<span class="tag">${escapeHtml(t("status.hard"))}</span>`);
    }
    if (progress.favorite) {
        statusTags.push(`<span class="tag tag-sea">${escapeHtml(t("status.favorite"))}</span>`);
    }

    const unverifiedBadge = !isTargetVerified(phrase)
        ? `<span class="tag tag-unverified" title="${escapeAttribute(t("phrase.unverifiedTitle"))}">${escapeHtml(t("phrase.unverified"))}</span>`
        : "";

    return `
        <article class="phrase-card">
            <div class="phrase-heading">
                <div>
                    <strong class="phrase-primary">${escapeHtml(getTargetText(phrase))}</strong>
                    <div class="phrase-subtitle">${escapeHtml(getUiText(phrase))}</div>
                </div>
                <div class="phrase-tags">
                    ${unverifiedBadge}
                    <span class="tag ${phrase.frequency === "very-common" ? "tag-sea" : ""}">${escapeHtml(getFrequencyLabel(phrase.frequency))}</span>
                </div>
            </div>
            <div class="metric-caption">${escapeHtml(t("catalog.pronunciation", { value: getTargetPron(phrase) }))}</div>
            <div class="metric-caption">${escapeHtml(t("catalog.notePrefix", { value: getNote(phrase) }))}</div>
            <div class="tag-row">
                <span class="tag">${escapeHtml(getCategoryLabel(phrase.category))}</span>
                <span class="tag">${escapeHtml(t("catalog.difficulty", { value: phrase.difficulty }))}</span>
                ${statusTags.join("")}
            </div>
            <div class="phrase-actions">
                <button class="phrase-action-icon ${progress.favorite ? "is-active" : ""}" type="button" data-action="toggle-favorite" data-id="${escapeAttribute(phrase.id)}" aria-label="${escapeAttribute(t("status.favorite"))}" title="${escapeAttribute(t("status.favorite"))}">${iconBookmark()}</button>
                <button class="phrase-action-icon ${progress.known ? "is-active" : ""}" type="button" data-action="mark-known" data-id="${escapeAttribute(phrase.id)}" aria-label="${escapeAttribute(t("status.known"))}" title="${escapeAttribute(t("status.known"))}">${iconCheck()}</button>
                <button class="phrase-action-icon ${progress.hard ? "is-active" : ""}" type="button" data-action="mark-hard" data-id="${escapeAttribute(phrase.id)}" aria-label="${escapeAttribute(t("status.hard"))}" title="${escapeAttribute(t("status.hard"))}">${iconAlert()}</button>
            </div>
        </article>
    `;
}

function handlePhraseAction(event) {
    const action = event.currentTarget.dataset.action;
    const phraseId = event.currentTarget.dataset.id;
    const progress = getPhraseProgress(phraseId);

    if (action === "toggle-favorite") {
        setCurrentPhraseProgress(phraseId, { ...progress, favorite: !progress.favorite });
    }
    if (action === "mark-known") {
        setCurrentPhraseProgress(phraseId, { ...progress, known: true, hard: false, seen: true });
    }
    if (action === "mark-hard") {
        setCurrentPhraseProgress(phraseId, { ...progress, known: false, hard: true, seen: true });
    }

    saveProgress(state.progress);
    rebuildPracticeQueue();
    if (onProgressChange) {
        onProgressChange();
    }
}
