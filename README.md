# 1618 Digital — Agentur-Website

Marketing- und Portfolio-Website der Berliner Digitalagentur **1618 Digital**
(Web & SaaS, kinematografische Video- und Drohnenproduktion, Hochzeitsfilme,
Social Media). Statische React-SPA, dreisprachig, ohne Backend.

→ Entwicklungsrichtlinien und Projektkonventionen: [`CLAUDE.md`](./CLAUDE.md)

## Stack

| | |
| --- | --- |
| Framework | React 18 + TypeScript, gebaut mit Vite 5 |
| Routing | react-router-dom 6, alle Routen lazy geladen |
| Animation | framer-motion + Lenis Smooth Scroll |
| Sprachen | react-i18next — Deutsch, Englisch, Türkisch |
| Styling | Vanilla CSS mit Custom Properties (kein Tailwind) |
| Leads | Web3Forms (kein eigener Server, kein SMTP) |
| Hosting | Vercel, Deploy bei jedem Push auf `main` |

## Entwicklung

Voraussetzung: Node.js 20+

```bash
npm install
npm run dev              # Dev-Server
npm run build            # tsc && vite build
npm test                 # vitest
npm run optimize:images  # assets-src/*.png -> public/*.webp
node download-fonts.mjs  # Schriften neu holen und einbinden
```

## Datenschutz

Die Seite lädt zur Laufzeit **keine** Ressource von einer fremden Domain.
Alle Schriften liegen unter `public/fonts/` und werden von
`download-fonts.mjs` als WOFF2 mit `unicode-range`-Subsets erzeugt — das
Skript schreibt auch den `@font-face`-Block in `index.html` und das
lazy geladene `public/fonts/catalog.css` für die Konzept-Galerie.

Analytics (Google Analytics 4, Meta Pixel, Vercel Analytics) startet erst
nach ausdrücklicher Einwilligung im Cookie-Banner. Die zugehörigen IDs
kommen aus Umgebungsvariablen; leere Werte deaktivieren den jeweiligen
Anbieter still. Siehe [`.env.example`](./.env.example).

## Inhalte pflegen

Es gibt kein CMS — alle Inhalte stehen im Repo:

- **Texte / Übersetzungen:** `src/i18n.ts` (alle drei Sprachblöcke pflegen)
- **Leistungen:** `src/data/services.ts` + `src/data/serviceContent.ts`
- **Referenzen:** `src/data/works.ts`
- **Blog:** `src/data/blogContent.ts`
- **Impressum / Datenschutz:** `src/data/legalContent.tsx`

Eine neue Leistung braucht zusätzlich einen Eintrag in
`public/sitemap.xml` und im `hasOfferCatalog`-Block von `index.html`.

## Deployment

Push auf `main` → Vercel baut und veröffentlicht automatisch.
Sicherheits-Header und SPA-Rewrites stehen in [`vercel.json`](./vercel.json).
