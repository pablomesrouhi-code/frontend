/**
 * Favicon + apple-touch: Nabta Labo on solid white (#fff).
 * Small sizes: arch + نبتة لابو (top crop). Apple-touch: full mark.
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
const WHITE = { r: 255, g: 255, b: 255 }

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

async function loadLogoRaster(cropTopFraction) {
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
  let extract = { ...box }

  if (cropTopFraction != null && cropTopFraction > 0 && cropTopFraction < 1) {
    extract.height = Math.max(1, Math.round(box.height * cropTopFraction))
  }

  const cutout = await sharp(data, { raw: info })
    .extract(extract)
    .png()
    .toBuffer()

  return sharp(cutout)
}

async function logoOnWhite(size, { cropTopFraction }) {
  const pad = size <= 48 ? 2 : Math.round(size * 0.07)
  const inner = size - pad * 2

  const logoBuf = await loadLogoRaster(cropTopFraction)
    .then((img) =>
      img
        .resize(inner, inner, {
          fit: 'contain',
          background: { ...WHITE, alpha: 1 },
        })
        .flatten({ background: '#ffffff' })
        .png()
        .toBuffer(),
    )

  return sharp({
    create: { width: size, height: size, channels: 3, background: { ...WHITE, alpha: 1 } },
  })
    .composite([{ input: logoBuf, gravity: 'centre' }])
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  const icon16 = await logoOnWhite(16, { cropTopFraction: 0.52 })
  const icon32 = await logoOnWhite(32, { cropTopFraction: 0.52 })
  const icon48 = await logoOnWhite(48, { cropTopFraction: 0.52 })
  const apple180 = await logoOnWhite(180, { cropTopFraction: null })

  await writeFile(path.join(publicDir, 'favicon-32.png'), icon32)
  await writeFile(path.join(publicDir, 'favicon-48.png'), icon48)
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple180)

  const ico = await toIco([icon16, icon32, icon48])
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)
  await writeFile(path.join(appDir, 'favicon.ico'), ico)

  console.log('Wrote favicons (arch+wordmark for tabs, full logo for apple-touch)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
