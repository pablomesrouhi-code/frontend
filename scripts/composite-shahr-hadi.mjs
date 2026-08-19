import sharp from 'sharp'
import { mkdirSync } from 'fs'

const POWDER = 'public/products/shahr-hadi-powder.png'
const ASSETS =
  'C:/Users/hp/.cursor/projects/c-Users-hp-cache-codex-runtimes-codex-primary-runtime-dependencies-python/assets'
const OUT = 'public/products'

function knockWhite(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const isWhite = r > 228 && g > 228 && b > 228 && max - min < 28
    if (isWhite) {
      const t = (r + g + b) / 3
      data[i + 3] = t > 248 ? 0 : Math.max(0, Math.round((252 - t) * 12))
    }
  }
  return data
}

async function pouchCutout() {
  // Center crop of the real pouch only (no strawberries / berries / powder pile).
  const { data, info } = await sharp(POWDER)
    .extract({ left: 248, top: 12, width: 528, height: 868 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  knockWhite(data)

  let minX = info.width
  let minY = info.height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const a = data[(y * info.width + x) * 4 + 3]
      if (a > 12) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }

  const pad = 4
  minX = Math.max(0, minX - pad)
  minY = Math.max(0, minY - pad)
  maxX = Math.min(info.width - 1, maxX + pad)
  maxY = Math.min(info.height - 1, maxY + pad)

  return sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
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
  const padX = Math.round(w * 0.12)
  const padY = Math.round(h * 0.06)
  const canvasW = w + padX * 2
  const canvasH = h + padY + Math.round(h * 0.08)
  const ellipseW = Math.round(w * 0.78)
  const ellipseH = Math.round(h * 0.08)
  const ellipseSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
      <ellipse cx="${canvasW / 2}" cy="${padY + h - 8}" rx="${ellipseW / 2}" ry="${ellipseH / 2}" fill="rgba(40,28,22,0.28)"/>
    </svg>`,
  )
  const shadow = await sharp(ellipseSvg).blur(12).png().toBuffer()

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

async function place(scenePath, outPath, pouchBuf, { width, left, top }) {
  const stamped = await withShadow(pouchBuf, width)
  const sm = await sharp(stamped).metadata()
  const maxLeft = Math.max(0, 1024 - sm.width)
  const maxTop = Math.max(0, 1024 - sm.height)
  const x = Math.min(Math.max(0, left), maxLeft)
  const y = Math.min(Math.max(0, top), maxTop)
  await sharp(scenePath)
    .resize(1024, 1024)
    .composite([{ input: stamped, left: x, top: y }])
    .png({ compressionLevel: 8 })
    .toFile(outPath)
  console.log(outPath, { w: sm.width, h: sm.height, x, y })
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const pouch = await pouchCutout()
  await sharp(pouch).png().toFile(`${ASSETS}/shahr-hadi-pouch-cutout.png`)

  // Clean packshot: original pouch only, no extra fruit.
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      {
        input: await withShadow(pouch, 400),
        left: 270,
        top: 48,
      },
    ])
    .png()
    .toFile(`${OUT}/shahr-hadi-product-v4.png`)

  await place(
    `${ASSETS}/shahr-hadi-scene-01-split-empty.png`,
    `${OUT}/shahr-hadi-hero-v4.png`,
    pouch,
    { width: 340, left: 342, top: 268 },
  )

  await place(
    `${ASSETS}/shahr-hadi-scene-03-drink-empty.png`,
    `${OUT}/shahr-hadi-drink-v4.png`,
    pouch,
    { width: 250, left: 620, top: 390 },
  )

  await place(
    `${ASSETS}/shahr-hadi-scene-04-relax-empty.png`,
    `${OUT}/shahr-hadi-relaxed-v4.png`,
    pouch,
    { width: 270, left: 28, top: 400 },
  )

  await sharp(`${ASSETS}/shahr-hadi-scene-02-face.png`)
    .resize(1024, 1024)
    .png()
    .toFile(`${OUT}/shahr-hadi-pain-v4.png`)

  console.log('done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
