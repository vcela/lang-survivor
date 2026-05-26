import { state } from "./state.js";
import { t } from "./i18n.js";
import { escapeHtml } from "./dom.js";
import {
    getPhraseProgress,
    getTargetText,
    getUiText,
    getTargetPron,
} from "./phrases.js";

const elements = {
    favoriteList: null,
    hardList: null,
};

export function initSaved() {
    elements.favoriteList = document.querySelector("#favorite-list");
    elements.hardList = document.querySelector("#hard-list");
}

export function renderSaved() {
    const favorites = state.phrases.filter((phrase) => getPhraseProgress(phrase.id).favorite);
    const hard = state.phrases.filter((phrase) => getPhraseProgress(phrase.id).hard);

    elements.favoriteList.innerHTML = favorites.length
        ? favorites.map(renderSavedItem).join("")
        : `<p class="placeholder-note">${escapeHtml(t("saved.emptyFavorites"))}</p>`;
    elements.hardList.innerHTML = hard.length
        ? hard.map(renderSavedItem).join("")
        : `<p class="placeholder-note">${escapeHtml(t("saved.emptyHard"))}</p>`;
}

function renderSavedItem(phrase) {
    return `
        <article class="saved-item">
            <strong>${escapeHtml(getTargetText(phrase))}</strong>
            <div>${escapeHtml(getUiText(phrase))}</div>
            <div class="metric-caption">${escapeHtml(getTargetPron(phrase))}</div>
        </article>
    `;
}
