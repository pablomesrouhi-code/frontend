'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getPublicApiBase } from '@/lib/api'

/**
 * Sends page_view events to FastAPI `/api/analytics/collect` (classified server-side: SA + non-VPN).
 * Enable with NEXT_PUBLIC_ANALYTICS_ENABLED=true; optional shared secret NEXT_PUBLIC_ANALYTICS_SECRET.
 */
export default function AnalyticsBeacon() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const enabled =
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' ||
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === '1'
  const secret = process.env.NEXT_PUBLIC_ANALYTICS_SECRET?.trim()
  const lastKey = useRef<string | null>(null)

  useEffect(() => {
    if (!enabled || pathname == null) return
    const q = searchParams?.toString()
    const path = pathname + (q ? `?${q}` : '')
    if (lastKey.current === path) return
    lastKey.current = path

    const base = getPublicApiBase()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (secret) headers['X-Analytics-Secret'] = secret
    const ref = typeof document !== 'undefined' ? document.referrer || null : null

    fetch(`${base}/api/analytics/collect`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event: 'page_view',
        path,
        referrer: ref,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [enabled, pathname, searchParams, secret])

  return null
}
