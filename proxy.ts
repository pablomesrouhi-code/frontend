import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Nabta Labo: checkout = client fetch → FastAPI. No Next.js Server Actions.
 *
 * Next.js 16: `middleware.ts` is deprecated — use `proxy.ts` (see build warning).
 * Bots POST pages with `Next-Action: x` → "Failed to find Server Action" log spam.
 */
export function proxy(request: NextRequest) {
  if (request.method === 'POST') {
    const { pathname } = request.nextUrl
    // Only same-origin Route Handlers may receive POST (admin/analytics relay).
    if (!pathname.startsWith('/api/')) {
      return new NextResponse(null, { status: 405 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
