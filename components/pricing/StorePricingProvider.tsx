'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  DEFAULT_PRICING,
  loadStorePricing,
  type StorePricing,
} from '@/lib/store-pricing'

const StorePricingContext = createContext<StorePricing>(DEFAULT_PRICING)

export function useStorePricing(): StorePricing {
  return useContext(StorePricingContext)
}

export function StorePricingProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<StorePricing>(DEFAULT_PRICING)

  useEffect(() => {
    // sessionStorage hit skips network on repeat navigations in the same tab
    void loadStorePricing().then(setPricing)
  }, [])

  return (
    <StorePricingContext.Provider value={pricing}>{children}</StorePricingContext.Provider>
  )
}
