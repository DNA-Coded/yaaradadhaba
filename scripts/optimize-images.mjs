// Generates web-ready images in public/img from the originals in assets-src/.
// Run with: npm run images
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'img');

const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
const kb = (file) => `${Math.round(fs.statSync(file).size / 1024)}KB`;

async function dishes() {
  const dir = path.join(SRC, 'dishes');
  const out = path.join(OUT, 'dishes');
  ensure(out);
  for (const file of fs.readdirSync(dir)) {
    const name = path.parse(file).name.replace(/_/g, '-');
    for (const width of [480, 900]) {
      const dest = path.join(out, `${name}-${width}.webp`);
      await sharp(path.join(dir, file)).resize(width, width, { fit: 'cover' }).webp({ quality: 74 }).toFile(dest);
      console.log('dish   ', path.basename(dest), kb(dest));
    }
  }
}

async function gallery() {
  const dir = path.join(SRC, 'gallery');
  const out = path.join(OUT, 'gallery');
  ensure(out);
  for (const file of fs.readdirSync(dir)) {
    const name = path.parse(file).name;
    for (const width of [640, 1400]) {
      const dest = path.join(out, `${name}-${width}.webp`);
      await sharp(path.join(dir, file))
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width > 1000 ? 78 : 70 })
        .toFile(dest);
      console.log('gallery', path.basename(dest), kb(dest));
    }
  }
}

// The original logo is a flat RGB image on white. Convert white to alpha
// ("colour to alpha") so the logo sits cleanly on any background.
async function logo() {
  const src = path.join(SRC, 'brand', 'logo.png');
  const { data, info } = await sharp(src).trim({ threshold: 12 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a <= 0.02) {
      data[i + 3] = 0;
      continue;
    }
    data[i] = Math.round((r - 255 * (1 - a)) / a);
    data[i + 1] = Math.round((g - 255 * (1 - a)) / a);
    data[i + 2] = Math.round((b - 255 * (1 - a)) / a);
    data[i + 3] = Math.round(a * 255);
  }
  const transparent = sharp(data, { raw: info });
  const base = await transparent.png().toBuffer();
  ensure(OUT);

  const logoPng = path.join(OUT, 'logo.png');
  await sharp(base).resize({ width: 360 }).png({ compressionLevel: 9, palette: true }).toFile(logoPng);
  const logoWebp = path.join(OUT, 'logo.webp');
  await sharp(base).resize({ width: 360 }).webp({ quality: 90 }).toFile(logoWebp);
  console.log('brand  ', 'logo.png', kb(logoPng), 'logo.webp', kb(logoWebp));

  // Icons: logo on a white rounded tile so the script reads at small sizes.
  const icon = async (size, file, pad = 0.1) => {
    const inner = Math.round(size * (1 - pad * 2));
    const mark = await sharp(base).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    const dest = path.join(OUT, file);
    await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
      .composite([{ input: mark, gravity: 'center' }])
      .png()
      .toFile(dest);
    console.log('icon   ', file, kb(dest));
  };
  await icon(32, 'favicon-32.png', 0.02);
  await icon(180, 'apple-touch-icon.png');
  await icon(192, 'icon-192.png');
  await icon(512, 'icon-512.png');
  return base;
}

// 1200x630 social share card: biryani photo, dark wash, logo badge.
async function ogImage(logoBuffer) {
  const photo = await sharp(path.join(SRC, 'dishes', 'chicken_biryani.jpg'))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .toBuffer();
  const wash = Buffer.from(
    `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#2B170C" stop-opacity=".92"/><stop offset=".55" stop-color="#2B170C" stop-opacity=".55"/><stop offset="1" stop-color="#2B170C" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`
  );
  const badgeSize = 300;
  const mark = await sharp(logoBuffer).resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const badge = await sharp({ create: { width: badgeSize, height: badgeSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: Buffer.from(`<svg width="${badgeSize}" height="${badgeSize}"><circle cx="150" cy="150" r="148" fill="#fff"/></svg>`) },
      { input: mark, gravity: 'center' },
    ])
    .png()
    .toBuffer();
  const dest = path.join(OUT, 'og-image.jpg');
  await sharp(photo).composite([{ input: wash }, { input: badge, left: 90, top: 165 }]).jpeg({ quality: 80, mozjpeg: true }).toFile(dest);
  console.log('og     ', 'og-image.jpg', kb(dest));
}

await dishes();
await gallery();
const logoBuffer = await logo();
await ogImage(logoBuffer);
