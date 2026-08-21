'use client'

import type { CSSProperties, ReactNode } from 'react'
import { scrollToPdpForm } from '@/lib/pdp-scroll'

export default function ScrollToPdpFormLink({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <a
      href="#pdp-buy-anchor"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault()
        scrollToPdpForm()
      }}
    >
      {children}
    </a>
  )
}
