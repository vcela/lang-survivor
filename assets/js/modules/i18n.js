const SUPPORTED_UI_LANGS = ["en", "cs", "de", "es"];
const FALLBACK_LANG = "en";

let dict = {};
let fallbackDict = {};
let currentLang = FALLBACK_LANG;

export function getSupportedUiLangs() {
    return [...SUPPORTED_UI_LANGS];
}

export function getCurrentUiLang() {
    return currentLang;
}

export async function loadI18n(lang) {
    const target = SUPPORTED_UI_LANGS.includes(lang) ? lang : FALLBACK_LANG;
    dict = await fetchDict(target);

    if (target !== FALLBACK_LANG && !Object.keys(fallbackDict).length) {
        fallbackDict = await fetchDict(FALLBACK_LANG);
    } else if (target === FALLBACK_LANG) {
        fallbackDict = dict;
    }

    currentLang = target;
    document.documentElement.lang = target;
    applyDomBindings();
}

async function fetchDict(lang) {
    const response = await fetch(`data/i18n/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to load i18n dictionary for "${lang}".`);
    }
    return response.json();
}

export function t(key, vars = {}) {
    const raw = dict[key] ?? fallbackDict[key] ?? key;
    return raw.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? vars[name] : `{${name}}`));
}

export function applyDomBindings(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });

    root.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        const directives = element.dataset.i18nAttr.split(";");
        directives.forEach((directive) => {
            const [attr, key] = directive.split(":").map((value) => value.trim());
            if (attr && key) {
                element.setAttribute(attr, t(key));
            }
        });
    });
}
