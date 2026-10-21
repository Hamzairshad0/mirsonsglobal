// Builds web-ready brand assets from the source logo files in /scripts.
// Run with: npm run assets
import sharp from "sharp";
import DottedMapPkg from "dotted-map";
const DottedMap = DottedMapPkg.default ?? DottedMapPkg;
import { writeFileSync, mkdirSync } from "node:fs";

const SRC_GOLD = "scripts/src-logo-gold.jpg";
const SRC_WATERMARK = "scripts/src-watermark.jpg";
const OUT = "public/brand";
mkdirSync(OUT, { recursive: true });

const NAVY = { r: 8, g: 21, b: 38 };

// Gold-on-black -> transparent PNG that keeps the metallic shading.
async function blackToAlpha(input, region, outFile, width) {
  const { data, info } = await sharp(input)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const floor = 22;
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.max(data[i], data[i + 1], data[i + 2]);
    const a = Math.max(0, Math.min(1, (m - floor) / (255 - floor)));
    if (a <= 0) {
      data[i + 3] = 0;
      continue;
    }
    const k = 255 / Math.max(m, 1);
    data[i] = Math.min(255, data[i] * k);
    data[i + 1] = Math.min(255, data[i + 1] * k);
    data[i + 2] = Math.min(255, data[i + 2] * k);
    data[i + 3] = Math.round(a * 255);
  }
  let img = sharp(data, { raw: info });
  if (width) img = img.resize({ width });
  await img.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(outFile);
}

// Light-on-white watermark -> transparent PNG in a single soft champagne tone.
async function whiteToAlpha(input, region, outFile, width) {
  const { data, info } = await sharp(input)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const a = Math.max(0, Math.min(1, (250 - lum) / 45));
    data[i] = 176;
    data[i + 1] = 150;
    data[i + 2] = 104;
    data[i + 3] = Math.round(a * 255);
  }
  await sharp(data, { raw: info }).resize({ width }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(outFile);
}

const MARK = { left: 270, top: 195, width: 715, height: 510 };
const FULL = { left: 140, top: 195, width: 975, height: 850 };
const WORDMARK = { left: 140, top: 715, width: 975, height: 250 };

await blackToAlpha(SRC_GOLD, MARK, `${OUT}/logo-mark.png`, 360);
await blackToAlpha(SRC_GOLD, FULL, `${OUT}/logo-full.png`, 720);
await blackToAlpha(SRC_GOLD, WORDMARK, `${OUT}/logo-wordmark.png`, 600);
await whiteToAlpha(SRC_WATERMARK, { left: 200, top: 310, width: 870, height: 660 }, `${OUT}/watermark.png`, 900);

// Favicons / app icons: mark centred on navy
async function icon(size, file) {
  const mark = await sharp(`${OUT}/logo-mark.png`).resize({ width: Math.round(size * 0.82) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...NAVY, alpha: 1 } } })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ palette: true, quality: 90 })
    .toFile(file);
}
await icon(512, "src/app/icon.png");
await icon(180, "src/app/apple-icon.png");

// Open Graph image (1200x630)
{
  const logo = await sharp(`${OUT}/logo-full.png`).resize({ height: 500 }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: { ...NAVY, alpha: 1 } } })
    .composite([{ input: logo, gravity: "centre" }])
    .png({ palette: true, quality: 90 })
    .toFile("src/app/opengraph-image.png");
}

// Dotted world map with trade routes for the hero
{
  const map = new DottedMap({ height: 70, grid: "diagonal" });
  const svgDots = map.getSVG({ radius: 0.22, color: "#5b7697", shape: "circle", backgroundColor: "transparent" });
  const hubs = {
    karachi: [24.86, 67.0],
    dubai: [25.2, 55.27],
    istanbul: [41.0, 28.97],
    rotterdam: [51.92, 4.48],
    hamburg: [53.55, 9.99],
    london: [51.5, -0.12],
    riyadh: [24.71, 46.67],
    almaty: [43.24, 76.9],
    lagos: [6.52, 3.37],
    nairobi: [-1.29, 36.82],
    shanghai: [31.23, 121.47],
    singapore: [1.35, 103.82],
    houston: [29.76, -95.37],
    saopaulo: [-23.55, -46.63],
  };
  const pts = Object.fromEntries(Object.entries(hubs).map(([k, [lat, lng]]) => [k, map.getPin({ lat, lng })]));
  const routes = [
    ["dubai", "rotterdam"], ["dubai", "shanghai"], ["dubai", "lagos"], ["karachi", "hamburg"],
    ["karachi", "singapore"], ["istanbul", "almaty"], ["london", "houston"], ["dubai", "nairobi"],
    ["rotterdam", "saopaulo"], ["riyadh", "istanbul"], ["karachi", "dubai"],
  ];
  const arc = ([a, b]) => {
    const p = pts[a], q = pts[b];
    const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
    const d = Math.hypot(q.x - p.x, q.y - p.y);
    return `<path d="M${p.x.toFixed(2)},${p.y.toFixed(2)} Q${mx.toFixed(2)},${(my - d * 0.28).toFixed(2)} ${q.x.toFixed(2)},${q.y.toFixed(2)}" />`;
  };
  const dots = Object.values(pts)
    .map((p) => `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="0.9" /><circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="2.2" fill-opacity="0.18" />`)
    .join("");
  const overlay = `<g fill="none" stroke="#c9a45c" stroke-width="0.28" stroke-opacity="0.55" stroke-linecap="round">${routes.map(arc).join("")}</g><g fill="#e3c27d">${dots}</g></svg>`;
  writeFileSync("public/world-map.svg", svgDots.replace(/<\/svg>\s*$/, overlay));
}

console.log("Brand assets written.");
