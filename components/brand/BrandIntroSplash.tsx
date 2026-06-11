'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { BRAND_LOGO_SRC } from '@/lib/brand'

const SESSION_KEY = 'nbta-brand-intro-seen'
const PLAY_MS = 1750
const EXIT_MS = 450

/** Once per browser session on first storefront visit — short brand intro. */
export default function BrandIntroSplash() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const ran = useRef(false)

  useLayoutEffect(() => {
    if (ran.current) return
    ran.current = true

    if (pathname === '/thank-you' || pathname.startsWith('/thank-you/')) {
      return
    }

    try {
      if (window.sessionStorage.getItem('nbta-skip-intro') === '1') {
        window.sessionStorage.removeItem('nbta-skip-intro')
        return
      }
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
        document.documentElement.classList.remove('nbta-splash-active')
        document.body.classList.remove('nbta-intro-lock')
        return
      }
    } catch {
      /* ignore */
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.documentElement.classList.remove('nbta-splash-active')
      document.body.classList.remove('nbta-intro-lock')
      return
    }

    setShow(true)
    document.documentElement.classList.add('nbta-splash-active')
    document.body.classList.add('nbta-intro-lock')

    const exitTimer = window.setTimeout(() => setExiting(true), PLAY_MS)
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* ignore */
      }
      setShow(false)
      document.documentElement.classList.remove('nbta-splash-active')
      document.body.classList.remove('nbta-intro-lock')
    }, PLAY_MS + EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.documentElement.classList.remove('nbta-splash-active')
      document.body.classList.remove('nbta-intro-lock')
    }
  }, [pathname])

  if (!show) return null

  return (
    <div
      id="nbta-brand-intro"
      className={`nbta-brand-splash${exiting ? ' nbta-brand-splash--exit' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Nabta Labo brand intro"
    >
      <div className="nbta-brand-splash__glow nbta-brand-splash__glow--teal" />
      <div className="nbta-brand-splash__glow nbta-brand-splash__glow--rose" />

      <div className="nbta-brand-splash__inner">
        <div className="nbta-brand-splash__logo-wrap">
          <Image
            src={BRAND_LOGO_SRC}
            alt=""
            width={120}
            height={120}
            priority
            unoptimized
            className="nbta-brand-splash__logo"
          />
          <span className="nbta-brand-splash__ring" />
        </div>

        <h1 className="nbta-brand-splash__title" lang="ar">
          <span className="nbta-brand-splash__word nbta-brand-splash__word--first">نبتة</span>
          <span className="nbta-brand-splash__sep" aria-hidden />
          <span className="nbta-brand-splash__word nbta-brand-splash__word--accent">لابو</span>
        </h1>

        <p className="nbta-brand-splash__en" lang="en">
          Nabta Labo
        </p>
        <p className="nbta-brand-splash__tag" lang="ar">
          مكمّل غذائي · علكة يومية · السعودية
        </p>

        <div className="nbta-brand-splash__bar" aria-hidden>
          <span className="nbta-brand-splash__bar-fill" />
        </div>
      </div>
    </div>
  )
}
