// Usage: node screenshot.mjs <url> [label] [--width=1440] [--height=900] [--viewport]
//   Full-page screenshot by default; --viewport captures only the first screen.
//   Saved to ./temporary screenshots/screenshot-N[-label].png (auto-incremented, never overwritten).
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'temporary screenshots');
const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter(a => a.startsWith('--')).map(a => {
  const [k, v] = a.slice(2).split('='); return [k, v ?? true];
}));
const [url, label] = args.filter(a => !a.startsWith('--'));
if (!url) { console.error('Usage: node screenshot.mjs <url> [label] [--width=1440] [--height=900] [--viewport]'); process.exit(1); }
if (url.startsWith('file:')) { console.error('Refusing file:// URL. Serve via `node serve.mjs` and use http://localhost:3000'); process.exit(1); }

fs.mkdirSync(OUT, { recursive: true });
const used = fs.readdirSync(OUT).map(f => /^screenshot-(\d+)/.exec(f)?.[1]).filter(Boolean).map(Number);
const n = (used.length ? Math.max(...used) : 0) + 1;
const file = path.join(OUT, `screenshot-${n}${label ? '-' + label.replace(/[^\w-]+/g, '_') : ''}.png`);

// Windows Application Control blocks Puppeteer's downloaded Chrome-for-Testing on this machine,
// so prefer an installed (signed) Chrome/Edge. Override with PUPPETEER_EXECUTABLE_PATH.
const CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const executablePath = CANDIDATES.find(p => fs.existsSync(p));

const browser = await puppeteer.launch({ headless: true, ...(executablePath && { executablePath }) });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(flags.width || 1440), height: Number(flags.height || 900), deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise(r => setTimeout(r, 600)); // let entrance animations settle
  await page.screenshot({ path: file, fullPage: !flags.viewport });
  console.log(file);
} finally { await browser.close(); }
