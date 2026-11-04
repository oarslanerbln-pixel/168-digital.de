"""Make the 600 px phone variants of the photos in static/media (reel-*.webp, hero.webp).

Phones show these images at ~260-375 CSS px; at 2x that is ~520-750 px, so the 960/1600 px
originals waste 30-80 kB each on mobile data. Run after replacing a photo:
    python3 tools/images.py
"""
from pathlib import Path
from PIL import Image

media = Path(__file__).resolve().parent.parent / 'static' / 'media'
for src in sorted(media.glob('*.webp')):
    if src.stem.endswith('-600'):
        continue
    im = Image.open(src)
    if im.width <= 600:
        continue
    out = src.with_name(f'{src.stem}-600.webp')
    im.resize((600, round(im.height * 600 / im.width)), Image.LANCZOS).save(out, 'WEBP', quality=78, method=6)
    print(f'{out.name}: {out.stat().st_size // 1024} kB (from {src.stat().st_size // 1024} kB)')
