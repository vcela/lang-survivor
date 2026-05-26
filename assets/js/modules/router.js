const ALLOWED_ROUTES = new Set(["home", "phrases", "practice", "games", "saved", "progress", "settings"]);

let onRouteChange = null;

const elements = {
    views: [],
    navLinks: [],
    mobileNav: null,
    mobileMenuToggle: null,
    mobileMenuPanel: null,
};

export function initRouter({ onChange } = {}) {
    elements.views = [...document.querySelectorAll("[data-view]")];
    elements.navLinks = [...document.querySelectorAll("[data-route-link]")];
    elements.mobileNav = document.querySelector(".mobile-nav");
    elements.mobileMenuToggle = document.querySelector("#mobile-menu-toggle");
    elements.mobileMenuPanel = document.querySelector("#mobile-menu-panel");

    onRouteChange = onChange || null;

    window.addEventListener("hashchange", handleRoute);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);

    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    }
}

export function handleRoute() {
    const route = (window.location.hash || "#home").slice(1);
    const safeRoute = ALLOWED_ROUTES.has(route) ? route : "home";

    elements.views.forEach((view) => {
        view.classList.toggle("is-active", view.dataset.view === safeRoute);
    });

    elements.navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        link.classList.toggle("is-active", href === `#${safeRoute}`);
    });

    closeMobileMenu();

    if (onRouteChange) {
        onRouteChange(safeRoute);
    }
}

export function navigateTo(route) {
    window.location.hash = `#${route}`;
}

function toggleMobileMenu() {
    if (!elements.mobileMenuPanel || !elements.mobileMenuToggle) {
        return;
    }

    const isExpanded = elements.mobileMenuToggle.getAttribute("aria-expanded") === "true";
    elements.mobileMenuToggle.setAttribute("aria-expanded", String(!isExpanded));
    elements.mobileMenuToggle.classList.toggle("is-active", !isExpanded);
    elements.mobileMenuPanel.hidden = isExpanded;
}

function closeMobileMenu() {
    if (!elements.mobileMenuPanel || !elements.mobileMenuToggle) {
        return;
    }

    elements.mobileMenuPanel.hidden = true;
    elements.mobileMenuToggle.setAttribute("aria-expanded", "false");
    elements.mobileMenuToggle.classList.remove("is-active");
}

function handleDocumentClick(event) {
    if (!elements.mobileMenuPanel || elements.mobileMenuPanel.hidden) {
        return;
    }
    if (elements.mobileNav?.contains(event.target)) {
        return;
    }
    closeMobileMenu();
}

function handleDocumentKeydown(event) {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
}
