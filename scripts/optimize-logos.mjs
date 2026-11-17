// Trims the transparent padding off the carrier logos in images/source/logos/ and writes
// small transparent PNG files to images/logos/ (height-normalised for crisp display at ~40px on 3x screens).
// Run: node scripts/optimize-logos.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'images/source/logos';
const OUT = 'images/logos';
const HEIGHT = 96; // px; logos render at ≤32 CSS px, so this is sharp on 3x screens

// [source file, output name]
const MAP = [
  ['United_Healthcare_logo_PNG1.png', 'unitedhealthcare'],
  ['Blue-Cross-Blue-Shield-Logo.png', 'bcbs'],
  ['aetna logo.png', 'aetna'],
  ['Kaiser-Permanente-Logo.png', 'kaiser'],
  ['Logo-Cigna.png', 'cigna'],
  ['Humana-Logo.png', 'humana'],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [file, name] of MAP) {
  const src = path.join(SRC, file);
  // Flatten any near-white matte to transparent, then trim the empty border.
  const trimmed = await sharp(src).ensureAlpha().trim({ threshold: 1 }).toBuffer();
  // Flat-colour logos compress best as 8-bit palette PNG with alpha (~half the size of lossy WebP here).
  const out = path.join(OUT, `${name}.png`);
  const info = await sharp(trimmed)
    .resize({ height: HEIGHT, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB  (from ${(fs.statSync(src).size / 1024).toFixed(0)} KB)`);
}
