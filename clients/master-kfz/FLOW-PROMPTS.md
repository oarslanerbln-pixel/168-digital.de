# Bilder & Video aus Flow – Prompt-Liste

Die Startseite hat feste Bildflächen. Eine Fläche erscheint **erst, wenn die
Datei in `static/media/` liegt** – vorher bleibt die Liniengrafik. Datei
ablegen, `node build.mjs`, fertig.

| Datei | Wo | Format | Pflicht |
| --- | --- | --- | --- |
| `hero.webp` | Hero-Hintergrund (Ken-Burns-Zoom, abgedunkelt) | 16:9, mind. 2400 × 1350 | nein |
| `hero.mp4` | Hero als Video-Loop (nur zusammen mit `hero.webp` als Poster) | 16:9, 6–10 s, ohne Ton, H.264, ≤ 5 MB | nein |
| `reel-diagnostics.webp` | Galerie „Einblicke“ 01 | 4:5, 1200 × 1500 | nein |
| `reel-brakes.webp` | Galerie 02 | 4:5 | nein |
| `reel-tyres.webp` | Galerie 03 | 4:5 | nein |
| `reel-oil.webp` | Galerie 04 | 4:5 | nein |
| `reel-timingbelt.webp` | Galerie 05 | 4:5 | nein |

WebP-Export z. B. über [squoosh.app](https://squoosh.app) (Qualität 75–80).
Ziel: Hero ≤ 350 kB, Galerie ≤ 200 kB pro Bild.

## Stil-Vorgabe (an jeden Prompt anhängen)

> cinematic automotive photography, dark near-black workshop, a single deep red
> accent light (#E3141C), soft rim light, polished concrete floor, shallow depth
> of field, 35mm lens, subtle haze, high contrast, premium, minimal, no text, no
> logos, no brand emblems, no readable license plates

So wirken alle Bilder wie aus einem Shooting und passen zur Seite (Schwarz + ein Rot).

## Prompts

**hero (Bild, 16:9)**
> Low-angle side view of a modern dark sports coupé on a two-post car lift in an
> empty, clean workshop at night, red light strip reflecting along the car body,
> large negative space on the left for headline text — [Stil-Vorgabe]

**hero (Video, Veo, 16:9, 8 s, Loop)**
> Slow cinematic dolly shot along the side of a dark sports coupé on a car lift in
> a clean night-time workshop, a red light strip slowly sweeps across the bodywork,
> faint haze, camera moves left to right, seamless loop, no people — [Stil-Vorgabe]

**reel-diagnostics (4:5)**
> Close-up of a mechanic's hand plugging an OBD diagnostic connector into a car,
> tablet with abstract graphs glowing softly in the background — [Stil-Vorgabe]

**reel-brakes (4:5)**
> Macro shot of a drilled brake disc and red brake caliper behind a removed wheel,
> metal texture, sparks of light on the disc edge — [Stil-Vorgabe]

**reel-tyres (4:5)**
> A tyre being mounted on a wheel balancing machine, tread pattern in sharp focus,
> motion blur on the spinning wheel — [Stil-Vorgabe]

**reel-oil (4:5)**
> Fresh golden engine oil pouring in a smooth stream into an engine filler neck,
> backlit so the oil glows, dark engine bay — [Stil-Vorgabe]

**reel-timingbelt (4:5)**
> Detailed view of a new timing belt kit with pulleys laid out on a dark workbench,
> precise arrangement, top-down, tools neatly aligned — [Stil-Vorgabe]

## Wichtig

- KI-Bilder als **Atmosphäre und Details** einsetzen, nicht als „unser Team“ oder
  „unsere Werkstatt“ – das wäre irreführend. Echte Fotos von der Treptower Str. 51
  (Werkstatt, Ömer Ates bei der Arbeit) wirken für lokale Kunden am glaubwürdigsten
  und können jede Fläche jederzeit ersetzen.
- Keine echten Markenlogos, Kennzeichen oder erkennbaren Personen generieren.

---

# Hero-Film: 360°-Fahrzeug mit animierten Punkten

**Idee:** Ein echt wirkendes Auto in einem dunklen Studio. Beim Scrollen dreht sich
die Kamera um das Fahrzeug (das Video wird per Scroll „gespult“, wie bei Apple).
Sobald ein Bauteil zur Kamera zeigt, leuchtet dort ein roter Punkt auf und
beschriftet sich: *Bremsen · Reifen · Ölwechsel · Klima · Diagnose*. Ein Klick
führt zur Leistung. Die Punkte sind echtes HTML über dem Video, also scharf,
übersetzbar (DE/TR/EN) und für Google lesbar.

## Vier Regie-Varianten

| | Variante | Ablauf | Wirkung |
| --- | --- | --- | --- |
| **A** | **Orbit 360 (Empfehlung)** | Auto auf Drehteller, Kamera kreist einmal komplett auf Radhöhe | Ruhig, premium, Punkte gut platzierbar |
| B | Cockpit → Außen | Start im Innenraum (Tacho glüht rot), Kamera fährt durch die Frontscheibe hinaus und umkreist das Auto | Sehr filmisch, starker Einstieg |
| C | Scan & Wireframe | Ein roter Laser-Scan läuft über das echte Auto, dahinter wird es zur leuchtenden Linienzeichnung (wie unser Blueprint-Auto) | Verbindet Film und bestehendes Design, „Diagnose“-Story |
| D | Unter der Hebebühne | Auto fährt hoch, Kamera gleitet darunter an Bremsen, Auspuff und Fahrwerk vorbei | Zeigt Werkstatt-Kompetenz, sehr ungewöhnlich |

## So arbeitest du in Flow

1. **Referenzbild zuerst** (Bild-Prompt unten), das Auto bleibt so in allen Clips gleich.
   In Flow als *Ingredient* / Startbild verwenden.
2. Clips mit **Frames to Video** erzeugen, Anschlüsse mit **Extend** verlängern.
3. Immer 16:9, 1080p. Für das Handy zusätzlich eine 9:16-Fassung desselben Shots.
4. In jedem Prompt: *no people, no faces, no hands, unbadged car, no logos, no
   readable license plate* – keine Gesichter, keine echten Marken.

## Gemeinsamer Stil-Block (an jeden Prompt anhängen)

> ultra-realistic, photorealistic automotive commercial, shot on ARRI Alexa,
> 35mm anamorphic lens, dark seamless studio with polished black floor, single
> deep red light ring overhead (#E3141C) and soft white rim lights, subtle haze,
> crisp reflections on the paint, high dynamic range, 4K detail, no people, no
> faces, no hands, unbadged car, no logos, no readable license plate, no text

## Prompts

**0 · Referenzbild (Bild, 16:9)**
> A sleek modern dark graphite-grey sports coupé, unbadged, three-quarter front
> view, standing on a slowly rotating circular turntable in a dark studio, red
> light ring reflected in the windshield and bonnet — [Stil-Block]

**A1 · Orbit 360 (Video, 8 s) – Hauptclip für das Scroll-Video**
> Smooth, constant-speed 360-degree orbit around the graphite sports coupé on the
> turntable, camera at wheel height, perfectly level horizon, the car stays
> centred and the same size for the whole shot, ends at the exact starting angle
> for a seamless loop, no cuts — [Stil-Block]

**A2 · Detail-Pass (Video, 8 s)**
> Slow macro tracking shot gliding along the side of the coupé: front headlight
> igniting, then the drilled brake disc and red caliper behind the alloy wheel,
> then the tyre tread, shallow depth of field — [Stil-Block]

**B1 · Cockpit (Video, 8 s) – Startframe: Innenraum ohne Personen**
> Interior of the empty coupé at night, camera starts close on the instrument
> cluster as the rev needle sweeps into a glowing red zone, then slowly pulls
> back between the empty seats and out through the windshield into the dark
> studio — [Stil-Block]

**B2 · Außen-Orbit (Extend von B1, 8 s)**
> Continue the camera move: rise slightly and orbit around the front of the car
> to its side profile, red light ring sweeping across the bodywork — [Stil-Block]

**C1 · Scan & Wireframe (Video, 8 s)**
> Side profile of the coupé, a thin vertical red laser scan line travels slowly
> from the front to the rear; behind the line the car transforms into a glowing
> white-and-red wireframe on black, in front of the line it stays photorealistic
> — [Stil-Block]

**D1 · Hebebühne (Video, 8 s)**
> The coupé rises on a two-post lift in a clean dark workshop, the camera glides
> underneath from front to rear revealing brake discs, suspension and exhaust,
> red work lights, cinematic slow motion — [Stil-Block]

**Poster / Standbild (Bild, 16:9 und 4:5)**
> Low-angle side profile of the coupé on the turntable, red light ring above,
> large empty dark space on the left for the headline — [Stil-Block]

## Übergabe an die Website

| Datei | Inhalt |
| --- | --- |
| `static/media/hero-orbit.mp4` | Clip A1 (oder B/C/D), 16:9 |
| `static/media/hero-orbit-m.mp4` | dieselbe Szene in 9:16 fürs Handy |
| `static/media/hero.webp` | Poster/Standbild |

Damit das Video beim Scrollen ruckelfrei vor- und zurückspult, muss jedes Bild ein
Schlüsselbild sein. Ich konvertiere das beim Einbau, oder selbst mit:

```bash
ffmpeg -i flow-a1.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -g 1 -crf 24 -an -movflags +faststart hero-orbit.mp4
ffmpeg -i flow-a1-9x16.mp4 -vf "scale=1080:-2,fps=30" -c:v libx264 -g 1 -crf 27 -an -movflags +faststart hero-orbit-m.mp4
```

Sobald die Dateien da sind, baue ich die 360°-Sektion: Video an den Scroll
gekoppelt, die fünf Punkte zu den Sekunden eingeblendet, in denen das Bauteil
sichtbar ist, mit Fallback auf das Linien-Auto bei langsamer Verbindung oder
„Bewegung reduzieren“.
