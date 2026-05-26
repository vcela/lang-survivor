import { state } from "./state.js";
import { t } from "./i18n.js";

const PRIMARY_FALLBACK_LANG = "en";
const SECONDARY_FALLBACK_LANG = "cs";

export async function loadPhrases() {
    const response = await fetch("data/phrases.json", { cache: "no-store" });
    if (!response.ok) {
        throw new Error(t("errors.loadPhrases"));
    }

    const data = await response.json();
    state.phrases = Array.isArray(data.phrases) ? data.phrases : [];
    state.schema = data.version || 1;
    state.targetLanguages = data.target_languages || ["it"];
    state.explainerLanguages = data.explainer_languages || ["en", "cs"];
    state.defaultTop10 = data.default_top10 || [];
    state.categories = data.categories || inferCategories(state.phrases);
}

function inferCategories(phrases) {
    const seen = new Set();
    const order = [];
    phrases.forEach((phrase) => {
        if (!seen.has(phrase.category)) {
            seen.add(phrase.category);
            order.push(phrase.category);
        }
    });
    return order;
}

function pickTranslation(phrase, lang) {
    if (!phrase || !phrase.translations) {
        return null;
    }
    return phrase.translations[lang]
        || phrase.translations[PRIMARY_FALLBACK_LANG]
        || phrase.translations[SECONDARY_FALLBACK_LANG]
        || null;
}

export function getTargetTranslation(phrase) {
    return pickTranslation(phrase, state.langs.target);
}

export function getUiTranslation(phrase) {
    return pickTranslation(phrase, state.langs.ui);
}

export function getTargetText(phrase) {
    return getTargetTranslation(phrase)?.text || "";
}

export function getTargetPron(phrase) {
    return getTargetTranslation(phrase)?.pron || "";
}

export function getUiText(phrase) {
    return getUiTranslation(phrase)?.text || "";
}

export function isTargetVerified(phrase) {
    const translation = getTargetTranslation(phrase);
    if (!translation) return true;
    return translation.verified !== false;
}

export function getNote(phrase) {
    if (!phrase || !phrase.notes) {
        return "";
    }
    return phrase.notes[state.langs.ui]
        || phrase.notes[PRIMARY_FALLBACK_LANG]
        || phrase.notes[SECONDARY_FALLBACK_LANG]
        || "";
}

export function getCategoryLabel(slug) {
    return t(`category.${slug}`);
}

export function getFrequencyLabel(slug) {
    return t(`frequency.${slug}`);
}

function getLangProgress() {
    return state.progress[state.langs.target] || {};
}

export function getPhraseProgress(phraseId) {
    return getLangProgress()[phraseId] || {
        seen: false,
        known: false,
        hard: false,
        favorite: false,
        correct: 0,
        incorrect: 0,
        attempts: 0,
        lastSeen: null,
    };
}

export function setCurrentPhraseProgress(phraseId, progress) {
    if (!state.progress[state.langs.target]) {
        state.progress[state.langs.target] = {};
    }
    state.progress[state.langs.target][phraseId] = progress;
}

export function getFilteredPhrases() {
    const search = state.filters.search;
    return state.phrases.filter((phrase) => {
        const progress = getPhraseProgress(phrase.id);
        const matchesSearch = !search
            || getUiText(phrase).toLowerCase().includes(search)
            || getTargetText(phrase).toLowerCase().includes(search)
            || getTargetPron(phrase).toLowerCase().includes(search);
        const matchesCategory = state.filters.category === "all" || phrase.category === state.filters.category;
        const matchesStatus = matchesStatusFilter(progress, state.filters.status);
        return matchesSearch && matchesCategory && matchesStatus;
    });
}

function matchesStatusFilter(progress, filter) {
    if (filter === "all") return true;
    if (filter === "known") return Boolean(progress.known);
    if (filter === "hard") return Boolean(progress.hard);
    if (filter === "favorite") return Boolean(progress.favorite);
    if (filter === "unseen") return !progress.seen;
    return true;
}

export function buildCategoryStats() {
    const byCategory = new Map();
    state.phrases.forEach((phrase) => {
        const current = byCategory.get(phrase.category) || {
            slug: phrase.category,
            name: getCategoryLabel(phrase.category),
            total: 0,
            known: 0,
        };
        current.total += 1;
        if (getPhraseProgress(phrase.id).known) {
            current.known += 1;
        }
        byCategory.set(phrase.category, current);
    });
    return [...byCategory.values()].map((category) => ({
        ...category,
        progressPercent: category.total ? Math.round((category.known / category.total) * 100) : 0,
    }));
}

export function getStats() {
    const progressValues = Object.values(getLangProgress());
    return {
        total: state.phrases.length,
        known: progressValues.filter((item) => item.known).length,
        hard: progressValues.filter((item) => item.hard).length,
        favorite: progressValues.filter((item) => item.favorite).length,
        todayAttempts: getTodayAttempts(),
    };
}

export function getTodayAttempts() {
    const today = new Date().toISOString().slice(0, 10);
    return Object.values(getLangProgress()).filter((item) => item.lastSeen?.startsWith(today)).length;
}
