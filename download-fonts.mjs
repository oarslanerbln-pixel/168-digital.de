// Run this script to download Outfit fonts for DSGVO-compliant self-hosting
// Usage: node download-fonts.mjs

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import https from 'https';
import path from 'path';

const fonts = [
  { name: 'outfit', weight: 300, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4E.ttf' },
  { name: 'outfit', weight: 400, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf' },
  { name: 'outfit', weight: 600, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf' },
  { name: 'outfit', weight: 800, url: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4E.ttf' },
  // Playfair Display — used across the core site (self-hosted for DSGVO)
  { name: 'playfair', weight: 400, url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf' },
  { name: 'playfair', weight: 700, url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf' },
  { name: 'playfair', weight: 400, style: 'italic', url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtY.ttf' },
  // Plus Jakarta Sans — light-themed Services section only (self-hosted for DSGVO)
  { name: 'jakarta', weight: 500, url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m079TR_V.woff2' },
  { name: 'jakarta', weight: 600, url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0n9TR_V.woff2' },
  { name: 'jakarta', weight: 700, url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_Tkn9TR_V.woff2' },
  { name: 'jakarta', weight: 800, url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUn9TR_V.woff2' },
];

const fontsDir = path.join('public', 'fonts');
if (!existsSync(fontsDir)) {
  mkdirSync(fontsDir, { recursive: true });
  console.log('Created directory: public/fonts/');
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = [];
    https.get(url, (response) => {
      response.on('data', (chunk) => file.push(chunk));
      response.on('end', () => {
        writeFileSync(dest, Buffer.concat(file));
        resolve();
      });
      response.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const font of fonts) {
    const suffix = font.style === 'italic' ? `${font.weight}-italic` : `${font.weight}`;
    const ext = font.url.endsWith('.woff2') ? 'woff2' : 'ttf';
    const dest = path.join(fontsDir, `${font.name}-${suffix}.${ext}`);
    console.log(`Downloading ${font.name} ${suffix}...`);
    await download(font.url, dest);
    console.log(`  ✓ Saved: ${dest}`);
  }
  console.log('\n✅ All fonts downloaded! DSGVO-compliant self-hosting ready.');
})();
