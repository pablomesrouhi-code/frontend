import sharp from 'sharp'
import { mkdirSync } from 'fs'

const HOME = 'public/products/home-shahr-hadi.png'
const ASSETS =
  'C:/Users/hp/.cursor/projects/c-Users-hp-cache-codex-runtimes-codex-primary-runtime-dependencies-python/assets'
const OUT = 'public/products'
const CANVAS = 1024
const MARGIN = 28

function floodKnockWhite(data, width, height) {
  const n = width * height
  const seen = new Uint8Array(n)
  const q = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = y * width + x
    if (seen[idx]) return
    const i = idx * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    if (r > 232 && g > 232 && b > 232 && max - min < 22) {
      seen[idx] = 1
      q.push(idx)
    }
  }
  for (let x = 0; x < width; x++) {
    push(x, 0)
  }
  for (let y = 0; y < Math.floor(height * 0.72); y++) {
    push(0, y)
    push(width - 1, y)
  }
  while (q.length) {
    const idx = q.pop()
    const x = idx % width
    const y = (idx - x) / width
    const i = idx * 4
    data[i + 3] = 0
    push(x - 1, y)
    push(x + 1, y)
    push(x, y - 1)
    push(x, y + 1)
  }
  return data
}

function alphaBounds(data, width, height, pad = 6) {
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 14) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }
  minX = Math.max(0, minX - pad)
  minY = Math.max(0, minY - pad)
  maxX = Math.min(width - 1, maxX + pad)
  maxY = Math.min(height - 1, maxY + pad)
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 }
}

async function pouchCutout() {
  // Full standing pouch only — zipper through bottom, no strawberries around it.
  const { data, info } = await sharp(HOME)
    .extract({ left: 172, top: 42, width: 672, height: 820 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  floodKnockWhite(data, info.width, info.height)
  const box = alphaBounds(data, info.width, info.height, 8)

  return sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(box)
    .png()
    .toBuffer()
}

async function withShadow(pouchBuf, targetW) {
  const resized = await sharp(pouchBuf)
    .resize({ width: targetW, kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer()
  const meta = await sharp(resized).metadata()
  const w = meta.width
  const h = meta.height
  const padX = Math.round(w * 0.08)
  const padY = Math.round(h * 0.03)
  const canvasW = w + padX * 2
  const canvasH = h + padY + Math.round(h * 0.06)
  const ellipseSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
      <ellipse cx="${canvasW / 2}" cy="${padY + h - 6}" rx="${Math.round(w * 0.36)}" ry="${Math.round(h * 0.035)}" fill="rgba(40,28,22,0.26)"/>
    </svg>`,
  )
  const shadow = await sharp(ellipseSvg).blur(10).png().toBuffer()

  return sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadow, left: 0, top: 0 },
      { input: resized, left: padX, top: padY },
    ])
    .png()
    .toBuffer()
}

async function placeOnTable(scenePath, outPath, pouchBuf, { width, left, bottom }) {
  let stamped = await withShadow(pouchBuf, width)
  let sm = await sharp(stamped).metadata()
  const maxW = CANVAS - MARGIN * 2
  const maxH = CANVAS - MARGIN * 2
  if (sm.width > maxW || sm.height > maxH) {
    const scale = Math.min(maxW / sm.width, maxH / sm.height)
    stamped = await withShadow(pouchBuf, Math.floor(width * scale))
    sm = await sharp(stamped).metadata()
  }
  const x = Math.min(Math.max(MARGIN, left), CANVAS - sm.width - MARGIN)
  const y = Math.min(Math.max(MARGIN, bottom - sm.height), CANVAS - sm.height - MARGIN)
  await sharp(scenePath)
    .resize(CANVAS, CANVAS)
    .composite([{ input: stamped, left: x, top: y }])
    .png({ compressionLevel: 8 })
    .toFile(outPath)
  console.log(outPath, { w: sm.width, h: sm.height, x, y })
}

async function squareContain(src, outPath, background) {
  await sharp(src)
    .resize(CANVAS, CANVAS, { fit: 'contain', background, withoutEnlargement: false })
    .png({ compressionLevel: 8 })
    .toFile(outPath)
  console.log(outPath, 'contain')
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const pouch = await pouchCutout()
  await sharp(pouch).png().toFile(`${ASSETS}/shahr-hadi-pouch-cutout.png`)
  const pm = await sharp(pouch).metadata()
  console.log('pouch', pm.width, pm.height)

  await placeOnTable(
    `${ASSETS}/shahr-hadi-real-01-split.png`,
    `${OUT}/shahr-hadi-hero-v6.png`,
    pouch,
    { width: 236, left: 394, bottom: 948 },
  )

  await placeOnTable(
    `${ASSETS}/shahr-hadi-real-03-drink.png`,
    `${OUT}/shahr-hadi-drink-v6.png`,
    pouch,
    { width: 236, left: 628, bottom: 948 },
  )

  await placeOnTable(
    `${ASSETS}/shahr-hadi-real-04-relax.png`,
    `${OUT}/shahr-hadi-relaxed-v6.png`,
    pouch,
    { width: 236, left: 96, bottom: 948 },
  )

  await sharp(`${ASSETS}/lead-02-problem-pain.png`)
    .extract({ left: 0, top: 120, width: 1024, height: 1024 })
    .png({ compressionLevel: 8 })
    .toFile(`${OUT}/shahr-hadi-pain-v6.png`)
  console.log(`${OUT}/shahr-hadi-pain-v6.png`, 'square-full-figure')

  console.log('done — homepage file untouched')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
