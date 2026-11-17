// Converts the source PNGs in images/source/ into responsive WebP files in images/.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'images/source';
const OUT = 'images';

// prompt # -> [source file, output name, widths (px), quality, optional crop {left, top, width, height}]
const MAP = [
  ['hf_20261117_222316_cdf9bf58-46bd-4e29-a2b2-5b0c1c23689c.png', 'hero-family',        [600, 900, 1200], 72], // 1
  // 2: renewal-notice photo replaced by the premium chart below (old source + problem-renewal-*.webp left on disk)
  // Chart: crop off the baked-in light-blue margin + shadow so only the white card remains. Higher quality for text.
  ['hf_20261117_224632_1aa81b0c-87fd-4eac-a430-ee0c44bd692c.png', 'premium-chart',      [720, 1080, 1440], 82, { left: 56, top: 40, width: 2218, height: 1608 }],
  ['hf_20261117_221538_ffd659d8-8f9a-4d22-ad77-68e83ee3cada.png', 'card-personal',      [480, 720, 960], 70],   // 3
  ['hf_20261117_221928_1cbab989-400c-463e-83c8-f5d1b30f8b4c.png', 'card-deductible',    [480, 720, 960], 72],   // 4
  ['hf_20261117_221548_1afad7bd-718b-4dd6-a9a7-f4148f8d9a99.png', 'card-network',       [480, 720, 960], 70],   // 5
  ['hf_20261117_221945_a149f4bd-e517-4bdd-a1ba-410a44af438b.png', 'intro-premium-stack',[480, 720, 960], 72],   // 6
  ['hf_20261117_221616_13a059cb-9e64-4e91-bee4-4f9d0de00522.png', 'schedule-call',      [720, 1080, 1600], 70], // 7
  ['hf_20261117_221958_68dbb58c-f79b-446b-9e44-debfb8140be1.png', 'step-1-needs',       [400, 640, 800], 72],   // 8
  ['hf_20261117_222003_bb1e9fcc-6b81-4161-8c3a-3c3f0223fcb7.png', 'step-2-analyze',     [400, 640, 800], 72],   // 9
  ['hf_20261117_222007_373c046d-abf3-4b1e-9c05-f6c838acf464.png', 'step-3-compare',     [400, 640, 800], 72],   // 10
  ['hf_20261117_222011_b9f4c48d-5ca2-4aec-8234-912e315fef23.png', 'step-4-together',    [400, 640, 800], 72],   // 11
  // 12 (pledge, lanai) — not supplied yet
  ['hf_20261117_221651_2c89b35c-8efb-4a6b-8fe9-c7649c9c91b8.png', 'cta-beach',          [960, 1600, 2400], 62], // 13
];

let before = 0, after = 0;
const only = process.argv[2]; // optional: node scripts/optimize-images.mjs premium-chart
for (const [file, name, widths, quality, crop] of MAP) {
  if (only && name !== only) continue;
  const src = path.join(SRC, file);
  before += fs.statSync(src).size;
  for (const w of widths) {
    const out = path.join(OUT, `${name}-${w}.webp`);
    const img = crop ? sharp(src).extract(crop) : sharp(src);
    const info = await img.resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true }).toFile(out);
    after += info.size;
    console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}
console.log(`\nSource PNGs: ${(before / 1048576).toFixed(1)} MB -> all WebP variants: ${(after / 1048576).toFixed(2)} MB`);
