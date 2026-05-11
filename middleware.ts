import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Stop long-lived browser/CDN caching of HTML/RSC so users don’t keep an old checkout bundle
 * (stale Arabic copy, wrong API base). Static files under `/_next/static` stay cacheable.
 */
export function middleware(_request: NextRequest) {
  const res = NextResponse.next()
  res.headers.set(
    'Cache-Control',
    'private, no-store, no-cache, must-revalidate, max-age=0'
  )
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
