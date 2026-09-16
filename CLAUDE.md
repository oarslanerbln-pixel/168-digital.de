# CLAUDE.md

Arbeitsanweisungen für Claude Code in diesem Repository.
Sprache im Chat: **Deutsch**. Sprache in Code, Kommentaren, Commits und PRs: **Englisch**.

## Was das hier ist

Marketing- und Portfolio-Website der Berliner Agentur **1618 Digital**
(Web/SaaS, Kinematografie & Drohne, Hochzeitsfilme, Social Media).
Kein CMS, kein Backend, keine Datenbank: eine statische React-SPA,
die auf Vercel liegt. Jeder Inhalt steht im Repo.

Der einzige Zweck der Seite ist die **Anfrage über das Kontaktformular
bzw. WhatsApp**. Bei jeder Änderung gilt: Bringt sie einen Besucher
schneller oder sicherer zu diesem Punkt? Wenn nein, ist sie Dekoration
und muss sich rechtfertigen.

## Stack

React 18 · TypeScript · Vite 5 · react-router-dom 6 · framer-motion ·
react-i18next · Lenis Smooth Scroll · Vanilla CSS mit Custom Properties.

**Kein Tailwind, kein CSS-Modules, kein styled-components.** Utility-Klassen
wie `max-w-[1300px]` sind in diesem Projekt wirkungslos – sie waren schon
einmal Ursache eines Mobile-Overflow-Bugs. Styles kommen aus
`src/index.css` (global) oder aus einer `Component.css` neben der Komponente.

Das README beschreibt teils einen älteren Three.js/R3F-Stand. Im Zweifel
gilt `package.json`, nicht das README.

## Befehle

```bash
npm install         # einmalig
npm run dev         # Dev-Server
npm run build       # tsc && vite build – muss fehlerfrei sein
npm test            # vitest (10 Tests, 5 Dateien)
npx tsc --noEmit    # reine Typprüfung
node download-fonts.mjs  # Schriften neu holen + index.html/catalog.css regenerieren
```

CI (`.github/workflows/ci.yml`) fährt genau: `npm ci` → `tsc --noEmit`
→ `vite build` → `npm test`. **Vor jedem Push lokal dieselbe Kette laufen
lassen.**

## Architektur – wo was liegt

| Aufgabe | Ort |
| --- | --- |
| Routen, globale Overlays, Preloader-Logik | `src/App.tsx` |
| Startseite (4 Sektionen) | `src/pages/Home.tsx` |
| Alle Texte, 3 Sprachen (DE/EN/TR) | `src/i18n.ts` |
| Service-Metadaten (Slug, Icon, Reihenfolge) | `src/data/services.ts` |
| Service-Langtexte | `src/data/serviceContent.ts` |
| Referenzen/Projekte | `src/data/works.ts` |
| Blog | `src/data/blogContent.ts` |
| Impressum/Datenschutz | `src/data/legalContent.tsx` |
| 50 Design-Konzepte (Showcase) | `src/data/webDesignConcepts.ts` |
| Meta-Tags pro Route | `src/components/SEOHead.tsx` |
| Lead-Versand (Web3Forms) | `src/utils/leads.ts` |

**Inhalte gehören nach `src/data/` oder `src/i18n.ts`, niemals hart in JSX.**
Ein neuer Service heißt: Eintrag in `services.ts` + Texte in
`serviceContent.ts` + i18n-Keys + Eintrag in `public/sitemap.xml` +
`hasOfferCatalog` in `index.html`. Alle fünf, sonst ist er inkonsistent.

## Regeln, die dieses Projekt teuer gelernt hat

### 1. DSGVO ist hier kein Nebenschauplatz
Die Seite verkauft Seriosität an deutsche Kunden; eine Abmahnung wegen
Google Fonts oder eines vorab ladenden Trackers kostet mehr als jedes
Feature bringt.

- **Niemals** eine Ressource von einer externen Domain zur Laufzeit laden.
  Schriften werden selbst gehostet (`public/fonts/`, erzeugt von
  `download-fonts.mjs`). Kein `fonts.googleapis.com`, kein CDN-Script,
  keine eingebettete Karte, kein externes Icon-Sprite.
- Analytics (GA4, Meta Pixel, Vercel Analytics) startet **ausschließlich**
  nach aktiver Einwilligung im Cookie-Banner – siehe `src/main.tsx` und
  `src/components/CookieConsent.tsx`. Diese Reihenfolge nicht umbauen.
- Keys kommen aus `import.meta.env.VITE_*`. Niemals ein Secret committen;
  `.env.example` dokumentiert die Variablen ohne Werte.

### 2. Der Viewport ist heilig
`html`/`body` sind in `src/index.css` auf `overflow-x: clip` geklemmt,
weil ein zu breites Grid-Kind den *initial containing block* verbreitert
hat – dadurch rutschte der `position: fixed` Hamburger auf dem Handy aus
dem Bild. Grids brauchen deshalb `minmax(0, …)` statt fester
Mindestbreiten, und alles, was breiter als der Viewport sein darf
(Marquee, Media-Rails), scrollt in einem eigenen Container.
**Jede Layout-Änderung bei 375 px Breite gegenprüfen.**

### 3. Stapelreihenfolge kommt aus der Skala
In `src/index.css` stehen `--z-backdrop` bis `--z-preloader`. Neue fixierte
Elemente nehmen einen dieser Werte; wenn keiner passt, kommt ein neuer
Token in die Skala. **Keine nackten z-index-Literale mehr** – vorher
konkurrierten 100, 999, 9000, 9999, 99999, 100000 und 999999
gegeneinander, und der Menü-Button lag über dem Intro-Overlay.

### 4. Performance-Budget
Die Zielgruppe kommt mobil über Instagram, oft im Mobilfunknetz.

- Neue Routen werden in `App.tsx` **lazy** eingebunden, nie statisch.
- Schweres Material (Video, große Bilder, dekorative Schriften) lädt erst
  bei Sichtbarkeit – Muster siehe `Reel.tsx` und `WebDesignCatalog.tsx`.
- Bilder als WebP über `npm run optimize:images` (Quellen in `assets-src/`,
  Ergebnis in `public/`).
- Nach dem Build die Chunk-Größen ansehen. Ein neuer Chunk über ~50 kB
  gzip braucht eine Begründung.

### 5. Barrierefreiheit ist Teil von „premium"
Interaktives ist ein `<button>`, `<a>` oder ein echtes Formularfeld –
kein `<div>` mit `role` und `onClick`. Das Kontaktformular hatte genau
diesen Fehler: eine Fake-Checkbox, die keine Browser-Validierung auslöste
und den Datenschutz-Link unklickbar machte. `:focus-visible` ist global
gestylt und darf nicht wegoptimiert werden.

### 6. Drei Sprachen, keine halben
Jeder neue String bekommt einen Key in **allen drei** Blöcken (`en`, `de`,
`tr`) von `src/i18n.ts`. Ein deutscher Satz im englischen Block ist ein
Bug, kein Platzhalter. Türkisch braucht `latin-ext` – deshalb hat die
Font-Pipeline beide Subsets.

### 7. Design-System statt Einzelfallentscheidung
Die Palette ist bewusst monochrom (Papierweiß, Tinte, Grau) mit **einem**
Akzent; der blau-goldene Schimmer in der Hero-Headline ist der einzige
Farbverlauf der Seite und bleibt es. Farben kommen aus den Tokens in
`:root`, nicht aus Hex-Werten im Komponenten-CSS. Kein neuer Effekt, der
mit dem Schimmer um Aufmerksamkeit konkurriert.

## Arbeitsweise

- **Erst lesen, dann ändern.** Viele Dateien tragen ausführliche
  Kommentare, die erklären, *warum* etwas so aussieht. Diese Begründung
  vor dem Umbau lesen und beim Ändern mitpflegen.
- **Kommentare erklären das Warum**, nicht das Was. Der bestehende Stil
  (Blockkommentar über der Komponente, der die Entwurfsentscheidung
  begründet) wird fortgeführt.
- **Keine ungefragten Abhängigkeiten.** Jede neue Dependency muss gegen
  Bundle-Größe und DSGVO abgewogen und im PR begründet werden.
- **Toter Code wird gelöscht, nicht auskommentiert.** In
  `WebDesignCatalog.css` liegen noch Regeln aus kopierten Demos
  (`#compare-modal`, `#quote-overlay`, `#intro`), die nie gerendert
  werden – wer dort arbeitet, räumt sie mit auf.
- **Git:** Entwicklung auf einem `claude/*`-Branch, nie direkt auf `main`.
  PRs als Draft öffnen. Commit-Messages englisch, Imperativ, mit Grund.

## Bekannte offene Punkte

- `public/1618-intro-opt.mp4` ist 9,4 MB. Lazy geladen, aber für Mobilfunk
  zu schwer – braucht eine 720p-Variante, ein Poster-Bild und Respekt vor
  `prefers-reduced-data`.
- `src/index.css` ist mit ~1.450 Zeilen zu groß und vermischt Tokens,
  Utilities und Sektions-Styles.
- `src/i18n.ts` ist ein 500-Zeilen-Objekt für drei Sprachen; ab dem
  nächsten größeren Textzuwachs nach `src/locales/{en,de,tr}.json` teilen.
- Tests decken nur Preloader, Cursor, SEOHead und ServicePage ab. Das
  Kontaktformular – der Umsatzpfad der Seite – hat keinen Test.
