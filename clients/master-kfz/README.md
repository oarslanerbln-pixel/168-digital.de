# Master KFZ Werkstatt – Website

Kundenprojekt von 1618 Digital für die Kfz-Meisterwerkstatt **Master KFZ**,
Treptower Str. 51, 12059 Berlin-Neukölln. Zieldomain: `www.kfz-master.com`.

Statisch generierte Website in **Deutsch, Türkisch und Englisch** – ohne
Framework, ohne npm-Abhängigkeiten, ohne Cookies, ohne Tracking. Jede Seite
liegt als fertiges HTML vor (SEO/GEO), JavaScript ergänzt nur Animationen und
den Termin-Assistenten.

## Befehle

```bash
node build.mjs     # → dist/ (43 Seiten, sitemap.xml, robots.txt, llms.txt)
npm run dev        # bauen + lokaler Server auf http://localhost:4173
npm run verify     # bauen + prüfen: Sprachparität, Meta/hreflang, tote Links,
                   # externe Ressourcen, JSON-LD. STRICT=1 → offene TODOs = Fehler
```

## Aufbau

| Was | Wo |
| --- | --- |
| Firmendaten, Öffnungszeiten, Preise, Leistungen, URLs | `src/data.mjs` |
| Texte DE / TR / EN (identische Schlüssel) | `src/copy/{de,tr,en}.mjs` |
| Seiten-Templates | `src/views.mjs` |
| JSON-LD (AutoRepair, Service, FAQ, Breadcrumbs) | `src/schema.mjs` |
| Impressum, Datenschutz (nur DE) | `src/legal.mjs` |
| Logo-Konzepte, Blueprint-Auto, Icons | `src/svg.mjs` |
| Design-System / Motion | `static/css/site.css`, `static/js/site.js` |

Seiten: Start, Leistungen + 8 Leistungsseiten, Preise, Über uns, Termin – je
Sprache (`/`, `/tr/…`, `/en/…`, lokalisierte Slugs) – plus Impressum,
Datenschutz, 404 und die interne Seite `/logo-konzepte/` (noindex).

## Deployment (Vercel)

1. Neues Vercel-Projekt aus diesem Repo, **Root Directory: `clients/master-kfz`**
   (Build-Befehl und Output kommen aus `vercel.json`).
2. Auf [web3forms.com](https://web3forms.com) mit `masterteam.kfz@gmail.com`
   einen Access Key erzeugen → in Vercel als `WEB3FORMS_KEY` setzen.
   Ohne Key bricht der Production-Build ab. Bewusster Ausweg:
   `LEAD_FALLBACK_ONLY=true` – das Formular sendet dann per WhatsApp.
3. Domain `www.kfz-master.com` verbinden, `kfz-master.com` → `www` umleiten.

## Vor dem Livegang bestätigen

`npm run verify` listet offene Platzhalter; in `src/data.mjs` sind alle
unsicheren Angaben mit `TODO(confirm)` markiert.

- [ ] Exakte Firmierung (aktuell „Master KFZ Werkstatt GmbH“), HRB-Nummer, USt-IdNr.
- [ ] Betriebsleiter/Meister und Eintrag in die Handwerksrolle (Impressum)
- [ ] Öffnungszeiten (Platzhalter: Mo–Fr 8–18, Sa 9–14 Uhr)
- [ ] Preise inkl. MwSt.? Inhalt der Inspektion ab 129 €? (Quelle: Instagram-Flyer)
- [ ] Wird Fehlerdiagnose angeboten? Wird Englisch gesprochen?
- [ ] Logo-Entscheidung: Konzept A/B/C oder Bestandslogo (`/logo-konzepte/`)
- [ ] Echte Werkstattfotos (optional) – das Design funktioniert ohne

Hinweis: Das mitgeschickte Handelsregister-Schreiben betrifft die
*Nura Luxe Beauty UG* (HRB 283896 B), nicht Master KFZ – es wurde nicht verwendet.
Das Geburtsdatum des Inhabers gehört nicht ins Impressum und steht nirgends auf der Seite.

## Nach dem Livegang (lokale Sichtbarkeit)

1. **Google Unternehmensprofil** anlegen/verifizieren – wichtigster Hebel für
   „Autowerkstatt Neukölln“. Name, Adresse, Telefon exakt wie auf der Website.
2. Google Search Console + Bing Webmaster Tools: `sitemap.xml` einreichen.
3. Apple Business Connect, Bing Places, gelbeseiten.de, 11880 – überall gleiche NAP-Daten.
4. Nach jedem Auftrag um eine Google-Bewertung bitten (QR-Code am Tresen).
5. Instagram-Bio auf `https://www.kfz-master.com` verlinken.
