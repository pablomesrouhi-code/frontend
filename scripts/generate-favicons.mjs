/**
 * Builds favicon + apple-touch assets from nabta-lab-brand.png on a light tile.
 * Strips near-black background so tabs / Google never show a black square.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const appDir = path.join(root, 'app')

const LOGO_FILE = process.env.BRAND_LOGO_FILE?.trim() || 'nabta-lab-brand.png'
const TILE = { r: 255, g: 255, b: 255 }
const TILE_EDGE = { r: 241, g: 230, b: 228 }

async function logoWithTransparentBg(innerSize) {
  const logoPath = path.join(publicDir, LOGO_FILE.replace(/^\//, ''))
  const { data, info } = await sharp(logoPath)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r < 48 && g < 48 && b < 48) data[i + 3] = 0
  }

  return sharp(data, { raw: info }).png().toBuffer()
}

async function buildTile(size) {
  const pad = Math.round(size * 0.12)
  const inner = size - pad * 2
  const radius = Math.round(size * 0.18)

  const logo = await logoWithTransparentBg(inner)

  const bg = await sharp({
    create: { width: size, height: size, channels: 4, background: { ...TILE, alpha: 1 } },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${size}" height="${size}"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgb(${TILE.r},${TILE.g},${TILE.b})"/><stop offset="100%" stop-color="rgb(${TILE_EDGE.r},${TILE_EDGE.g},${TILE_EDGE.b})"/></linearGradient></defs><rect width="${size}" height="${size}" rx="${radius}" fill="url(#g)"/></svg>`,
        ),
        top: 0,
        left: 0,
      },
      { input: logo, gravity: 'centre' },
    ])
    .png()
    .toBuffer()

  return bg
}

async function main() {
  const icon32 = await buildTile(32)
  const apple180 = await buildTile(180)

  await writeFile(path.join(publicDir, 'favicon-32.png'), icon32)
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple180)

  const ico = await sharp(icon32).resize(32, 32).toFormat('png').toBuffer()
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)
  await writeFile(path.join(appDir, 'favicon.ico'), ico)

  console.log('Wrote public/favicon-32.png, public/apple-touch-icon.png, favicon.ico')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
