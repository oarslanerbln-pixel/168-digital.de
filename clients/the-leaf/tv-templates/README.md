# The Leaf Berlin – TV signage templates

Portrait (9:16) menu-board clips for The Leaf Berlin, built from the
client's layout sheet: **Variant 1 "Fokus Video"** (footage + logo band)
and **Variant 2 "Text & Motiv"** (adds title, description and a circular
motif). One HTML overlay, one JSON file per clip, one command.

This folder is client work and is not part of the website build
(Vite only bundles `src/` and `public/`); it has its own `package.json`
so Playwright never enters the website's dependency tree or CI.

## Render

```bash
cd clients/the-leaf/tv-templates
npm install                    # Playwright only; needs ffmpeg on PATH
node render.mjs --stills-only  # preview JPGs for client approval (seconds)
node render.mjs                # all slides -> out/*.mp4
node render.mjs slides/02-baklava-cheesecake.json --rotate cw --scale 2
```

| Flag | Default | Purpose |
| --- | --- | --- |
| `--fps` | 25 | 25/50 match footage shot for the German 50 Hz grid |
| `--scale 2` | off | 2160 × 3840 master for 4K panels |
| `--rotate cw\|ccw` | off | extra 1920 × 1080 file for players that cannot rotate |
| `--stills-only` | off | JPG at t = 3 s only |

Output: H.264 High (4.2 / 5.1 for 4K), yuv420p, CRF 18 capped at
12 Mbit/s (30 Mbit/s for 4K), no audio,
`+faststart` – plays on Samsung/LG signage, Android boxes and USB playback.

## Slide config (`slides/*.json`)

```json
{
  "duration": 10,
  "background": "footage/baklava.mp4",
  "backgroundStart": 2.5,
  "title": "Baklava-Cheesecake",
  "subtitle": "Pistazie · Karamell · hausgemacht",
  "motif": { "text": "Jetzt probieren" },
  "logo": "assets/logo.svg",
  "exit": true
}
```

- `background: null` renders a calm placeholder backdrop labelled
  "Platzhalter" – used for approval before the shoot.
- Footage of any aspect ratio is scaled to cover and centre-cropped; clips
  shorter than `duration` loop.
- `motif` takes `{ "text": … }` or `{ "image": "assets/…png" }`; omit
  `title`/`subtitle`/`motif` for Variant 1.
- `exit: true` fades text and motif out in the last 0.7 s so playlists cut
  cleanly; the logo band stays visible throughout, as the client asked.

## Open items before delivery

- Replace the placeholder wordmark with the client's vector logo (`logo`).
- Replace `--leaf-green` / `--leaf-ivory` in `template/overlay.html` with
  the exact CI colours.
- Confirm the screen/player model to decide portrait vs. `--rotate`.

Filming guidelines for the shoot (German, for client and camera crew):
[`DREHBRIEF.md`](DREHBRIEF.md).
