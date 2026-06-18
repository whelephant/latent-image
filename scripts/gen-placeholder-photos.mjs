/*
  Generates tonal placeholder photographs for the demo series so the image
  pipeline (AVIF/WebP/LQIP/lightbox/figure modes) is exercised with real files.
  These are abstract studies, NOT the owner's work — replace src/assets/series/*
  with real photographs and delete this script (or keep to regenerate demos).

  Run: node scripts/gen-placeholder-photos.mjs
*/
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'src/assets/series/developing-light');

// Muted, darkroom-adjacent palettes — the photos supply restrained colour.
const studies = [
  { name: '01-harbor-dawn', w: 1800, h: 1200, a: '#1b2a33', b: '#7c8a86', glow: '#d8c9a6' },
  { name: '02-window-light', w: 1200, h: 1500, a: '#221c18', b: '#8a7a63', glow: '#efe6d2' },
  { name: '03-tideline', w: 2000, h: 1125, a: '#10171c', b: '#46606b', glow: '#9fb7b5' },
  { name: '04-portrait-study', w: 1200, h: 1500, a: '#1a1413', b: '#6e5147', glow: '#e7c9a8' },
  { name: '05-rooftops', w: 1500, h: 1500, a: '#1d1a22', b: '#5d5566', glow: '#cfc2b0' },
  { name: '06-late-platform', w: 1800, h: 1200, a: '#14110d', b: '#5a4a35', glow: '#caa46a' },
];

function svg({ w, h, a, b, glow }) {
  const cx = Math.round(w * 0.62);
  const cy = Math.round(h * 0.4);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${cx / w}" cy="${cy / h}" r="0.7">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="${glow}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect x="0" y="${Math.round(h * 0.68)}" width="${w}" height="${Math.round(h * 0.32)}" fill="#000" opacity="0.18"/>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
</svg>`;
}

// Subtle film grain via random monochrome noise composited at low opacity.
function grain(w, h) {
  const len = w * h * 3;
  const buf = Buffer.allocUnsafe(len);
  let seed = 1337;
  for (let i = 0; i < len; i += 3) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const v = 120 + (seed % 64);
    buf[i] = buf[i + 1] = buf[i + 2] = v;
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 3 } });
}

await mkdir(OUT, { recursive: true });
for (const s of studies) {
  const base = sharp(Buffer.from(svg(s)));
  const noise = await grain(s.w, s.h).png().toBuffer();
  await base
    .composite([{ input: noise, blend: 'soft-light', opacity: 0.06 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${s.name}.jpg`));
  console.log('wrote', s.name);
}
console.log('done');
