import { state } from "./modules/state.js";
import { migrateLegacyStorage } from "./modules/storage.js";
import { loadI18n, getCurrentUiLang } from "./modules/i18n.js";
import { loadPhrases } from "./modules/phrases.js";
import { initRouter, handleRoute } from "./modules/router.js";
import { initTheme, initSettings, populateLanguagePickers } from "./modules/settings.js";
import { initHome, renderHome } from "./modules/home.js";
import { initCatalog, renderPhraseCatalog, populateCategoryFilter } from "./modules/catalog.js";
import { initPractice, renderPractice, populatePracticePack, rebuildPracticeQueue } from "./modules/practice.js";
import { initQuiz, renderQuizIntro } from "./modules/quiz.js";
import { initSaved, renderSaved } from "./modules/saved.js";
import { initProgress, renderProgress, renderDailyGoal } from "./modules/progress.js";
import { initOnboarding, shouldShowOnboarding, showOnboarding } from "./modules/onboarding.js";

migrateLegacyStorage();
initialize();

async function initialize() {
    initTheme();

    await loadI18n(state.langs.ui);
    await loadPhrases();

    initRouter();
    initHome();
    initCatalog({ onChange: renderAll });
    initPractice({ onChange: renderAll });
    initQuiz();
    initSaved();
    initProgress();
    initSettings({ onReset: renderAll, onLangChange: handleLangChange });
    initOnboarding({ onComplete: handleOnboardingComplete });

    populateCategoryFilter();
    populatePracticePack();
    populateLanguagePickers();
    rebuildPracticeQueue();
    renderAll();
    handleRoute();

    if (shouldShowOnboarding()) {
        showOnboarding();
    }
}

async function handleLangChange({ kind }) {
    if (kind === "ui") {
        await loadI18n(state.langs.ui);
        populateCategoryFilter();
        populatePracticePack();
        populateLanguagePickers();
    }
    rebuildPracticeQueue();
    renderAll();
}

async function handleOnboardingComplete() {
    await loadI18n(state.langs.ui);
    populateCategoryFilter();
    populatePracticePack();
    populateLanguagePickers();
    rebuildPracticeQueue();
    renderAll();
}

function renderAll() {
    renderHome();
    renderPhraseCatalog();
    renderPractice();
    renderSaved();
    renderProgress();
    renderDailyGoal();
    renderQuizIntro();
}

window.__traveltalk = { state, getCurrentUiLang };
