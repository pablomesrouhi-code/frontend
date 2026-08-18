import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Nabta Labo checkout uses client-side fetch → FastAPI (`/api/orders` on api.nabtalabo.store).
 * We do not use Next.js Server Actions anywhere.
 *
 * Scanners/bots POST pages with `Next-Action: x` (or stale action IDs after deploy) which fills
 * logs with "Failed to find Server Action". Drop those probes before they hit the App Router.
 */
export function middleware(request: NextRequest) {
  if (request.method === 'POST') {
    const pathname = request.nextUrl.pathname
    if (!pathname.startsWith('/api/')) {
      const nextAction =
        request.headers.get('next-action') ?? request.headers.get('Next-Action')
      if (nextAction) {
        return new NextResponse(null, { status: 404 })
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
}
