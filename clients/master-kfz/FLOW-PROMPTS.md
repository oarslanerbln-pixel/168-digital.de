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
