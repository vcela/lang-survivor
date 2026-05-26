const OLD_PROGRESS_KEY = "italiano-prakticky-progress";
const OLD_THEME_KEY = "italiano-prakticky-theme";

export const STORAGE_KEYS = {
    progress: "traveltalk-progress",
    theme: "traveltalk-theme",
    langs: "traveltalk-langs",
    session: "traveltalk-session",
    top10: "traveltalk-top10",
};

export function migrateLegacyStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.progress) && localStorage.getItem(OLD_PROGRESS_KEY)) {
        localStorage.setItem(STORAGE_KEYS.progress, localStorage.getItem(OLD_PROGRESS_KEY));
    }
    if (!localStorage.getItem(STORAGE_KEYS.theme) && localStorage.getItem(OLD_THEME_KEY)) {
        localStorage.setItem(STORAGE_KEYS.theme, localStorage.getItem(OLD_THEME_KEY));
    }
}

export function hasLegacyUser() {
    return Boolean(
        localStorage.getItem(OLD_PROGRESS_KEY)
        || localStorage.getItem(STORAGE_KEYS.progress)
    );
}

export function loadProgress() {
    const raw = localStorage.getItem(STORAGE_KEYS.progress)
        ?? localStorage.getItem(OLD_PROGRESS_KEY)
        ?? "{}";
    try {
        const parsed = JSON.parse(raw) || {};
        return migrateProgressToPerLang(parsed);
    } catch {
        return {};
    }
}

function migrateProgressToPerLang(data) {
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
        return {};
    }
    // Old flat format has phrase-id keys (contain "-"). New format has 2-letter lang codes.
    const firstKey = Object.keys(data)[0];
    if (firstKey && firstKey.includes("-")) {
        return { it: data };
    }
    return data;
}

export function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

export function loadTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme)
        ?? localStorage.getItem(OLD_THEME_KEY)
        ?? "light";
}

export function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function loadLangs(defaults) {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.langs) || "null");
        if (stored && stored.ui && stored.target) {
            return stored;
        }
    } catch {
        // ignore
    }
    return defaults;
}

export function saveLangs(langs) {
    localStorage.setItem(STORAGE_KEYS.langs, JSON.stringify(langs));
}

export function loadTop10() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.top10);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function saveTop10(ids) {
    localStorage.setItem(STORAGE_KEYS.top10, JSON.stringify(ids));
}
