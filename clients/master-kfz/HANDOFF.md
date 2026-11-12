# Übergabe – Stand für eine neue Sitzung

Kurzfassung, damit eine frische Claude-Sitzung ohne den langen Verlauf weiterarbeiten kann.

## Stand (31.10.2026)
- Branch `ccr-8071ecde-eiur8o`, Draft-PR #233. CI grün.
- Website komplett (DE/TR/EN, 44 Seiten), Buttons: Racing Carbon (`UI_STYLE` in `src/data.mjs`).
- Hero: Flow-Video `static/media/hero.mp4` (Desktop per Scroll gespult). Galerie: Fotos als schräges Banner.
- „Ein Blick. Jedes System.“: gedämpfte Kamerafahrt über 4 Zonen (`data-tour` in `views.mjs`, Abschnitt *Vehicle check* in `site.js`), Auto in `src/svg.mjs` → `carPremium`.
- Motion-Design-System: Feder-Kurve `--spring`, Stagger `--stagger`, Sucher-Ecken `--vf`, Körnung/Vignette auf `body::before/after`, Daten-Schrift JetBrains Mono (selbst gehostet, `static/fonts/`).
- Alle Fotos/Videos sind KI-Bilder → sichtbares Etikett (EU AI Act Art. 50). Schalter `MEDIA_IS_AI` in `src/data.mjs`; erst auf `false`, wenn nur noch echte Werkstattfotos in `static/media/` liegen.
- Recht: Impressum/Datenschutz in `src/legal.mjs`; offene Angaben erscheinen als gelbe TODO-Marken und sperren den Live-Deploy.
- Logo noch offen: Auswahl aus `docs/logo-shortlist.pdf` (Nummern Familie.Variante, z. B. 2.3).
- Artifact-Vorschau (privat): Website https://claude.ai/artifact/GKQTveTZXhKnKYvpiio3qq · Logos https://claude.ai/artifact/PHKSs8ZuZBnYWxwpig2gdP

## Offene Punkte
Siehe README „Vor dem Livegang“: Firmierung/HRB/USt-ID, Öffnungszeiten, MwSt.-Hinweis, Diagnose/Englisch, Logo, `WEB3FORMS_KEY`, eigenes Vercel-Projekt (Root Directory `clients/master-kfz`).

## Arbeitsweise (sparsam)
- Bauen/prüfen: `node build.mjs && node verify.mjs` (im Ordner `clients/master-kfz`). `verify` prüft auch die Tag-Struktur jeder Seite (offene/verschachtelte Links) – ein fehlendes `</a>` erzeugte einmal einen leeren Kasten auf der Startseite.
- Vorschau aktualisieren: `node tools/preview-export.mjs`, dann nur geänderte Dateien veröffentlichen
  (meist `index.html`, `css/site.css`, `js/site.js` – Unterseiten laden CSS/JS über denselben Pfad).
- Logo-PDF neu: `node tools/logo-pdf.cjs`.
- Hero-Video neu kodieren (Quelle: Flow-Original 1920×1080):
  `ffmpeg -i SRC -an -c:v libx264 -preset veryslow -crf 23 -tune film -g 18 -keyint_min 18 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart static/media/hero.mp4`
  Handy (Hochformat-Ausschnitt): `... -vf "crop=608:1080:813:0,scale=720:1280:flags=lanczos" -crf 25 -g 24 ... static/media/hero-m.mp4`
- Neues Foto in `static/media/`: danach `python3 tools/images.py` (erzeugt die 600-px-Handyvariante, `srcset` greift automatisch).
- CSS: Quelle `static/css/site.css` mit Kommentaren; der Build (`src/css.mjs`) entfernt Kommentare und die Regeln der internen Boards. Die Boards laden `boards.css` (komplett, Originalreihenfolge).
- Performance (Lighthouse, Handy gedrosselt): Startseite 99, LCP 1,7 s, TBT 0, CLS 0. `serve.mjs` komprimiert wie Vercel, damit lokale Messungen stimmen.
- Screenshots nur gezielt und verkleinert; keine PR-Benachrichtigungen abonnieren (Vercel-Bot erzeugt pro Push mehrere).
