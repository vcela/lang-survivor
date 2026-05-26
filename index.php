<?php
$appName = 'TravelTalk';
$year = date('Y');
$cssVersion = (string) filemtime(__DIR__ . '/assets/css/styles.css');
$jsVersion = (string) filemtime(__DIR__ . '/assets/js/app.js');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo htmlspecialchars($appName, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta name="description" content="Survival phrases for short trips abroad — practical pocket phrasebook for 14 days to 3 months in a country.">
    <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css?v=<?php echo htmlspecialchars($cssVersion, ENT_QUOTES, 'UTF-8'); ?>">
</head>
<body>
    <div class="app-shell">
        <aside class="sidebar">
            <div class="brand-card">
                <div>
                    <p class="eyebrow" data-i18n="brand.eyebrow">Survival phrasebook</p>
                    <h1><a class="brand-home-link" href="#home" data-route-link><?php echo htmlspecialchars($appName, ENT_QUOTES, 'UTF-8'); ?><span id="brand-lang-suffix" class="brand-lang-suffix"></span></a></h1>
                </div>
                <p class="brand-copy" data-i18n="brand.copy">Clear phrases, short lessons and quick revisions for everyday life abroad.</p>
                <div class="brand-card-footer">
                    <div class="brand-actions">
                        <a class="primary-link" href="#practice" data-i18n="brand.startPractice">Today's lesson</a>
                        <a class="secondary-link" href="#phrases" data-i18n="brand.openCatalog">Catalogue</a>
                    </div>
                    <button id="theme-toggle" class="icon-button brand-theme-toggle" type="button" aria-label="Toggle theme" title="Toggle theme" data-i18n-attr="aria-label:brand.themeToggle;title:brand.themeToggle">
                        <span class="icon-core" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M12 3.5v2.2M12 18.3v2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M3.5 12h2.2M18.3 12h2.2M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <nav class="main-nav" aria-label="Main navigation" data-i18n-attr="aria-label:nav.main">
                <a href="#phrases" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm8 1.5V8h2.5zM8 11h8M8 14.5h8M8 18h5" />
                        </svg>
                    </span>
                    <span data-i18n="nav.phrases">Phrases</span>
                </a>
                <a href="#practice" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M20 11a8 8 0 0 0-14.85-4" />
                            <path d="M4 7V3h4" />
                            <path d="M4 13a8 8 0 0 0 14.85 4" />
                            <path d="M20 17v4h-4" />
                        </svg>
                    </span>
                    <span data-i18n="nav.practice">Practice</span>
                </a>
                <a href="#games" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            <path d="M9.75 9.25a2.25 2.25 0 1 1 3.92 1.48c-.76.77-1.67 1.29-1.67 2.52" />
                            <path d="M12 16h.01" />
                        </svg>
                    </span>
                    <span data-i18n="nav.games">Quiz</span>
                </a>
                <a href="#saved" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M12 20.5 5.5 17V5.5A1.5 1.5 0 0 1 7 4h10a1.5 1.5 0 0 1 1.5 1.5V17z" />
                        </svg>
                    </span>
                    <span data-i18n="nav.saved">Saved</span>
                </a>
                <a href="#progress" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M5 18.5h14M7 16V9m5 7V5m5 11v-4" />
                        </svg>
                    </span>
                    <span data-i18n="nav.progress">Progress</span>
                </a>
                <a href="#settings" data-route-link>
                    <span class="nav-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="m12 4 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4zM6 14l1 2 2.2.3-1.6 1.5.4 2.2L6 19l-2 1 .4-2.2L2.8 16.3 5 16zm12 0 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" />
                        </svg>
                    </span>
                    <span data-i18n="nav.settings">Settings</span>
                </a>
            </nav>

            <div class="status-panel">
                <p class="panel-label" data-i18n="status.dailyPace">Today's pace</p>
                <div id="daily-goal" class="metric-stack"></div>
            </div>

            <footer class="app-footer sidebar-footer">
                <p><span data-i18n="footer.madeBy">made by</span> <a href="https://czech-this.com/" target="_blank" rel="noreferrer">czech-this.com</a></p>
            </footer>
        </aside>

        <main class="content">
            <div class="mobile-app-header">
                <a class="mobile-home-brand brand-home-link" href="#home" data-route-link><?php echo htmlspecialchars($appName, ENT_QUOTES, 'UTF-8'); ?><span id="brand-lang-suffix-mobile" class="brand-lang-suffix"></span></a>
                <a class="primary-link compact-link" href="#practice" data-route-link data-i18n="brand.startPractice">Lekce</a>
            </div>

            <section id="view-home" class="view is-active" data-view="home">
                <div id="home-cheatsheet" class="cheatsheet-grid"></div>

                <div class="home-secondary panel-grid two-columns">
                    <article class="panel">
                        <div class="section-heading compact-heading">
                            <h3 data-i18n="home.summaryTitle">Quick overview</h3>
                            <span class="section-note" data-i18n="home.summaryNote">What you've got so far</span>
                        </div>
                        <div id="home-summary" class="stats-grid"></div>
                    </article>

                    <article class="panel">
                        <div class="section-heading compact-heading">
                            <h3 data-i18n="home.categoriesTitle">Topic blocks</h3>
                            <span class="section-note" data-i18n="home.categoriesNote">Start where you'll most likely use it</span>
                        </div>
                        <div id="home-categories" class="chips-grid"></div>
                    </article>
                </div>

                <div class="home-daily-pace">
                    <p class="panel-label" data-i18n="status.dailyPace">Today's pace</p>
                    <div id="home-daily-goal" class="metric-stack"></div>
                </div>
            </section>

            <section id="view-phrases" class="view" data-view="phrases">
                <div class="section-heading section-heading--spaced catalog-header">
                    <div>
                        <h3 data-i18n="catalog.title">Phrase catalogue</h3>
                        <p class="section-note" data-i18n="catalog.note">Filter by topic, status or search in both languages.</p>
                    </div>
                </div>

                <div class="toolbar toolbar-panel">
                    <label class="search-field" for="search-input">
                        <span class="search-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M10.5 5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm7.5 12.5L15.5 15" />
                            </svg>
                        </span>
                        <input id="search-input" class="input input-search" type="search" placeholder="Search a phrase or pronunciation" data-i18n-attr="placeholder:catalog.searchPlaceholder">
                    </label>
                    <select id="category-filter" class="input">
                        <option value="all" data-i18n="catalog.allCategories">All categories</option>
                    </select>
                    <select id="status-filter" class="input">
                        <option value="all" data-i18n="catalog.allStatuses">All statuses</option>
                        <option value="known" data-i18n="status.known">Known</option>
                        <option value="hard" data-i18n="status.hard">Hard</option>
                        <option value="favorite" data-i18n="status.favorite">Favorite</option>
                        <option value="unseen" data-i18n="status.unseen">Not seen yet</option>
                    </select>
                </div>

                <div id="phrase-results-meta" class="results-meta"></div>
                <div id="phrase-list" class="card-grid"></div>
            </section>

            <section id="view-practice" class="view" data-view="practice">
                <div class="section-heading section-heading--spaced">
                    <div>
                        <h3 data-i18n="practice.title">Practice</h3>
                        <p class="section-note" data-i18n="practice.note">Recall the answer in your head first, then reveal it.</p>
                    </div>
                    <div class="toolbar compact-toolbar">
                        <select id="practice-pack" class="input">
                            <option value="frequent" data-i18n="practice.pack.frequent">Most common phrases</option>
                            <option value="all" data-i18n="practice.pack.all">All phrases</option>
                            <option value="hard" data-i18n="practice.pack.hard">Hard phrases</option>
                            <option value="favorites" data-i18n="practice.pack.favorites">Favorites</option>
                        </select>
                    </div>
                </div>

                <article class="practice-card panel">
                    <div class="practice-progress">
                        <span id="practice-label">Pack: Most common phrases</span>
                        <span id="practice-counter">0 / 0</span>
                    </div>

                    <div id="practice-body" class="practice-body"></div>

                    <div class="practice-actions practice-actions-icons">
                        <button id="reveal-answer" class="primary-button" type="button" data-i18n="practice.reveal">Reveal answer</button>
                        <button id="mark-known" class="ghost-button practice-action-button practice-action-button-success" type="button" data-i18n="practice.markKnown">Known</button>
                        <button id="mark-later" class="icon-chip practice-action-button practice-action-button-later" type="button" aria-label="Practice again later" title="Practice again later" data-i18n-attr="aria-label:practice.markLaterAria;title:practice.markLaterAria">
                            <span class="icon-core" aria-hidden="true">
                                <svg viewBox="0 0 24 24" focusable="false">
                                    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                                    <path d="M21 4v6h-6" />
                                </svg>
                            </span>
                            <span class="practice-action-label" data-i18n="practice.markLater">Later</span>
                        </button>
                        <button id="mark-hard" class="ghost-button practice-action-button practice-action-button-warning" type="button" data-i18n="practice.markHard">Hard</button>
                        <button id="mark-favorite" class="icon-chip neutral-chip practice-action-secondary" type="button" aria-label="Favorite" title="Favorite" data-i18n-attr="aria-label:practice.markFavorite;title:practice.markFavorite">
                            <span class="icon-core" aria-hidden="true">
                                <svg viewBox="0 0 24 24" focusable="false">
                                    <path d="m12 20-6.5-3.6V5.7A1.7 1.7 0 0 1 7.2 4h9.6a1.7 1.7 0 0 1 1.7 1.7v10.7z" />
                                </svg>
                            </span>
                            <span class="practice-action-label" data-i18n="practice.markFavorite">Favorite</span>
                        </button>
                    </div>
                </article>
            </section>

            <section id="view-games" class="view" data-view="games">
                <div class="section-heading section-heading--spaced">
                    <div>
                        <h3 data-i18n="quiz.title">Quick quiz</h3>
                        <p class="section-note" data-i18n="quiz.note">Five short questions from the most common phrases.</p>
                    </div>
                    <button id="start-quiz" class="primary-button" type="button" data-i18n="quiz.start">Start quiz</button>
                </div>

                <article class="panel quiz-panel">
                    <div id="quiz-body" class="quiz-body"></div>
                </article>
            </section>

            <section id="view-saved" class="view" data-view="saved">
                <div class="panel-grid two-columns">
                    <article class="panel">
                        <div class="section-heading compact-heading">
                            <h3 data-i18n="saved.favoritesTitle">Favorite phrases</h3>
                            <span class="section-note" data-i18n="saved.favoritesNote">Your quick cheat-sheet</span>
                        </div>
                        <div id="favorite-list" class="list-stack"></div>
                    </article>

                    <article class="panel">
                        <div class="section-heading compact-heading">
                            <h3 data-i18n="saved.hardTitle">Hard phrases</h3>
                            <span class="section-note" data-i18n="saved.hardNote">Keep these for the next round</span>
                        </div>
                        <div id="hard-list" class="list-stack"></div>
                    </article>
                </div>
            </section>

            <section id="view-progress" class="view" data-view="progress">
                <div class="section-heading compact-heading">
                    <h3 data-i18n="progress.title">Progress</h3>
                    <p class="section-note" data-i18n="progress.note">What's locked in and what still needs work.</p>
                </div>

                <div id="progress-summary" class="stats-grid"></div>
                <div id="progress-categories" class="panel-grid"></div>
            </section>

            <section id="view-settings" class="view" data-view="settings">
                <article class="panel settings-panel">
                    <div class="section-heading compact-heading">
                        <h3 data-i18n="settings.title">Settings</h3>
                        <p class="section-note" data-i18n="settings.note">Local preferences and stored state.</p>
                    </div>

                    <div class="settings-row">
                        <div>
                            <h4 data-i18n="settings.langTitle">Languages</h4>
                            <p data-i18n="settings.langNote">Pick the language you're learning and the language for the interface.</p>
                        </div>
                        <div class="lang-controls">
                            <label class="lang-control">
                                <span class="lang-control-label" data-i18n="lang.targetLabel">Target language</span>
                                <select id="lang-target-select" class="input"></select>
                            </label>
                            <label class="lang-control">
                                <span class="lang-control-label" data-i18n="lang.uiLabel">Interface language</span>
                                <select id="lang-ui-select" class="input"></select>
                            </label>
                        </div>
                    </div>

                    <div class="settings-row">
                        <div>
                            <h4 data-i18n="settings.themeTitle">Theme</h4>
                            <p data-i18n="settings.themeNote">Light and dark mode are saved in the browser.</p>
                        </div>
                        <button id="theme-toggle-settings" class="ghost-button" type="button" data-i18n="settings.themeToggle">Toggle theme</button>
                    </div>

                    <div class="settings-row">
                        <div>
                            <h4 data-i18n="settings.resetTitle">Local progress</h4>
                            <p data-i18n="settings.resetNote">Removes marked phrases, favorites and history from this browser.</p>
                        </div>
                        <button id="reset-progress" class="danger-button" type="button" data-i18n="settings.resetButton">Reset progress</button>
                    </div>
                </article>
            </section>
        </main>

        <nav class="mobile-nav" aria-label="Mobile navigation" data-i18n-attr="aria-label:nav.mobile">
            <div class="mobile-nav-shell">
                <div id="mobile-menu-panel" class="mobile-menu-panel" hidden>
                    <a class="mobile-menu-link" href="#saved" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M12 20.5 5.5 17V5.5A1.5 1.5 0 0 1 7 4h10a1.5 1.5 0 0 1 1.5 1.5V17z" />
                            </svg>
                        </span>
                        <span data-i18n="nav.saved">Saved</span>
                    </a>
                    <a class="mobile-menu-link" href="#progress" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M5 18.5h14M7 16V9m5 7V5m5 11v-4" />
                            </svg>
                        </span>
                        <span data-i18n="nav.progress">Progress</span>
                    </a>
                    <a class="mobile-menu-link" href="#settings" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="m12 4 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4zM6 14l1 2 2.2.3-1.6 1.5.4 2.2L6 19l-2 1 .4-2.2L2.8 16.3 5 16zm12 0 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" />
                            </svg>
                        </span>
                        <span data-i18n="nav.settings">Settings</span>
                    </a>
                </div>

                <div class="mobile-nav-bar">
                    <a class="mobile-nav-link" href="#phrases" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm8 1.5V8h2.5zM8 11h8M8 14.5h8M8 18h5" />
                            </svg>
                        </span>
                        <span class="mobile-nav-label" data-i18n="nav.phrases">Phrases</span>
                    </a>
                    <a class="mobile-nav-link" href="#practice" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M20 11a8 8 0 0 0-14.85-4" />
                                <path d="M4 7V3h4" />
                                <path d="M4 13a8 8 0 0 0 14.85 4" />
                                <path d="M20 17v4h-4" />
                            </svg>
                        </span>
                        <span class="mobile-nav-label" data-i18n="nav.practice">Practice</span>
                    </a>
                    <a class="mobile-nav-link" href="#games" data-route-link>
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                                <path d="M9.75 9.25a2.25 2.25 0 1 1 3.92 1.48c-.76.77-1.67 1.29-1.67 2.52" />
                                <path d="M12 16h.01" />
                            </svg>
                        </span>
                        <span class="mobile-nav-label" data-i18n="nav.games">Quiz</span>
                    </a>
                    <button id="mobile-menu-toggle" class="mobile-nav-link mobile-nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu-panel" aria-label="More menu items" data-i18n-attr="aria-label:nav.mobileMore">
                        <span class="nav-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M4 12h16" />
                                <path d="M4 6h16" />
                                <path d="M4 18h16" />
                            </svg>
                        </span>
                        <span class="mobile-nav-label" data-i18n="nav.mobileMenu">Menu</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>

    <div id="onboarding-modal" class="modal" hidden aria-hidden="true" role="dialog" aria-labelledby="onboarding-title">
        <div class="modal-backdrop"></div>
        <div class="modal-card" role="document">
            <h2 id="onboarding-title" data-i18n="onboarding.title">Welcome to TravelTalk</h2>
            <p data-i18n="onboarding.body">Pick the language of the country you're visiting and the language you'd like to read the app in.</p>
            <label class="lang-control">
                <span class="lang-control-label" data-i18n="lang.targetLabel">Target language</span>
                <select id="onboarding-target" class="input"></select>
            </label>
            <label class="lang-control">
                <span class="lang-control-label" data-i18n="lang.uiLabel">Interface language</span>
                <select id="onboarding-ui" class="input"></select>
            </label>
            <button id="onboarding-start" class="primary-button" type="button" data-i18n="onboarding.start">Start</button>
        </div>
    </div>

    <div id="toast-container" class="toast-container" aria-live="polite"></div>

    <script type="module" src="assets/js/app.js?v=<?php echo htmlspecialchars($jsVersion, ENT_QUOTES, 'UTF-8'); ?>"></script>
</body>
</html>
