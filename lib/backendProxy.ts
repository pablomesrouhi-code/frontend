import { NextRequest, NextResponse } from 'next/server'

/** Match rewrite enablement in `next.config.ts` (dev or explicit local-proxy flag). */
export function allowLocalFastapiProxy(): boolean {
  if (process.env.NODE_ENV === 'development') return true
  const v = process.env.NEXT_PUBLIC_USE_LOCAL_API?.trim()?.toLowerCase()
  return v === 'true' || v === '1'
}

export function backendInternalBase(): string {
  const raw =
    process.env.BACKEND_INTERNAL_URL?.trim() || 'http://127.0.0.1:8000'
  return raw.replace(/\/+$/, '')
}

const HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
])

/**
 * Server-side relay to uvicorn/FastAPI. Keeps `/api/admin` fetch same-origin during `next dev`.
 */
export async function relayToFastapi(
  request: NextRequest,
  fastapiPrefix: '/api/admin' | '/api/analytics',
  pathSegments: string[] | undefined,
): Promise<NextResponse> {
  if (!allowLocalFastapiProxy()) {
    return NextResponse.json({ detail: 'Not found' }, { status: 404 })
  }

  const origin = backendInternalBase()
  const tail =
    pathSegments && pathSegments.length > 0
      ? `/${pathSegments.map(encodeURIComponent).join('/')}`
      : ''
  const src = new URL(request.url)
  const destUrl = `${origin}${fastapiPrefix}${tail}${src.search}`

  const outHeaders = new Headers()
  const ct = request.headers.get('content-type')
  if (ct) outHeaders.set('content-type', ct)
  const accept = request.headers.get('accept')
  if (accept) outHeaders.set('accept', accept)
  const cookie = request.headers.get('cookie')
  if (cookie) outHeaders.set('cookie', cookie)
  const secret = request.headers.get('x-analytics-secret')
  if (secret) outHeaders.set('x-analytics-secret', secret)
  const ua = request.headers.get('user-agent')
  if (ua) outHeaders.set('user-agent', ua)

  const xf = request.headers.get('x-forwarded-for')
  const xr = request.headers.get('x-real-ip')
  const fallback = xf?.split(',')[0]?.trim() || xr?.trim() || '127.0.0.1'
  outHeaders.set('x-forwarded-for', xf?.trim() || fallback)
  outHeaders.set('x-forwarded-proto', src.protocol.replace(':', ''))
  outHeaders.set('x-forwarded-host', src.host)

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.arrayBuffer()

  let upstream: Response
  try {
    upstream = await fetch(destUrl, {
      method: request.method,
      headers: outHeaders,
      body,
      redirect: 'manual',
      cache: 'no-store',
    })
  } catch {
    return NextResponse.json(
      {
        detail:
          `Cannot reach FastAPI at ${origin}. Run uvicorn and check BACKEND_INTERNAL_URL.`,
      },
      { status: 502 },
    )
  }

  const resHeaders = new NextResponse(upstream.body, { status: upstream.status })

  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (HOP_HEADERS.has(k)) return
    if (k === 'set-cookie') return // handled via getSetCookie
    resHeaders.headers.append(key, value)
  })

  const anyHeaders = upstream.headers as unknown as { getSetCookie?: () => string[] }
  if (typeof anyHeaders.getSetCookie === 'function') {
    for (const c of anyHeaders.getSetCookie()) {
      resHeaders.headers.append('set-cookie', c)
    }
  } else {
    const sc = upstream.headers.get('set-cookie')
    if (sc) resHeaders.headers.append('set-cookie', sc)
  }

  return resHeaders
}
