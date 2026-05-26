# Zadání projektu: Webová aplikace pro praktické učení italštiny

## 1. Účel projektu
Cílem je navrhnout a vytvořit webovou aplikaci pro českého začátečníka, který se potřebuje během krátké doby naučit praktickou italštinu pro každodenní fungování v Itálii. Nejde o klasický jazykový kurz postavený na gramatice, ale o nástroj pro rychlé osvojení nejpoužívanějších frází, jednoduchých vět a modelových situací.

Aplikace má uživateli pomoci zvládnout reálné scénáře, jako jsou pozdravy, objednání v restauraci, nákup, orientace ve městě, cestování, krátká konverzace a řešení základních problémových situací. Hlavní hodnotou produktu má být přehlednost, rychlost použití, snadné procvičování a možnost opakovat pouze to, co uživatel ještě neumí.

## 2. Kontext nasazení a technické omezení
Projekt bude provozován na klasickém hostingu Webglobe. Zadání proto musí počítat s následujícími omezeními:

- K dispozici bude HTML, CSS, JavaScript, PHP a případně MySQL.
- Nebude možné provozovat Node.js aplikaci na serveru.
- Nelze stavět řešení na server-side JavaScriptu, dlouho běžících procesech ani moderním app serveru.
- Nasazení musí být možné formou nahrání souborů přes FTP nebo běžný hostingový deploy.
- Aplikace musí fungovat i bez složité build pipeline. Pokud bude při vývoji použit build nástroj lokálně, nasazení musí být tvořeno pouze výslednými statickými soubory a PHP.

Z toho plyne doporučený technický směr:

- frontend v HTML, CSS a vanilla JavaScriptu,
- backend v PHP 8+,
- data v MySQL nebo v souborové podobě JSON podle rozsahu verze,
- architektura bez závislosti na Node.js runtime.

## 3. Cílový uživatel
Primární cílová skupina:

- česky mluvící začátečník,
- uživatel bez hlubší znalosti italštiny,
- člověk, který se chce rychle domluvit v praxi,
- uživatel, který preferuje krátké učební bloky a opakování,
- člověk používající aplikaci často na mobilu během dne.

Sekundární cílová skupina:

- cestovatel před dovolenou,
- student nebo pracovník odjíždějící na delší pobyt,
- uživatel, který potřebuje rychlý tahák a lehké procvičování.

## 4. Hlavní produktová vize
Aplikace má učit hlavně celé fráze a použitelné jazykové bloky, ne izolovaná slovíčka. Uživatel se má pohybovat mezi třemi základními režimy:

- rychlé vyhledání fráze,
- aktivní procvičování formou kartiček,
- opakování problémových frází v krátkých hrách nebo kvízech.

Web má působit jako praktický survival trainer, ne jako akademický portál. Rozhraní má být kompaktní, rychlé, přehledné a použitelné na mobilu jednou rukou.

## 5. Hlavní cíle projektu
Projekt musí splnit tyto cíle:

1. Nabídnout přehledný katalog základních italských frází rozdělených do praktických tematických okruhů.
2. Umožnit uživateli fráze filtrovat, vyhledávat a třídit podle důležitosti nebo stavu znalosti.
3. Podpořit aktivní vybavování odpovědi, ne jen pasivní čtení překladu.
4. Uchovávat informaci o tom, co uživatel umí, neumí nebo si chce zopakovat.
5. Poskytnout jednoduchý přehled pokroku a doporučit další opakování.
6. Fungovat spolehlivě na mobilu i desktopu bez náročného serverového provozu.

## 6. Rozsah obsahu
Obsah aplikace bude rozdělen minimálně do těchto modulů:

1. Pozdravy a loučení
2. Zdvořilostní fráze
3. Představování a základní konverzace
4. Restaurace a kavárna
5. Obchod a nákup
6. Ubytování
7. Na ulici a orientace
8. Doprava a přesuny
9. Čísla, čas a základní údaje
10. Nouzové a problémové situace

Každý modul musí obsahovat sadu konkrétních frází. Pro první produkční verzi se doporučuje rozsah alespoň 200 až 400 frází, aby aplikace působila jako použitelný nástroj, ale současně zůstala zvládnutelná na obsahovou přípravu.

## 7. Struktura jedné fráze
Každá fráze musí mít minimálně tato data:

- interní ID,
- název kategorie,
- český text,
- italský text,
- zjednodušenou českou výslovnost,
- krátkou poznámku ke kontextu použití,
- příklad použití nebo modelovou mini situaci,
- obtížnost,
- prioritu nebo četnost použití,
- příznak typu fráze, například běžná, velmi častá, nouzová, zdvořilostní.

Volitelné rozšíření:

- audio soubor s výslovností,
- alternativní formulace,
- formální versus neformální varianta,
- tagy pro filtrování.

## 8. Funkční požadavky

### 8.1 Katalog frází
Hlavní knihovna frází bude jádro celé aplikace. Uživatel zde musí mít možnost:

- zobrazit všechny fráze v seznamu nebo kartách,
- filtrovat podle tématu,
- vyhledávat podle češtiny i italštiny,
- filtrovat podle obtížnosti,
- filtrovat podle stavu znalosti, například umím, neumím, oblíbené, k zopakování,
- řadit podle důležitosti, abecedy nebo frekvence použití,
- otevřít detail fráze.

Každá karta fráze má zobrazovat:

- český význam,
- italskou frázi,
- výslovnost,
- štítky,
- akci pro označení stavu znalosti,
- akci pro přidání do oblíbených,
- odkaz nebo tlačítko pro detail.

### 8.2 Režim procvičování kartiček
Kartičkový režim má být hlavní učební mechanikou. Uživatel nejprve vidí zadání a až po vlastním pokusu si odkryje odpověď.

Požadované režimy:

- čeština na italskou odpověď,
- italština na český význam,
- mix nejčastějších frází,
- procvičování pouze těžkých nebo chybových frází,
- procvičování podle vybrané kategorie.

Každé kolo musí nabídnout akce:

- ukázat odpověď,
- umím,
- neumím,
- zopakovat později,
- přidat do oblíbených.

### 8.3 Hry a krátké kvízy
Součástí aplikace mají být jednoduché procvičovací režimy, které zvýší motivaci bez toho, aby aplikace působila dětsky.

Minimální sada her:

1. Výběr z možností
2. Spojování dvojic
3. Doplňování chybějícího slova
4. Rychlý kvíz na čas
5. Chybový trénink z dříve špatně zodpovězených frází

Každá hra má mít:

- jasně definovaný začátek a konec,
- skóre nebo procentuální úspěšnost,
- shrnutí výsledku,
- možnost okamžitě zopakovat chyby.

### 8.4 Pokrok uživatele
Aplikace musí zobrazovat základní přehled pokroku. Minimálně:

- počet všech frází,
- počet projitých frází,
- počet frází označených jako umím,
- počet problémových frází,
- pokrok podle kategorií,
- doporučení, co opakovat dál.

Volitelné rozšíření:

- streak za dny používání,
- denní cíl,
- odhad času potřebného pro další lekci.

### 8.5 Oblíbené a těžké fráze
Uživatel musí mít možnost:

- označit frázi jako oblíbenou,
- označit frázi jako těžkou nebo problémovou,
- zobrazit samostatný seznam oblíbených,
- spustit procvičování pouze z těžkých frází.

### 8.6 Nastavení a preference
Minimální rozsah nastavení:

- volba světlého a tmavého režimu,
- volba výchozího režimu procvičování,
- reset lokálního postupu,
- zapnutí nebo vypnutí výslovnosti a pomocných nápověd.

## 9. Informační architektura a obrazovky
Aplikace bude fungovat jako webová aplikace s několika hlavními pohledy. Nemusí jít o čisté SPA v technologickém smyslu, ale uživatelsky má působit jako souvislá aplikace.

Povinné sekce:

1. Domů
2. Všechny fráze
3. Kategorie
4. Procvičování
5. Hry
6. Oblíbené a těžké
7. Pokrok
8. Nastavení

### 9.1 Domů
Úvodní obrazovka má obsahovat:

- stručné vysvětlení účelu aplikace,
- tlačítko pro rychlý start procvičování,
- přehled hlavních kategorií,
- blok nejdůležitějších frází,
- blok doporučený k dnešnímu opakování,
- stručné shrnutí pokroku.

### 9.2 Všechny fráze
Tato obrazovka musí obsahovat:

- fulltextové vyhledávání,
- filtry,
- seznam nebo karty,
- zobrazení základních metadat fráze,
- rychlé akce pro označení znalosti.

### 9.3 Kategorie
Sekce kategorií má nabídnout tematický vstup do obsahu. Každá kategorie zobrazí:

- krátký popis,
- počet frází,
- počet zvládnutých frází,
- možnost spustit procvičování pouze pro dané téma.

### 9.4 Procvičování
Rozhraní procvičování má být co nejčistší. Musí obsahovat:

- jednu dominantní kartičku nebo otázku,
- přehled aktuálního postupu,
- tlačítko pro odhalení odpovědi,
- akce pro hodnocení úspěšnosti,
- přepínač učebního balíčku.

### 9.5 Hry
Sekce her zobrazí jednotlivé herní režimy jako dlaždice nebo seznam. U každého režimu bude:

- název,
- stručný popis,
- obtížnost,
- počet otázek,
- poslední výsledek nebo nejlepší skóre.

### 9.6 Pokrok
Sekce pokroku má zobrazit:

- hlavní metriky v horní části,
- rozpad podle kategorií,
- seznam doporučených frází k opakování,
- případně grafický progress bar nebo jednoduchý sloupcový přehled.

## 10. UX a vizuální zásady
Rozhraní má být dospělé, praktické a rychlé. Nemá připomínat dětskou aplikaci ani marketingový landing page.

Povinné zásady:

- vysoká čitelnost textu,
- rychlá orientace bez zbytečných kliků,
- jasně viditelné hlavní akce,
- dobré ovládání palcem na mobilu,
- dostatečně velké dotykové prvky,
- konzistentní typografie a komponenty,
- okamžitá zpětná vazba po interakci.

Vizuální směr:

- čistý moderní webapp styl,
- světlý režim jako výchozí,
- volitelný tmavý režim,
- jedna hlavní akcentní barva,
- decentní animace, nikoli efektní přechody na úkor rychlosti,
- důraz na text a obsah, ne na ilustrace.

## 11. Technická specifikace

### 11.1 Doporučený stack
Nasaditelná varianta pro Webglobe hosting:

- HTML5,
- CSS3 bez závislosti na frameworku,
- vanilla JavaScript,
- PHP 8+,
- MySQL 8 nebo kompatibilní verze,
- Apache nebo běžné hostingové prostředí.

Přípustné technické rozhodnutí:

- aplikace může být tvořena jako více PHP šablon nebo jako jedna hlavní stránka s interní navigací,
- data mohou být v MVP uložená v JSON souborech a stav uživatele v LocalStorage,
- pokročilejší verze může ukládat obsah i pokrok do MySQL přes PHP backend.

Nepřípustné nebo nevhodné řešení:

- závislost na Node.js serveru,
- nasazení vyžadující běžící build proces na hostingu,
- architektura závislá na websocket serveru nebo dlouhých serverových procesech,
- backend postavený na technologiích, které klasický hosting standardně nenabízí.

### 11.2 Doporučená architektura verze MVP
Pro první fázi vývoje se doporučuje tato architektura:

- veřejná část jako frontend v HTML, CSS a JS,
- data frází uložená v JSON nebo přímo generovaná z PHP,
- stav uživatele ukládán do LocalStorage,
- bez registrace a bez nutnosti databáze,
- hash navigace nebo jednoduché klientské přepínání sekcí.

Výhoda: rychlejší realizace, snadné nasazení, nízké hostingové nároky.

### 11.3 Doporučená architektura verze 2
Pro rozšířenou verzi se doporučuje:

- PHP backend s jednoduchým API nebo endpointy,
- MySQL databáze pro obsah a uživatelský pokrok,
- možnost administrace obsahu přes chráněnou část webu,
- možnost registrace a přihlášení uživatele,
- synchronizace pokroku mezi zařízeními.

## 12. Návrh datového modelu

### 12.1 Tabulka nebo entita phrases
Navrhovaná pole:

- id
- category_id
- czech_text
- italian_text
- pronunciation_cz
- usage_note
- example_text
- difficulty_level
- frequency_level
- phrase_type
- is_active
- created_at
- updated_at

### 12.2 Tabulka nebo entita categories
Navrhovaná pole:

- id
- slug
- name
- description
- sort_order
- is_active

### 12.3 Tabulka nebo entita user_phrase_progress
Pouze pro verzi s účty nebo serverovým ukládáním:

- id
- user_id
- phrase_id
- status
- is_favorite
- mistake_count
- correct_count
- last_seen_at
- next_review_at

### 12.4 Tabulka nebo entita users
Pouze pro verzi s registrací:

- id
- email
- password_hash
- display_name
- created_at
- updated_at

## 13. Ne-funkční požadavky
Projekt musí splnit také tyto ne-funkční požadavky:

- responzivita pro mobil, tablet i desktop,
- korektní fungování v aktuálních verzích Chrome, Safari, Edge a Firefox,
- rychlé načtení i na pomalejším mobilním připojení,
- přístupnost na základní úrovni, zejména čitelnost, kontrast, ovladatelnost klávesnicí a srozumitelné popisky,
- bezpečné zacházení s uživatelskými daty v případě verze s backendem,
- jednoduchá údržba obsahu bez nutnosti zásahu do složité architektury.

## 14. Bezpečnostní požadavky
Pokud projekt přejde do verze s PHP backendem a databází, musí být řešeno minimálně:

- bezpečné ukládání hesel pomocí hashování v PHP,
- ochrana proti SQL injection přes prepared statements,
- validace a sanitizace vstupů,
- ochrana administrační části,
- omezení přímého přístupu k interním endpointům,
- bezpečná práce se session.

## 15. Obsahová správa
Zadání musí počítat s tím, že obsah frází se bude časem upravovat. Proto je vhodné navrhnout dvě možné úrovně správy:

### Varianta A: jednoduchá správa pro MVP

- fráze uložené v JSON nebo PHP poli,
- editace přímo v souborech,
- vhodné pro první verzi bez administrace.

### Varianta B: rozšířená správa

- administrační rozhraní v PHP,
- CRUD pro kategorie a fráze,
- možnost označit frázi jako aktivní nebo neaktivní,
- možnost měnit pořadí a prioritu frází.

## 16. Etapy realizace

### Fáze 1: analýza a návrh

- potvrzení rozsahu funkcí,
- návrh informační architektury,
- návrh datového modelu,
- definice obsahu pro první sadu frází,
- návrh wireframů klíčových obrazovek.

### Fáze 2: MVP

- katalog frází,
- filtrování a vyhledávání,
- kartičkové procvičování,
- označení umím a neumím,
- oblíbené a těžké fráze,
- základní přehled pokroku,
- responzivní frontend,
- ukládání stavu do LocalStorage.

### Fáze 3: rozšíření

- více herních režimů,
- lepší logika opakování,
- audio výslovnost,
- serverové ukládání pokroku,
- účty uživatelů,
- administrace obsahu.

## 17. Minimální rozsah MVP
Za dokončené MVP se bude považovat verze, která splní všechny následující body:

1. Obsahuje alespoň 200 praktických frází v tematických kategoriích.
2. Umožňuje vyhledávání a filtrování frází.
3. Umožňuje procvičování formou kartiček.
4. Umožňuje označit frázi jako umím, neumím a oblíbené.
5. Uchovává stav uživatele alespoň lokálně v prohlížeči.
6. Zobrazuje základní přehled pokroku.
7. Je plně použitelná na mobilu.
8. Lze ji nasadit na běžný Webglobe hosting bez Node.js runtime.

## 18. Akceptační kritéria
Projekt bude považován za úspěšně realizovaný, pokud bude platit:

1. Uživatel se během několika sekund dostane ke konkrétní frázi podle tématu nebo vyhledávání.
2. Procvičování bude fungovat bez registrace a bez složitého nastavení.
3. Aplikace bude přehledná a dobře použitelná na mobilním telefonu.
4. Obsah bude zaměřen na reálné praktické situace, ne na školní výklad gramatiky.
5. Technické řešení bude provozuschopné na klasickém PHP hostingu.
6. Kód a datová struktura umožní pozdější rozšíření o databázi, audio a uživatelské účty.

## 19. Doporučené rozšíření po spuštění
Po dokončení MVP je vhodné počítat s těmito rozšířeními:

- audio nahrávky nebo generovaná výslovnost,
- tiskový tahák s oblíbenými frázemi,
- export do PDF,
- scénáře typu simulace dialogu,
- spaced repetition logika,
- přihlášení uživatelů a synchronizace mezi zařízeními,
- administrace obsahu,
- lehká PWA vrstva pro offline použití.

## 20. Výsledek zadání
Výsledkem má být funkční, obsahově silná a technicky realistická webová aplikace pro učení praktické italštiny, kterou bude možné nasadit na běžný hosting bez speciální serverové infrastruktury. Zadání má směřovat k produktu, který lze nejprve rychle spustit jako lehké MVP a následně bez zásadního přepisu rozšířit do plnohodnotné výukové aplikace.