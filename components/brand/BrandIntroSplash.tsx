'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BRAND_LOGO_SRC } from '@/lib/brand'

const PLAY_MS = 850
const EXIT_MS = 280
const INTRO_SEEN_KEY = 'nbta-intro-seen'

function clearIntroLock() {
  document.documentElement.classList.remove('nbta-splash-active')
  document.body.classList.remove('nbta-intro-lock')
}

/** Short intro once per browser tab session — skipped on repeat visits and reduced motion. */
export default function BrandIntroSplash() {
  const [show, setShow] = useState(true)
  const [exiting, setExiting] = useState(false)
  const ran = useRef(false)

  useLayoutEffect(() => {
    if (ran.current) return
    ran.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alreadySeen = false
    try {
      alreadySeen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
    } catch {
      /* private mode */
    }

    if (reduced || alreadySeen) {
      setShow(false)
      clearIntroLock()
      return
    }

    document.documentElement.classList.add('nbta-splash-active')
    document.body.classList.add('nbta-intro-lock')

    const exitTimer = window.setTimeout(() => setExiting(true), PLAY_MS)
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_SEEN_KEY, '1')
      } catch {
        /* ignore */
      }
      setShow(false)
      clearIntroLock()
    }, PLAY_MS + EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      clearIntroLock()
    }
  }, [])

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
            sizes="120px"
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
