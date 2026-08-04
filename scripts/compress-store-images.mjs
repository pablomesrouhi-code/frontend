/**
 * One-shot: shrink heavy storefront PNGs (covers + sellable PDP) for faster LCP/cart.
 * Run: node scripts/compress-store-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')

/** max edge + png effort — covers stay sharp on retina cards */
const JOBS = [
  // Home / cart covers (highest traffic)
  { rel: 'products/home-rawnaq-c.png', max: 720 },
  { rel: 'products/home-shahr-hadi.png', max: 720 },
  { rel: 'products/naseej-powder.png', max: 720 },
  { rel: 'products/vitaflow-powder.png', max: 720 },
  { rel: 'products/shahr-hadi-powder.png', max: 720 },
  { rel: 'products/laylmag-powder.png', max: 720 },
  { rel: 'products/wudouh-product.png', max: 720 },
  { rel: 'products/home-wudouh.png', max: 720 },
  { rel: 'products/home-laylmag.png', max: 720 },
  // Sellable PDP heroes / sections
  { rel: 'products/shahr-hadi-hero.png', max: 1080 },
  { rel: 'products/shahr-hadi-pain.png', max: 1080 },
  { rel: 'products/shahr-hadi-product.png', max: 1080 },
  { rel: 'products/shahr-hadi-after.png', max: 1080 },
  { rel: 'products/naseej-powder-hero.png', max: 1080 },
  { rel: 'products/naseej-powder-pain.png', max: 1080 },
  { rel: 'products/naseej-powder-ingredients.png', max: 1080 },
  { rel: 'products/naseej-powder-lifestyle.png', max: 1080 },
  { rel: 'products/naseej-powder-mix.png', max: 1080 },
  { rel: 'products/vitaflow-powder-hero.png', max: 1080 },
  { rel: 'products/vitaflow-powder-pain.png', max: 1080 },
  { rel: 'products/vitaflow-powder-ingredients.png', max: 1080 },
  { rel: 'products/vitaflow-powder-lifestyle.png', max: 1080 },
  { rel: 'products/vitaflow-powder-mix.png', max: 1080 },
  { rel: 'products/rawnaq-c-hero.jpg', max: 1080, jpeg: true },
  { rel: 'products/rawnaq-c-ingredients.jpg', max: 1080, jpeg: true },
  { rel: 'products/rawnaq-c-pain.jpg', max: 1080, jpeg: true },
  { rel: 'products/rawnaq-c-extra-closeup.jpg', max: 1080, jpeg: true },
  { rel: 'hero-store-trio-v2.jpg', max: 1400, jpeg: true },
]

let saved = 0
for (const job of JOBS) {
  const abs = path.join(root, job.rel)
  if (!fs.existsSync(abs)) {
    console.log('skip missing', job.rel)
    continue
  }
  const before = fs.statSync(abs).size
  const tmp = abs + '.tmp'
  const img = sharp(abs).rotate()
  const meta = await img.metadata()
  const edge = Math.max(meta.width || 0, meta.height || 0)
  let pipeline = img
  if (edge > job.max) {
    pipeline = pipeline.resize({
      width: job.max,
      height: job.max,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  if (job.jpeg) {
    await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(tmp)
  } else {
    await pipeline.png({ compressionLevel: 9, quality: 78, palette: true }).toFile(tmp)
  }
  const after = fs.statSync(tmp).size
  if (after < before * 0.97) {
    fs.renameSync(tmp, abs)
    const kb = (n) => Math.round(n / 1024)
    console.log(`ok ${job.rel}: ${kb(before)}KB → ${kb(after)}KB`)
    saved += before - after
  } else {
    fs.unlinkSync(tmp)
    console.log(`keep ${job.rel}: already small (${Math.round(before / 1024)}KB)`)
  }
}
console.log(`saved ~${Math.round(saved / 1024)}KB total`)
