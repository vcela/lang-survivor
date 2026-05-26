import { state } from "./state.js";
import { t } from "./i18n.js";
import { escapeHtml, escapeAttribute } from "./dom.js";
import {
    getStats,
    buildCategoryStats,
    getTargetText,
    getUiText,
    getTargetPron,
} from "./phrases.js";
import { openPracticePack } from "./practice.js";
import { loadTop10, saveTop10 } from "./storage.js";

const elements = {
    homeCheatsheet: null,
    homeSummary: null,
    homeCategories: null,
};

let dragState = null;

export function initHome() {
    elements.homeCheatsheet = document.querySelector("#home-cheatsheet");
    elements.homeSummary = document.querySelector("#home-summary");
    elements.homeCategories = document.querySelector("#home-categories");

    elements.homeCategories.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-practice-pack]");
        if (!trigger) return;
        openPracticePack(trigger.dataset.practicePack || "frequent");
    });

    elements.homeCheatsheet.addEventListener("pointerdown", onDragPointerDown);
}

export function renderHome() {
    renderCheatsheet();
    renderStats();
    renderCategories();
}

function getTop10Ids() {
    return loadTop10() || state.defaultTop10;
}

function renderCheatsheet() {
    const ids = getTop10Ids();
    const phrases = ids
        .map((id) => state.phrases.find((p) => p.id === id))
        .filter(Boolean);

    elements.homeCheatsheet.innerHTML = phrases
        .map((phrase) => renderCheatsheetCard(phrase))
        .join("");
}

function renderCheatsheetCard(phrase) {
    const target = getTargetText(phrase);
    const ui = getUiText(phrase);
    const pron = getTargetPron(phrase);
    return `
        <article class="cheatsheet-card" data-id="${escapeAttribute(phrase.id)}">
            <div class="cheatsheet-body">
                <strong class="cheatsheet-primary">${escapeHtml(target)}</strong>
                <div class="cheatsheet-secondary">${escapeHtml(ui)}</div>
                ${pron ? `<div class="cheatsheet-pron">${escapeHtml(pron)}</div>` : ""}
            </div>
            <span class="drag-handle" aria-hidden="true" title="Drag to reorder">
                <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
                    <circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/>
                    <circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/>
                    <circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>
                </svg>
            </span>
        </article>
    `;
}

function renderStats() {
    const stats = getStats();
    elements.homeSummary.innerHTML = [
        statCard(t("stats.total"), stats.total),
        statCard(t("stats.known"), stats.known),
        statCard(t("stats.hard"), stats.hard),
        statCard(t("stats.todayCount"), stats.todayAttempts),
    ].join("");
}

function renderCategories() {
    const categoryStats = buildCategoryStats();
    elements.homeCategories.innerHTML = categoryStats
        .slice(0, 6)
        .map((item) => `
            <button class="chip-card chip-card-link" type="button" data-practice-pack="category:${escapeAttribute(item.slug)}">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${t("category.count", { count: item.total })}</span>
                <div class="bar-track"><div class="bar-fill" style="width: ${item.progressPercent}%;"></div></div>
            </button>
        `)
        .join("");
}

function statCard(label, value) {
    return `
        <article class="stat-card">
            <span class="metric-caption">${escapeHtml(label)}</span>
            <strong>${escapeHtml(String(value))}</strong>
        </article>
    `;
}

// ── Drag & drop (Pointer Events — works on desktop + touch) ──────────────────

function onDragPointerDown(e) {
    const handle = e.target.closest(".drag-handle");
    if (!handle) return;
    const card = handle.closest(".cheatsheet-card");
    if (!card) return;

    e.preventDefault();

    const rect = card.getBoundingClientRect();

    // Floating ghost that follows the pointer
    const ghost = card.cloneNode(true);
    ghost.classList.add("cheatsheet-drag-ghost");
    ghost.style.width = rect.width + "px";
    ghost.style.height = rect.height + "px";
    ghost.style.left = rect.left + "px";
    ghost.style.top = rect.top + "px";
    document.body.appendChild(ghost);

    card.classList.add("cheatsheet-dragging");

    dragState = {
        card,
        ghost,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
    };

    document.addEventListener("pointermove", onDragPointerMove, { passive: false });
    document.addEventListener("pointerup", onDragPointerUp);
    document.addEventListener("pointercancel", onDragCancel);
}

function onDragPointerMove(e) {
    if (!dragState) return;
    e.preventDefault();

    const { ghost, card, offsetX, offsetY } = dragState;
    ghost.style.left = (e.clientX - offsetX) + "px";
    ghost.style.top = (e.clientY - offsetY) + "px";

    // Find card under pointer (ghost has pointer-events:none via CSS)
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const target = under?.closest(".cheatsheet-card:not(.cheatsheet-dragging)");
    if (!target) return;

    const container = elements.homeCheatsheet;
    const targetRect = target.getBoundingClientRect();
    const after = e.clientY > targetRect.top + targetRect.height / 2;
    container.insertBefore(card, after ? target.nextSibling : target);
}

function onDragPointerUp() {
    if (!dragState) return;
    finishDrag();
    const newOrder = [...elements.homeCheatsheet.querySelectorAll("[data-id]")].map((c) => c.dataset.id);
    saveTop10(newOrder);
}

function onDragCancel() {
    if (!dragState) return;
    finishDrag();
}

function finishDrag() {
    const { card, ghost } = dragState;
    card.classList.remove("cheatsheet-dragging");
    ghost.remove();
    dragState = null;
    document.removeEventListener("pointermove", onDragPointerMove);
    document.removeEventListener("pointerup", onDragPointerUp);
    document.removeEventListener("pointercancel", onDragCancel);
}
