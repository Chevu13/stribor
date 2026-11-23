// Regenerates public/images from the original Instagram files in the project root.
// Crops remove the text baked into the posts. Run: node scripts/prepare-images.mjs
import sharp from 'sharp'
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'

const find = (id) => readdirSync('.').find((f) => f.includes(id))
const src = {
  interior: find('640269341'),
  emblem: find('802456968'),
  poster: find('802899230'),
  table: find('818062731'),
  burger: find('867744767'),
  wings: find('914138373'),
}

mkdirSync('public/images', { recursive: true })
mkdirSync('public/videos', { recursive: true })

const jobs = [
  ['interior', src.interior, null, 1600],
  ['interior-arches', src.interior, { left: 0, top: 210, width: 1440, height: 720 }, 1600],
  ['table-wide', src.table, { left: 0, top: 560, width: 2048, height: 1400 }, 2000],
  ['table-portrait', src.table, { left: 0, top: 0, width: 2048, height: 1960 }, 1400],
  ['beer-hand', src.table, { left: 0, top: 1476, width: 1170, height: 1255 }, 1170],
  ['burger-classic', src.table, { left: 0, top: 787, width: 935, height: 627 }, 935],
  ['burger-stacked', src.table, { left: 1107, top: 935, width: 941, height: 824 }, 941],
  ['burger-close', src.burger, { left: 0, top: 370, width: 2160, height: 2510 }, 1500],
  ['burger-wide', src.burger, { left: 0, top: 480, width: 2160, height: 1420 }, 2160],
  ['fries', src.burger, { left: 1490, top: 720, width: 670, height: 1280 }, 670],
  ['wings', src.wings, { left: 0, top: 450, width: 2160, height: 2430 }, 1400],
  ['musician', src.poster, { left: 662, top: 42, width: 648, height: 1350 }, 648],
  ['event-acoustic-poster', src.poster, null, 1000],
]

for (const [name, file, crop, width] of jobs) {
  let img = sharp(file)
  if (crop) img = img.extract(crop)
  await img.resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/images/${name}.webp`)
}

// Logos: brightness of the original becomes alpha, so the mark sits on any dark background.
async function mask(file, crop, out, width) {
  let base = sharp(file)
  if (crop) base = base.extract(crop)
  const alpha = await base
    .resize({ width, withoutEnlargement: true })
    .greyscale()
    .linear(2.1, -125)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = alpha.info
  const rgba = Buffer.alloc(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = 242
    rgba[i * 4 + 1] = 235
    rgba[i * 4 + 2] = 221
    rgba[i * 4 + 3] = alpha.data[i]
  }
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 90, alphaQuality: 90 }).toFile(out)
}
await mask(src.emblem, null, 'public/images/emblem.webp', 941)
await mask(src.poster, { left: 84, top: 66, width: 206, height: 244 }, 'public/images/logo.webp', 206)
await sharp(src.emblem).resize(180).png().toFile('public/favicon.png')
await sharp(src.interior).extract({ left: 0, top: 210, width: 1440, height: 756 }).resize(1200, 630).jpeg({ quality: 78 }).toFile('public/og.jpg')

copyFileSync(find('.mp4'), 'public/videos/stribor-reel.mp4')
console.log('done')
