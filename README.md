# TravelTalk

Multijazyčný "survival" tahák pro krátkodobé cesty (14 dní až 3 měsíce) v zahraničí. Postaveno na čistém HTML + vanilla JS + PHP pro jednoduchý PHP hosting bez Node.js a buildu.

## Aktuální stav (Etapa 2 — Multi-language obsah)

Vyrazili jsme z původního projektu *Italiano Prakticky* (italsko-český, 74 frází).

**Etapa 1 (foundation)**: aplikace přejmenována na **TravelTalk**, JS rozdělen do ES modulů, UI texty extrahovány do i18n souborů, schema `phrases.json` povýšeno na v2, migrace localStorage z `italiano-prakticky-*` na `traveltalk-*`.

**Etapa 2 (multi-language)**:
- **100 frází** v 10 kategoriích (greetings 10, polite 10, intro 10, restaurant 12, shopping 10, street 10, transport 10, emergency 8, numbers 10, time 10)
- **9 cílových jazyků**: EN, CS, IT, ES, DE (verified) + TH, VI, ID, JA (AI draft, `verified: false` → zobrazí "AI draft" badge)
- **4 UI jazyky**: EN (default), CS, DE, ES — 133 i18n klíčů ve všech 4
- **Vysvětlivky** u každé fráze ve všech 4 mateřských jazycích
- **Language picker** v Nastavení (cílový + UI jazyk)
- **Onboarding modal** při prvním načtení (uživatel zvolí target + UI)
- **Unverified badge** na fráze, kde překlad ještě nebyl ověřen rodilým mluvčím

Funkčně: katalog, procvičování, kvíz, oblíbené/těžké, pokrok, světlý/tmavý motiv, mobilní layout — vše respektuje vybraný cílový + UI jazyk.

## Roadmapa

Detailní plán je v lokálním `~/.claude/plans/tohle-je-projekt-ktery-drifting-emerson.md`. Etapy:

1. **Foundation refactor** (✓ hotovo) — rename, modularizace, i18n, schema v2.
2. **Multi-language obsah** (✓ hotovo) — 100 frází napříč 9 cílovými jazyky, 4 UI lokalizace, language picker, onboarding, unverified badge.
3. **Top 10 + Home redesign** — customizovatelná home s drag-and-drop top frázemi.
4. **PWA** — manifest + service worker, instalovatelná offline appka.
5. **Backend telemetry + admin** — PHP + SQLite, login-chráněný dashboard se statistikami.
6. **Polish & audio** — TTS / nahrávky, kvíz refactor, admin verify flow.

## Architektura

```
lang-survivor/
├── index.php                 # HTML shell, hardcoded fallback texty v EN, data-i18n atributy
├── assets/
│   ├── css/styles.css        # design systém, světlý/tmavý motiv
│   ├── js/
│   │   ├── app.js            # orchestrator (~50 ř.)
│   │   └── modules/          # ES moduly: state, storage, i18n, router, phrases, dom,
│   │                         # home, catalog, practice, quiz, saved, progress, settings
│   └── icons/favicon.svg
├── data/
│   ├── phrases.json          # schema v2: translations + notes per jazyk
│   └── i18n/                 # UI lokalizace: en.json (default), cs.json
└── docs/                     # architecture + roadmap
```

## Jak spustit lokálně

```powershell
php -S localhost:8000
```

Otevři `http://localhost:8000`. Aplikace funguje bez build kroku — vše je nativní browser JS (ES modules).

## Nasazení (např. Webglobe)

1. Nahraj všechny soubory přes FTP do root webu.
2. PHP hosting 7.4+ stačí, žádná DB v této etapě.
3. Server musí servírovat `index.php` jako default.

## Co se mění oproti původní verzi

| Aspekt | Předtím | Teď |
|---|---|---|
| Název | Italiano Prakticky | TravelTalk |
| Jazyk UI | hardcoded CS | i18n EN (default) + CS |
| Schema frází | flat `czech`/`italian` | `translations.{lang}` + `notes.{lang}` |
| JS struktura | monolithic `app.js` (~822 ř.) | orchestrator + 13 modulů v `modules/` |
| LocalStorage | `italiano-prakticky-*` | `traveltalk-*` (s migrací) |

## Co plánujeme dál

Viz roadmapa výše. Hlavní položky: rozšíření na 9 cílových jazyků × 100 frází, customizovatelná home s top 10 frázemi, PWA pro offline použití v zahraničí, admin sekce se statistikami.
