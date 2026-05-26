import { loadProgress, loadLangs, hasLegacyUser } from "./storage.js";

const DEFAULT_LANGS = {
    ui: hasLegacyUser() ? "cs" : "en",
    target: "it",
};

export const state = {
    phrases: [],
    schema: 1,
    targetLanguages: ["it"],
    explainerLanguages: ["en", "cs"],
    defaultTop10: [],
    categories: [],
    progress: loadProgress(),
    langs: loadLangs(DEFAULT_LANGS),
    practice: {
        pack: "frequent",
        queue: [],
        index: 0,
        revealed: false,
    },
    quiz: {
        active: false,
        questions: [],
        index: 0,
        score: 0,
        answered: false,
    },
    filters: {
        search: "",
        category: "all",
        status: "all",
    },
};

export const DAILY_GOAL = 20;
