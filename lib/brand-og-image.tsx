import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

async function loadLogoDataUrl(): Promise<string> {
  const raw = process.env.NEXT_PUBLIC_BRAND_LOGO?.trim()
  if (raw?.startsWith('http://') || raw?.startsWith('https://')) {
    const res = await fetch(raw)
    const buf = Buffer.from(await res.arrayBuffer())
    return `data:image/png;base64,${buf.toString('base64')}`
  }
  const file = raw && raw.length > 0 ? raw.replace(/^\//, '') : 'nabta-lab-brand.png'
  const logoFile = await readFile(path.join(process.cwd(), 'public', file))
  return `data:image/png;base64,${logoFile.toString('base64')}`
}

/** Link-preview image: light background + logo so crawlers never fill with black behind transparency. */
export async function createBrandOgImageResponse(): Promise<ImageResponse> {
  const logoSrc = await loadLogoDataUrl()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f1e6e4 0%, #ffffff 52%, #faf9f8 100%)',
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={520}
          height={560}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>
    ),
    { width: OG_WIDTH, height: OG_HEIGHT },
  )
}
