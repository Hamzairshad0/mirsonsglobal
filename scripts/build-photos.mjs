// Downloads the site photography from Unsplash (free licence, commercial use allowed)
// and writes optimised WebP files to /public/images. Run with: npm run photos
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const RAW = "scripts/photos-raw";
const OUT = "public/images";
mkdirSync(RAW, { recursive: true });
mkdirSync(`${OUT}/industries`, { recursive: true });

// [output name, Unsplash photo id, width, quality, keep top fraction of the photo (optional)]
const PHOTOS = [
  // Cropped to the top 70% so the ship's brand lettering is not visible.
  ["hero-port", "1791101132244-ca3868301acb", 1920, 58, 0.7],
  ["port-cranes-night", "1758976461860-1e9a132f4600", 1600, 50],
  ["containers-aerial", "1494412519320-aa613dfb7738", 1400, 45],
  ["steel-mill", "1474674556023-efef886fa147", 1400, 62],
  ["factory-interior", "1496247749665-49cf5b1022e9", 1600, 60],
  ["warehouse", "1586528116311-ad8dd3c8310d", 1200, 50],
  ["handshake", "1521791136064-7986c2920216", 1400, 62],
  ["business-meeting", "1758518731457-5ef826b75b3b", 1600, 62],
  ["video-call", "1606770347238-77fcfd29906c", 1200, 62],
  ["industries/industrial-minerals", "1654461339694-128902c5c075", 800, 52],
  ["industries/metals-steel", "1721622045835-51a5447f281c", 900, 60],
  ["industries/chemicals-polymers", "1786532852011-443cba5dc9fe", 900, 60],
  ["industries/construction-materials", "1768677903496-becc4be07258", 800, 48],
  ["industries/textiles", "1675176785803-bffbbb0cd2f4", 900, 60],
  ["industries/agri-commodities", "1644377949116-c4a6b529241c", 900, 60],
  ["industries/packaging", "1700165644892-3dd6b67b25bc", 900, 60],
  ["industries/electrical-equipment", "1509391366360-2e959784a276", 900, 60],
];

const credits = ["# Photo credits", "", "All photos from Unsplash (https://unsplash.com/license) — free for commercial use.", ""];

for (const [name, id, width, quality, keepTop] of PHOTOS) {
  const raw = `${RAW}/${id}.jpg`;
  if (!existsSync(raw)) {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=1920&q=85&fm=jpg`);
    if (!res.ok) throw new Error(`Download failed for ${id}: ${res.status}`);
    writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  }
  let img = sharp(raw);
  if (keepTop) {
    const meta = await img.metadata();
    img = sharp(raw).extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * keepTop) });
  }
  const info = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(`${OUT}/${name}.webp`);
  credits.push(`- ${name}.webp — https://images.unsplash.com/photo-${id}`);
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

writeFileSync(`${OUT}/CREDITS.md`, credits.join("\n") + "\n");
