'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'
import { BRAND_LOGO_SRC } from '@/lib/brand'

const BANNER_GRADIENT =
  'linear-gradient(90deg, #146b70 0%, #115d62 42%, rgba(148,60,80,0.98) 100%)'

const NAV_LINKS = [
  { href: '/', label: 'البداية' },
  { href: '/products', label: 'منتجاتنا' },
  { href: '/about', label: 'عن نبتة لابو' },
  { href: '/contact', label: 'تواصل معنا' },
] as const

const BANNER_MESSAGES = [
  { icon: '🔬', text: 'تركيبات مدروسة — شفافية تليق بثقتكِ' },
  { icon: '🚚', text: 'دفع عند الاستلام · شحن سريع للمملكة' },
  { icon: '✅', text: 'مرخّص SFDA' },
  { icon: '🌙', text: 'حلال · ضمان 30 يومًا' },
]

export default function Header() {
  const pathname = usePathname()
  const { items, openCart } = useCartStore()
  const count = items.length
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % BANNER_MESSAGES.length)
        setVisible(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const msg = BANNER_MESSAGES[msgIndex]

  return (
    <div className="sticky top-0 z-30">
      <header className="border-b border-border bg-white/90 shadow-sm backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border-[1.5px] border-border px-3 py-2 transition-colors hover:border-primary"
            aria-label="السلة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 ? (
              <span className="min-w-[20px] rounded-full bg-primary px-1.5 py-0.5 text-center text-xs font-bold text-white">
                {count}
              </span>
            ) : (
              <span className="hidden text-xs font-medium text-muted sm:inline">السلة</span>
            )}
          </button>

          {/* Nav — desktop */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-peach-tint hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border p-2.5 text-muted transition-colors hover:border-primary hover:text-charcoal"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label="فتح القائمة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="group -my-0.5 flex shrink-0 items-center py-1"
            aria-label="نبتة لابو — البداية"
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt="نبتة لابو · مكمّل غذائي على شكل علكة — منتجات وروتينات يومية مرخّصة SFDA"
              width={320}
              height={140}
              priority
              sizes="(max-width: 640px) 42vw, 200px"
              className="h-10 w-auto max-w-[min(200px,42vw)] object-contain object-right sm:h-11"
            />
          </Link>
        </div>
      </header>

      {/* Mobile full-screen nav */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden" id="mobile-nav-menu" role="dialog" aria-modal="true" aria-label="قائمة التصفح">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4">
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2.5 text-muted"
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-charcoal">القائمة</span>
            <span className="w-11 shrink-0" aria-hidden />
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="التنقل الرئيسي">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex min-h-[48px] items-center rounded-xl px-3 py-4 text-base font-medium transition-colors ${
                        active ? 'bg-peach-tint text-primary' : 'text-muted'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      ) : null}

      {/* Announcement banner — below header, text + dots only */}
      <div
        className="overflow-hidden px-4 py-2"
        style={{
          background: BANNER_GRADIENT,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div
            className="flex min-w-0 items-center gap-1.5 transition-opacity duration-500 sm:gap-2"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <span className="shrink-0 text-xs">{msg.icon}</span>
            <span className="text-center text-[11px] font-semibold leading-snug tracking-wide text-white drop-shadow-sm sm:text-xs">
              {msg.text}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {BANNER_MESSAGES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === msgIndex ? '14px' : '4px',
                  height: '4px',
                  background: i === msgIndex ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
