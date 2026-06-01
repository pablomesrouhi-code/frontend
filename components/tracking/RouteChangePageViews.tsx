'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { fireDeferredPageView } from '@/lib/tracking/client'
import { pixelsEnabled } from '@/lib/tracking/pixels-enabled'

/**
 * App Router keeps the root layout mounted; fire pixel page views on client navigations.
 */
export default function RouteChangePageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (!pixelsEnabled()) return
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    fireDeferredPageView()
  }, [pathname, searchParams])

  return null
}
