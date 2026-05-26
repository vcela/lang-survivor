# TravelTalk - Roadmap

Plán přechodu z původního `Italiano Prakticky` MVP na multijazyčný survival tahák pro krátkodobé cesty. Vstupní stav: 74 italsko-českých frází, statický PHP, vanilla JS, localStorage.

## Cílová vize

- **9 cílových jazyků** (IT, ES, EN, CS, TH, VI, ID, JA, DE) - jazyk země, kam uživatel jede
- **4 mateřské jazyky pro UI** (EN default, CS, DE, ES) - jazyk, ve kterém uživatel myslí
- **Přesně 100 frází** sestavených od nuly podle survival priorit
- **Customizovatelná home** s 10 top frázemi (drag-and-drop)
- **PWA s offline cache** - kritické pro použití v zahraničí
- **Admin sekce** s login a statistikami (PHP + SQLite)

## Etapa 1 - Foundation refactor

**Cíl**: Beze změn UX rozbít codebase na moduly a připravit půdu pro multilang.

### Výstupy
- aplikace přejmenována `Italiano Prakticky` → **TravelTalk**
- monolithic `app.js` (~820 ř.) rozdělen na ES moduly v `assets/js/modules/`
- UI texty extrahovány do `data/i18n/{en,cs}.json`
- schema `phrases.json` povýšeno na v2 (`translations` + `notes` per jazyk)
- localStorage migrace `italiano-prakticky-*` → `traveltalk-*`
- aktualizovaná dokumentace

### Stav
✓ Hotovo. Funkce zůstávají stejné; refactor je interní.

## Etapa 2 - Multi-language obsah

**Cíl**: 9 cílových jazyků × 100 frází × 4 UI lokalizace, language picker.

### Výstupy
- 100 frází v EN + CS (master verze)
- AI draft překladů pro IT, ES, DE → `verified: true` po lidském review
- AI draft pro TH, VI, ID, JA → `verified: false` (badge v UI)
- UI lokalizace: `data/i18n/{de,es}.json`
- language picker (sidebar + Settings) - cílový + mateřský jazyk
- onboarding modal při prvním načtení (bez langs v localStorage)

### Konkrétní úkoly
1. Sestavit 100 frází napříč 10 kategoriemi (greetings 10, polite 10, intro 10, restaurant 12, shopping 10, street 10, transport 10, emergency 8, numbers 10, time 10).
2. AI překlady do 9 cílových jazyků + 4 explainer notes.
3. Doplnit DE a ES i18n soubory (cca 115 klíčů každý).
4. Implementovat language picker v sidebaru.
5. Implementovat onboarding modal.
6. Refaktorovat phrase-card, aby zobrazoval `translations[target]` primárně a `translations[ui]` sekundárně.
7. Quiz refactor pro target ↔ ui směr.

## Etapa 3 - Top 10 + Home redesign

**Cíl**: Customizovatelný home s 10 frázemi a drag-and-drop reorder.

### Výstupy
- `assets/js/modules/top10.js` (DnD logika, native HTML5 + Pointer Events)
- Home view: top 10 nahoře, kategorie pod ním
- "Add to top" button na phrase-card v katalogu
- Toast notifikace (Added / Removed / Top 10 is full)
- LocalStorage `traveltalk-top10` (array 10 IDs) s fallbackem na `default_top10`

### Konkrétní úkoly
1. Native HTML5 DnD na desktopu, ~80 řádků.
2. Pointer Events fallback pro mobilní zařízení.
3. Visual feedback při drag (placeholder slot).
4. Mobile fallback: long-press → "Move up/down" menu pokud DnD vyjde křehký.

## Etapa 4 - PWA

**Cíl**: Instalovatelná webová aplikace s offline funkcionalitou.

### Výstupy
- `manifest.json` s ikonami 192/512 (maskable)
- `service-worker.js` cache-first pro shell + data + i18n
- Install banner v sidebaru (po 3. visit, dismissible)
- Hard-reload button v Settings (clear all caches)
- Offline fallback page

### Konkrétní úkoly
1. Vytvořit PNG ikony 192/512 z `favicon.svg`.
2. Cache strategie: cache-first pro statiku, bypass pro `/api/`.
3. Cache version bump při releasu.
4. Lighthouse PWA score ≥ 90.
5. Test na iOS Safari "Add to Home Screen".

## Etapa 5 - Backend telemetry + admin

**Cíl**: Sběr anonymních statistik a admin dashboard se základními metrikami.

### Výstupy
- SQLite DB (`db/lang_survivor.sqlite`) s 5 tabulkami
- `api/event.php` - POST endpoint pro telemetry
- `admin/` - session-based login + dashboard
- Statistiky: visits, top target/UI languages, top phrases added to top10, top searches, mobile/desktop ratio

### Konkrétní úkoly
1. `db/schema.sql` + `db/init.php` (CLI: `php db/init.php --create-admin admin <heslo>`).
2. `api/event.php` s whitelist event_type, rate limit 60 req/60 s, sha256(ip+salt).
3. `config/config.php` mimo gitignore + `config.example.php` v repu.
4. `.htaccess` v `db/` a `config/` - deny all.
5. PRAGMA `journal_mode=WAL` v bootstrap.
6. Frontend `events.js` s `navigator.sendBeacon()` + fetch fallback.
7. Admin views: dashboard, events (paginated), per-phrase, per-language.
8. Vanilla HTML tabulky + procentuální bars, žádné chart libs.

## Etapa 6 - Polish & audio

**Cíl**: Audio výslovnost a admin verify flow.

### Výstupy
- Adresářová struktura `data/audio/{lang}/{phrase_id}.mp3`
- Play button na phrase-card (skrytý když `audio === null`)
- Quiz refactor: směr target ↔ ui volitelný v UI
- Admin view "show only unverified translations"

### Konkrétní úkoly
1. Rozhodnutí: TTS (ElevenLabs/Azure) vs ruční nahrávky vs Web Speech API.
2. Web Speech API jako fallback pro neproduced jazyky.
3. Admin fronta pro verify unverified překladů.
4. Optional: account systém pro sync progressu mezi zařízeními.

## Priorita funkcí

### Kritické pro v1 produkční verzi
- 100 frází v 9 cílových jazycích (i kdyby asijské jazyky byly `verified: false`)
- UI v EN + CS (DE/ES až po review)
- Customizovatelná home s top 10
- PWA pro offline
- Admin sekce pro vlastníka

### Důležité po v1
- DE/ES UI lokalizace
- Audio výslovnost (alespoň pro IT/ES/EN/DE)
- Quiz refactor pro target ↔ ui směr
- Optional account systém

### Odložené
- Spaced repetition plánování
- Tiskový PDF tahák
- Multiple target languages současně
- Server-side AI translation review tool
