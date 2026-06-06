'use client'

import { useEffect, useRef } from 'react'
import { trackSearch } from '@/lib/tracking/client'

/** Fires TikTok Search once when the catalog page is viewed (no site search UI yet). */
export default function ProductsCatalogTracking() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackSearch({ search_string: 'منتجات نبتة لابو' })
  }, [])

  return null
}
