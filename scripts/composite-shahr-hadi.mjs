import sharp from 'sharp'
import { copyFileSync, mkdirSync } from 'fs'

const ASSETS =
  'C:/Users/hp/.cursor/projects/c-Users-hp-cache-codex-runtimes-codex-primary-runtime-dependencies-python/assets'
const OUT = 'public/products'

async function main() {
  mkdirSync(OUT, { recursive: true })

  copyFileSync(`${ASSETS}/shahr-hadi-05-hero-packshot.png`, `${OUT}/shahr-hadi-hero-v7.png`)
  await sharp(`${ASSETS}/period-pain-03-bedroom-sit.png`)
    .extract({ left: 0, top: 40, width: 1024, height: 1024 })
    .png({ compressionLevel: 8 })
    .toFile(`${OUT}/shahr-hadi-pain-v7.png`)
  copyFileSync(`${ASSETS}/shahr-hadi-03-woman-drinking.png`, `${OUT}/shahr-hadi-drink-v7.png`)
  copyFileSync(`${ASSETS}/shahr-hadi-04-relaxed-with-product.png`, `${OUT}/shahr-hadi-relaxed-v7.png`)
  console.log('v7 photos ready — no pouch overlays')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
