# Redesign Oktober 2026 – Zielgruppe, Positionierung, SEO/GEO

Kurzfassung der Überlegungen hinter dem Startseiten-Umbau. Ziel der Seite
bleibt unverändert: **Anfrage über Formular oder WhatsApp.**

## 1. Zielgruppe

| Segment | Typischer Auslöser | Was sie überzeugt | Wie sie kommen |
| --- | --- | --- | --- |
| Gastronomie (Restaurant, Café, Imbiss, Bar) | Telefon klingelt im Service, Karte veraltet, Lieferdienst-Provisionen | Sofort sichtbares Ergebnis (QR-Menü, Reservierung), Preis vorab, Ansprechpartner in ihrer Sprache | Instagram, Empfehlung, Google Maps – fast immer mobil |
| Eventbetriebe & Dienstleister (Salon, Praxis, Studio, Handwerk) | Termine per WhatsApp-Chaos, No-Shows, Excel | Online-Buchung, Erinnerungen, „läuft von selbst" | Google-Suche „… Berlin", Empfehlung |
| KMU / Mittelstand, Großhandel | Prozesse in Excel und E-Mail, kein Überblick | Kundenportal, Dashboard, Automatisierung; Seriosität, DSGVO | Google, LinkedIn, KI-Assistenten („Agentur für Software Berlin") |
| Türkischsprachige Unternehmer in Berlin | Wollen Beratung in der eigenen Sprache | Türkisch als vollwertige Sprache, persönlicher Kontakt | Community, Instagram, WhatsApp |

Gemeinsamer Nenner: **Inhaber entscheiden selbst, haben wenig Zeit, fürchten
versteckte Kosten und Fachchinesisch.** Daraus folgen die Bausteine der Seite.

## 2. Was sich geändert hat (und warum)

| Vorher | Nachher | Grund |
| --- | --- | --- |
| Manifest-Headline („Wo Bild und Code eins werden") + Showreel im Hero | Ergebnis-Headline („…die Kunden gewinnen und Ihnen Stunden sparen") + Produkt-Mockup | Besucher muss in 5 Sekunden verstehen, *was* er bekommt |
| CTA „Leistungen ansehen" | CTA „Kostenloses Erstgespräch" → Formular, daneben WhatsApp | Ein klarer nächster Schritt statt weiterer Navigation |
| – | Sektion **Lösungen**: Buchung, QR-Menü/Bestellung, Kundenportal, Automatisierung – jeweils als Mockup mit „Passt für" und eigenem CTA | Unternehmer denken in Problemen, nicht in Leistungskategorien; Mockups machen Software greifbar |
| – | Sektion **Ablauf** (4 Schritte + Zeitrahmen), **Zusagen**, Mid-Page-CTA | Nimmt Risiko/Kostenangst vor der Anfrage |
| – | **FAQ** mit FAQPage-JSON-LD | Letzte Einwände direkt über dem Formular; zitierfähige Antworten für Google & KI |
| Formular ohne Kontext | „So geht es weiter" (3 Schritte) + Themen-Chips; Lösungs-CTAs wählen das Thema vor | Formular wird sichtbarer erster Schritt eines bekannten Prozesses; Leads kommen vorsortiert an |
| Showreel im Hero | Showreel unter den Film-Leistungen | Beweist dort die Film-Hälfte, statt mit der Software-Hälfte zu konkurrieren |

Designsystem bleibt: monochrom, **ein** Akzent (Blau), der Blau-Gold-Schimmer
bleibt der einzige Verlauf. Neu sind nur Tokens für Akzent-Tönungen, Schatten
und Kartenradius. Pillenförmige Buttons in Normalschreibung statt eckiger
Versalien – wirkt zugänglicher, ohne verspielt zu sein.

## 3. SEO & GEO (Generative Engine Optimization)

Stand der Praxis 2026 (Quellen: seo-day.de, crowdo.net, llmpulse.ai u. a. –
überwiegend Anbieter-Blogs, Zahlen daher nur als Richtwert): GEO baut auf
solider SEO auf, statt sie zu ersetzen. Was KI-Assistenten zitieren, sind
**kurze, in sich geschlossene Passagen, die die Frage im ersten Satz
beantworten**, mit überprüfbaren Fakten, strukturierten Daten und
Erwähnungen auf anderen Seiten.

Umgesetzt in diesem PR:
- Meta-Titel/-Beschreibung (DE/EN/TR) auf Suchintention „Website/Software für
  Unternehmen in Berlin" ausgerichtet.
- `ProfessionalService`-JSON-LD um `knowsAbout`, `slogan` und Software-Leistungen ergänzt.
- FAQPage-JSON-LD auf der Startseite, identisch mit den sichtbaren Antworten.
- Antworten „answer-first" formuliert (erster Satz = Antwort).
- `public/llms.txt`: kompakte, maschinenlesbare Zusammenfassung für KI-Crawler.

**Wichtigster offener Punkt – höchste Priorität:** Die Seite wird nur
clientseitig gerendert. KI-Crawler (GPTBot, ClaudeBot, PerplexityBot) führen
in der Regel kein JavaScript aus und sehen deshalb nur die statischen
Meta-Tags aus `index.html`. **Prerendering (Entwurf in PR #173) ist die
Voraussetzung dafür, dass Lösungen, FAQ und Leistungstexte überhaupt in
KI-Antworten auftauchen.** `llms.txt` und die statischen JSON-LD-Daten
überbrücken das nur teilweise.

## 4. Nächste Schritte (nach Wirkung sortiert)

1. ~~Prerendering~~ – erledigt: alle Routen werden beim Build in allen drei Sprachen als HTML vorgerendert (`/`, `/de/`, `/tr/`); `?lang=` leitet per 301 um.
2. **Google-Unternehmensprofil** pflegen: Kategorie „Webdesigner" +
   „Softwareunternehmen", Leistungen, Fotos, wöchentliche Beiträge.
3. **Bewertungen sammeln** (Google): 5–10 echte Kundenstimmen; danach
   `aggregateRating` und Testimonials auf der Seite – stärkster
   Vertrauens- und GEO-Faktor, der aktuell fehlt.
4. **Fallstudien mit Zahlen** (z. B. Taka Fish House: „x % weniger
   Telefonreservierungen") – je eine eigene Seite, zitierfähig für KI.
5. **Keyword-Landingpages** für hohe Kaufabsicht, z. B. „Reservierungssystem
   Restaurant Berlin", „Online-Terminbuchung für Salons", „Software entwickeln
   lassen Berlin" – jeweils mit FAQ, wie die bestehenden Service-Seiten.
6. **Blog** auf Entscheiderfragen ausrichten („Was kostet ein
   Buchungssystem?", „QR-Menü vs. gedruckte Karte").
7. **Messen:** Formular-Absendungen und WhatsApp-Klicks als Conversions
   (nur nach Einwilligung, Reihenfolge in `main.tsx` beibehalten).

## 5. Vom Inhaber zu bestätigen

Die Texte machen bewusst nur Aussagen, die schon auf der Seite stehen oder
branchenüblich sind. Bitte prüfen:
- „Kostenloses Erstgespräch" (20–30 Min.)
- „Schriftliches Angebot mit festem Umfang vor Projektstart"
- Zeitrahmen „2–10 Wochen" (aus der Web/SaaS-Service-Seite übernommen)
- „Antwort innerhalb von 24 Stunden" (stand bereits im Hero)
- Die Zahlen in den Mockups sind illustrativ und als „Beispielansichten" gekennzeichnet.

## 6. Produktfotos (generiert)

Hero und Lösungs-Karten zeigen generierte Produktfotos statt der früheren
HTML-Mockups (Quellen `assets-src/solutions/`, WebP 640/1080 px, 14–57 kB).
Offene Schwächen, bei Gelegenheit neu generieren:
- `ordering.jpg`: Die generierten Dollar-Preise wurden nachträglich durch
  Euro-Preise ersetzt (14 €, 12 €, 4,50 €).
- Die Fotos tragen englische UI-Texte („RSVP“, „Send Email“) und im Dashboard
  einen grünen Wert – fällt in der Kartengröße kaum auf.
- Das farbige Dashboard-Motiv (sechstes Bild) wurde wegen der Palette nicht verwendet.
