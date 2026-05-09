'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { fireDeferredPageView } from '@/lib/tracking/client'

/**
 * App Router keeps the root layout mounted; fire pixel page views on client navigations.
 */
export default function RouteChangePageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipFirst = useRef(true)

  useEffect(() => {
    const enabled =
      process.env.NEXT_PUBLIC_ENABLE_PIXELS === 'true' ||
      process.env.NEXT_PUBLIC_ENABLE_PIXELS === '1'
    if (!enabled) return
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    fireDeferredPageView()
  }, [pathname, searchParams])

  return null
}
