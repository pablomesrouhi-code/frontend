import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware kept for future routing (locale, A/B, etc.).
 * Cache headers for HTML were removed: they forced `no-store` on every page and hurt bfcache / repeat visits.
 * Static assets under `/_next/static` remain long-cached by Next.js.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
}
