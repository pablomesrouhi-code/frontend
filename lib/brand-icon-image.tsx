import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

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

/** Favicon / Apple icon: logo on light rounded tile — avoids black fill in Google & tabs. */
export async function createBrandIconResponse(size: number): Promise<ImageResponse> {
  const logoSrc = await loadLogoDataUrl()
  const pad = Math.round(size * 0.12)
  const logoSize = size - pad * 2

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #ffffff 0%, #f1e6e4 100%)',
          borderRadius: Math.round(size * 0.18),
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={logoSize}
          height={logoSize}
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </div>
    ),
    { width: size, height: size },
  )
}
