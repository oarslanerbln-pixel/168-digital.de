# Übergabe – Stand für eine neue Sitzung

Kurzfassung, damit eine frische Claude-Sitzung ohne den langen Verlauf weiterarbeiten kann.

## Stand (31.10.2026)
- Branch `ccr-8071ecde-eiur8o`, Draft-PR #233. CI grün.
- Website komplett (DE/TR/EN, 44 Seiten), Buttons: Racing Carbon (`UI_STYLE` in `src/data.mjs`).
- Hero: Flow-Video `static/media/hero.mp4` (Desktop per Scroll gespult). Galerie: Fotos als schräges Banner.
- „Ein Blick. Jedes System.“: Kamerafahrt mit Schlüsselbildern (`site.js`, Abschnitt *Vehicle check*), Auto in `src/svg.mjs` → `carPremium`.
- Logo noch offen: Auswahl aus `docs/logo-shortlist.pdf` (Nummern Familie.Variante, z. B. 2.3).
- Artifact-Vorschau (privat): Website https://claude.ai/artifact/GKQTveTZXhKnKYvpiio3qq · Logos https://claude.ai/artifact/PHKSs8ZuZBnYWxwpig2gdP

## Offene Punkte
Siehe README „Vor dem Livegang“: Firmierung/HRB/USt-ID, Öffnungszeiten, MwSt.-Hinweis, Diagnose/Englisch, Logo, `WEB3FORMS_KEY`, eigenes Vercel-Projekt (Root Directory `clients/master-kfz`).

## Arbeitsweise (sparsam)
- Bauen/prüfen: `node build.mjs && node verify.mjs` (im Ordner `clients/master-kfz`).
- Vorschau aktualisieren: `node tools/preview-export.mjs`, dann nur geänderte Dateien veröffentlichen
  (meist `index.html`, `css/site.css`, `js/site.js` – Unterseiten laden CSS/JS über denselben Pfad).
- Logo-PDF neu: `node tools/logo-pdf.cjs`.
- Screenshots nur gezielt und verkleinert; keine PR-Benachrichtigungen abonnieren (Vercel-Bot erzeugt pro Push mehrere).
