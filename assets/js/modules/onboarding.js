import { state } from "./state.js";
import { t } from "./i18n.js";
import { saveLangs, STORAGE_KEYS } from "./storage.js";

const elements = {
    modal: null,
    targetSelect: null,
    uiSelect: null,
    startBtn: null,
};

let onComplete = null;

export function initOnboarding({ onComplete: cb } = {}) {
    elements.modal = document.querySelector("#onboarding-modal");
    elements.targetSelect = document.querySelector("#onboarding-target");
    elements.uiSelect = document.querySelector("#onboarding-ui");
    elements.startBtn = document.querySelector("#onboarding-start");

    onComplete = cb || null;

    elements.startBtn.addEventListener("click", complete);
}

export function shouldShowOnboarding() {
    return !localStorage.getItem(STORAGE_KEYS.langs);
}

function detectBrowserLang() {
    const code = (navigator.language || navigator.languages?.[0] || "en").slice(0, 2).toLowerCase();
    const supported = ["en", "cs", "de", "es"];
    return supported.includes(code) ? code : "en";
}

export function showOnboarding() {
    populateSelects();
    elements.targetSelect.value = state.langs.target;
    elements.uiSelect.value = detectBrowserLang();
    elements.modal.hidden = false;
    elements.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function populateSelects() {
    elements.targetSelect.innerHTML = state.targetLanguages
        .map((code) => `<option value="${code}">${escape(t(`lang.name.${code}`))}</option>`)
        .join("");
    elements.uiSelect.innerHTML = state.explainerLanguages
        .map((code) => `<option value="${code}">${escape(t(`lang.name.${code}`))}</option>`)
        .join("");
}

function escape(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}

function complete() {
    state.langs.target = elements.targetSelect.value;
    state.langs.ui = elements.uiSelect.value;
    saveLangs(state.langs);

    elements.modal.hidden = true;
    elements.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (onComplete) {
        onComplete();
    }
}
