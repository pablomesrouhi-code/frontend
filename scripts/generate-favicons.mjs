/**
 * Full Nabta Labo brand on white, clipped to a circle (WhatsApp-style app icon).
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import toIco from 'to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const appDir = path.join(root, 'app')

const LOGO_FILE = process.env.BRAND_LOGO_FILE?.trim() || 'nabta-lab-brand.png'
const WHITE = '#ffffff'

function contentBounds(data, width, height) {
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3]
      if (a > 12) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX < minX) return { left: 0, top: 0, width, height }
  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  }
}

/** Full brand logo cutout (transparent bg), no cropping. */
async function loadFullBrandLogo() {
  const logoPath = path.join(publicDir, LOGO_FILE.replace(/^\//, ''))

  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r < 64 && g < 64 && b < 64) data[i + 3] = 0
  }

  const box = contentBounds(data, info.width, info.height)

  return sharp(data, { raw: info })
    .extract(box)
    .png()
    .toBuffer()
}

/** Circle mask — transparent outside (tabs / Google show round like WhatsApp). */
function circleMaskSvg(size) {
  const r = size / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
    </svg>`,
  )
}

async function applyCircleMask(squarePng, size) {
  return sharp(squarePng)
    .resize(size, size)
    .ensureAlpha()
    .composite([{ input: circleMaskSvg(size), blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** Full brand on white square, then clip to circle. */
async function brandOnRoundIcon(size) {
  const pad = Math.max(3, Math.round(size * 0.06))
  const inner = size - pad * 2
  const brand = await loadFullBrandLogo()

  const logoOnWhite = await sharp(brand)
    .resize(512, 512, {
      fit: 'contain',
      background: WHITE,
      kernel: sharp.kernel.lanczos3,
    })
    .flatten({ background: WHITE })
    .resize(inner, inner, {
      fit: 'contain',
      background: WHITE,
      kernel: sharp.kernel.lanczos3,
    })
    .flatten({ background: WHITE })
    .png()
    .toBuffer()

  const square = await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: WHITE,
    },
  })
    .composite([{ input: logoOnWhite, gravity: 'centre' }])
    .flatten({ background: WHITE })
    .png()
    .toBuffer()

  return applyCircleMask(square, size)
}

async function main() {
  const icon16 = await brandOnRoundIcon(16)
  const icon32 = await brandOnRoundIcon(32)
  const icon48 = await brandOnRoundIcon(48)
  const icon180 = await brandOnRoundIcon(180)
  const icon512 = await brandOnRoundIcon(512)

  const files = [
    ['nabta-lab-icon-16.png', icon16],
    ['nabta-lab-icon-32.png', icon32],
    ['nabta-lab-icon-48.png', icon48],
    ['nabta-lab-icon-180.png', icon180],
    ['nabta-lab-icon-512.png', icon512],
    ['apple-touch-icon.png', icon180],
    ['favicon-32.png', icon32],
    ['favicon-48.png', icon48],
  ]

  for (const [name, buf] of files) {
    await writeFile(path.join(publicDir, name), buf)
  }

  const ico = await toIco([icon16, icon32, icon48])
  await writeFile(path.join(publicDir, 'nabta-lab-icon.ico'), ico)
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)
  await writeFile(path.join(appDir, 'favicon.ico'), ico)

  console.log('Wrote round Nabta Labo brand icons (circle clip, white fill)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
