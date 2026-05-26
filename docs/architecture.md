# Architektura TravelTalk

## Adresářová struktura (po Etapě 1)

```text
lang-survivor/
  .github/
    zadani.md                       (historie - původní zadání)
    fraze.md
  assets/
    css/styles.css                  (design systém, responsive)
    icons/favicon.svg
    js/
      app.js                        (orchestrator ~50 ř.)
      modules/
        dom.js                      (escapeHtml, ikony, shuffle)
        storage.js                  (localStorage + legacy migrace)
        state.js                    (centrální appState)
        i18n.js                     (t(), loadI18n, applyDomBindings)
        router.js                   (hash routing + mobile menu)
        phrases.js                  (data adapter + helpery: getTargetText, getStats, getFilteredPhrases…)
        home.js                     (renderHome)
        catalog.js                  (filtry + render katalogu)
        practice.js                 (queue, rebuildPracticeQueue, render)
        quiz.js                     (kvízová logika)
        saved.js                    (oblíbené + těžké)
        progress.js                 (statistiky, denní cíl)
        settings.js                 (motiv, reset)
  data/
    phrases.json                    (schema v2 - translations + notes per jazyk)
    i18n/
      en.json                       (default UI)
      cs.json                       (fallback pro existující uživatele)
  docs/
    architecture.md
    roadmap.md
  index.php                         (HTML shell, data-i18n atributy)
  README.md
```

## Plánované doplnění (další etapy)

```text
lang-survivor/
  manifest.json                     (Etapa 4 - PWA)
  service-worker.js                 (Etapa 4 - offline cache)
  assets/
    icons/icon-192.png, icon-512.png
    js/modules/
      events.js                     (Etapa 5 - telemetry POST)
      top10.js                      (Etapa 3 - drag-and-drop top fráze)
  data/
    i18n/
      de.json, es.json              (Etapa 2)
  api/
    event.php                       (Etapa 5)
    bootstrap.php
  admin/                            (Etapa 5)
    index.php, login.php, logout.php, auth.php
    views/...
  db/
    schema.sql                      (Etapa 5)
    init.php
    lang_survivor.sqlite            (gitignore)
  config/
    config.example.php
    config.php                      (gitignore)
```

## Smysl jednotlivých částí

### `index.php`
Vstupní bod. Statické HTML s `data-i18n` a `data-i18n-attr` atributy, fallback texty v angličtině. PHP slouží jen pro cache-busting verzování CSS/JS. Připraveno na budoucí PWA registraci a admin redirect.

### `assets/css/styles.css`
Celý vizuální systém. CSS proměnné definují barevné schéma pro světlý/tmavý motiv. Mobile-first; sidebar 300 px na desktopu, sticky bottom nav na mobilu.

### `assets/js/app.js`
Orchestrátor: provede migraci localStorage → načte i18n → načte phrases → inicializuje moduly → spustí router. Nemá byznys logiku.

### `assets/js/modules/*`
Každý modul má jasnou zodpovědnost. Komunikují přes sdílený `state` ze [state.js](../assets/js/modules/state.js) a callbacky (`onChange`, `onReset`). ES modules nativně, žádný bundler.

### `data/phrases.json` (schema v2)
Jediný zdroj frází. Struktura jedné fráze:

```json
{
  "id": "greet-01",
  "category": "greetings",
  "frequency": "very-common",
  "difficulty": "1",
  "tags": ["essential", "default-top10"],
  "translations": {
    "cs": { "text": "Dobrý den", "pron": "", "verified": true, "audio": null },
    "it": { "text": "Buongiorno", "pron": "bwon-džor-no", "verified": true, "audio": null }
  },
  "notes": {
    "cs": "Základní formální pozdrav během dne."
  }
}
```

Top obal obsahuje `version`, `target_languages`, `explainer_languages`, `default_top10` (10 IDs pro home), `categories` (slug array).

### `data/i18n/{lang}.json`
Plochá struktura `key → string` s `{var}` interpolací. Klíče seskupené dle prefixu: `nav.*`, `home.*`, `catalog.*`, `practice.*`, `quiz.*`, `saved.*`, `progress.*`, `settings.*`, `status.*`, `frequency.*`, `category.*`, `stats.*`, `errors.*`.

## Datové toky

```
User otevře app
  ↓
[storage.js] migrace italiano-prakticky-* → traveltalk-*
  ↓
[state.js] inicializace appState s default jazyky
  ↓
[i18n.js] loadI18n(state.langs.ui) → fetch data/i18n/{lang}.json
  ↓
[i18n.js] applyDomBindings() přepíše [data-i18n] / [data-i18n-attr]
  ↓
[phrases.js] loadPhrases() → fetch data/phrases.json
  ↓
init každého view modulu (registruje listenery)
  ↓
renderAll() vykreslí všech 7 views
  ↓
[router.js] handleRoute() podle hash zobrazí aktivní view
```

## Klíčové principy

- **Bez Node.js, bez build kroku.** Vše musí běžet po FTP uploadu na obyčejný PHP hosting.
- **Bez frameworků.** Žádný React/Vue/Svelte. Vanilla JS modulárně.
- **Schema-first.** Datové schéma `phrases.json` je future-proof — připravené na 9 cílových jazyků, audio, `verified` flag per buňka.
- **Lokalizace přes data attributy.** `<span data-i18n="key">fallback</span>` umožňuje no-JS scénář s anglickým fallbackem.
- **LocalStorage migrace inline.** Funkce `loadProgress` a `loadTheme` fallbackují na staré klíče, takže ES module evaluation order nevadí.
- **State sdílen mezi moduly,** ale mutace probíhá vždy přes funkce v `phrases.js` / view modulech, ne přímo.

## Plánovaná rozšíření

### Etapa 2 - Multi-language obsah
- 100 frází napříč 9 cílovými jazyky (`it`, `es`, `en`, `cs`, `th`, `vi`, `id`, `ja`, `de`).
- 4 UI lokalizace (`en`, `cs`, `de`, `es`).
- Language picker v sidebaru + Settings.
- Onboarding modal při prvním načtení.

### Etapa 3 - Top 10 + Home redesign
- 10 customizovatelných slotů na home.
- Native HTML5 drag-and-drop + Pointer Events pro mobil.
- LocalStorage `traveltalk-top10` (array 10 IDs).
- Toast notifikace.

### Etapa 4 - PWA
- `manifest.json` + maskable ikony 192/512.
- `service-worker.js` s cache-first strategií pro shell/data/i18n.
- Install banner v sidebaru.

### Etapa 5 - Backend telemetry + admin
- PHP + SQLite (`db/lang_survivor.sqlite`), žádná MySQL konfigurace.
- `POST /api/event.php` - whitelist event_type, rate limit 60/60 s, sha256(ip+salt).
- `admin/` - session auth, dashboard se statistikami.
- 5 tabulek: `events`, `sessions`, `popular_phrases`, `admin_users`, `rate_limits`.

### Etapa 6 - Polish & audio
- `data/audio/{lang}/{phrase_id}.mp3` (schema už podporuje).
- Play button na phrase-card.
- Admin view "unverified translations" pro review.
