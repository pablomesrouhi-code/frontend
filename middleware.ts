import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Production: avoid stale HTML/RSC shell (old checkout copy). Skip in `next dev` so HMR / _next internals stay smooth.
 */
export function middleware(_request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }
  const res = NextResponse.next()
  res.headers.set(
    'Cache-Control',
    'private, no-store, no-cache, must-revalidate, max-age=0'
  )
  return res
}

/** Never run on Next internals (static, HMR, etc.) */
export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
}
