/**
 * Favicon + apple-touch: Nabta Labo logo on solid white (#fff), fully opaque.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const appDir = path.join(root, 'app')

const LOGO_FILE = process.env.BRAND_LOGO_FILE?.trim() || 'nabta-lab-brand.png'
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

/** Turn logo PNG black backdrop into transparency, then flatten onto white. */
async function logoOnWhite(size) {
  const pad = size <= 48 ? 2 : Math.round(size * 0.06)
  const inner = size - pad * 2
  const logoPath = path.join(publicDir, LOGO_FILE.replace(/^\//, ''))

  const { data, info } = await sharp(logoPath)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r < 64 && g < 64 && b < 64) data[i + 3] = 0
  }

  const cutout = await sharp(data, { raw: info }).png().toBuffer()

  return sharp({
    create: { width: size, height: size, channels: 3, background: WHITE },
  })
    .composite([{ input: cutout, gravity: 'centre' }])
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer()
}

async function main() {
  const icon32 = await logoOnWhite(32)
  const icon48 = await logoOnWhite(48)
  const apple180 = await logoOnWhite(180)

  await writeFile(path.join(publicDir, 'favicon-32.png'), icon32)
  await writeFile(path.join(publicDir, 'favicon-48.png'), icon48)
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple180)

  const ico = await sharp(icon48).resize(48, 48).png().toBuffer()
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)
  await writeFile(path.join(appDir, 'favicon.ico'), ico)

  console.log('Wrote favicons: white bg, opaque PNG + favicon.ico')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
