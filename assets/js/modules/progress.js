import { t } from "./i18n.js";
import { escapeHtml } from "./dom.js";
import { getStats, buildCategoryStats, getTodayAttempts } from "./phrases.js";
import { DAILY_GOAL } from "./state.js";

const elements = {
    progressSummary: null,
    progressCategories: null,
    dailyGoal: null,
    homeDailyGoal: null,
};

export function initProgress() {
    elements.progressSummary = document.querySelector("#progress-summary");
    elements.progressCategories = document.querySelector("#progress-categories");
    elements.dailyGoal = document.querySelector("#daily-goal");
    elements.homeDailyGoal = document.querySelector("#home-daily-goal");
}

export function renderProgress() {
    const stats = getStats();
    elements.progressSummary.innerHTML = [
        statCard(t("stats.totalAll"), stats.total),
        statCard(t("stats.known"), stats.known),
        statCard(t("stats.favorite"), stats.favorite),
        statCard(t("stats.hard"), stats.hard),
    ].join("");

    elements.progressCategories.innerHTML = buildCategoryStats()
        .map((category) => `
            <article class="progress-card">
                <strong>${escapeHtml(category.name)}</strong>
                <div class="metric-caption">${escapeHtml(t("progress.categoryProgress", { known: category.known, total: category.total }))}</div>
                <div class="bar-track"><div class="bar-fill" style="width: ${category.progressPercent}%;"></div></div>
            </article>
        `)
        .join("");
}

export function renderDailyGoal() {
    const todayAttempts = getTodayAttempts();
    const percent = Math.min(100, Math.round((todayAttempts / DAILY_GOAL) * 100));
    const html = `
        <div class="metric-value">${todayAttempts}/${DAILY_GOAL}</div>
        <div class="metric-caption">${escapeHtml(t("status.todayProgress"))}</div>
        <div class="bar-track"><div class="bar-fill" style="width: ${percent}%;"></div></div>
    `;

    if (elements.dailyGoal) elements.dailyGoal.innerHTML = html;
    if (elements.homeDailyGoal) elements.homeDailyGoal.innerHTML = html;
}

function statCard(label, value) {
    return `
        <article class="stat-card">
            <span class="metric-caption">${escapeHtml(label)}</span>
            <strong>${escapeHtml(String(value))}</strong>
        </article>
    `;
}
