import { state } from "./state.js";
import { t } from "./i18n.js";
import { loadTheme, saveTheme, saveProgress, saveLangs } from "./storage.js";
import { rebuildPracticeQueue } from "./practice.js";

const elements = {
    themeToggle: null,
    themeToggleSettings: null,
    resetProgress: null,
    langTargetSelect: null,
    langUiSelect: null,
};

let onReset = null;
let onLangChange = null;

export function initSettings({ onReset: onResetCallback, onLangChange: onLangChangeCallback } = {}) {
    elements.themeToggle = document.querySelector("#theme-toggle");
    elements.themeToggleSettings = document.querySelector("#theme-toggle-settings");
    elements.resetProgress = document.querySelector("#reset-progress");
    elements.langTargetSelect = document.querySelector("#lang-target-select");
    elements.langUiSelect = document.querySelector("#lang-ui-select");

    onReset = onResetCallback || null;
    onLangChange = onLangChangeCallback || null;

    elements.themeToggle.addEventListener("click", toggleTheme);
    elements.themeToggleSettings.addEventListener("click", toggleTheme);
    elements.resetProgress.addEventListener("click", resetProgressState);

    if (elements.langTargetSelect) {
        elements.langTargetSelect.addEventListener("change", handleTargetChange);
    }
    if (elements.langUiSelect) {
        elements.langUiSelect.addEventListener("change", handleUiChange);
    }
}

export function applyTheme(theme) {
    document.body.dataset.theme = theme;
}

export function initTheme() {
    applyTheme(loadTheme());
}

export function populateLanguagePickers() {
    if (!elements.langTargetSelect || !elements.langUiSelect) return;

    elements.langTargetSelect.innerHTML = state.targetLanguages
        .map((code) => `<option value="${code}">${escapeHtml(t(`lang.name.${code}`))}</option>`)
        .join("");
    elements.langUiSelect.innerHTML = state.explainerLanguages
        .map((code) => `<option value="${code}">${escapeHtml(t(`lang.name.${code}`))}</option>`)
        .join("");

    elements.langTargetSelect.value = state.langs.target;
    elements.langUiSelect.value = state.langs.ui;
}

function handleTargetChange(event) {
    state.langs.target = event.target.value;
    saveLangs(state.langs);
    if (onLangChange) {
        onLangChange({ kind: "target" });
    }
}

async function handleUiChange(event) {
    state.langs.ui = event.target.value;
    saveLangs(state.langs);
    if (onLangChange) {
        onLangChange({ kind: "ui" });
    }
}

function toggleTheme() {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
}

function resetProgressState() {
    const confirmed = window.confirm(t("settings.resetConfirm"));
    if (!confirmed) {
        return;
    }

    state.progress[state.langs.target] = {};
    saveProgress(state.progress);
    rebuildPracticeQueue();
    if (onReset) {
        onReset();
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}
