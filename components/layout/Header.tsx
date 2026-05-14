'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'
import { BRAND_LOGO_SRC } from '@/lib/brand'
import { PRODUCT_PHOTO_QUALITY } from '@/lib/image-defaults'

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
    <div className="sticky top-0 z-30 isolate pt-[max(0px,env(safe-area-inset-top))] [transform:translate3d(0,0,0)]">
      <header className="border-b border-border bg-white/95 shadow-[0_1px_0_rgba(28,28,28,0.05),0_8px_32px_-28px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] supports-[backdrop-filter]:bg-white/[0.93] supports-[backdrop-filter]:backdrop-blur-sm">
        <div className="mx-auto flex min-h-16 max-w-6xl w-full items-center justify-between gap-2 px-4 py-2 sm:px-6 sm:py-2.5">
          <div className="flex shrink-0 items-center gap-2">
            {/* Cart — في RTL يظهر جهة البداية */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex touch-manipulation items-center gap-2 rounded-full border-[1.5px] border-border px-3 py-2 transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:border-primary hover:shadow-[0_4px_14px_-6px_rgba(184,72,92,0.12)] active:scale-[0.98]"
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
          </div>

          {/* Nav — desktop: وسط الشريط */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted transition-[color,background-color] duration-200 ease-out hover:bg-peach-tint/90 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* min-w-0 + shrink: باش اللوجو ما يدفعش زر القائمة برّا الشاشة فالعرض الضيق */}
          <div className="flex min-w-0 shrink items-center justify-end gap-2 md:shrink-0">
            {/* Mobile menu — ديما باين، فوق اللوجو فـ stacking */}
            <div className="relative z-10 flex shrink-0 items-center md:hidden">
              <button
                type="button"
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-border p-2.5 text-muted transition-[color,border-color,background-color] duration-200 ease-out hover:border-primary/80 hover:bg-peach-tint/40 hover:text-charcoal"
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

            {/* Logo + nom — خلفية خفيفة كالهوية الأولى */}
            <Link
              href="/"
              className="group flex min-w-0 max-w-[min(52vw,calc(100vw-9.5rem))] shrink items-center gap-2 overflow-hidden rounded-2xl border border-[#e8e0de]/90 bg-gradient-to-l from-white via-white to-peach-tint/45 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_2px_12px_-6px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.03] transition-[box-shadow,border-color,background-color] duration-200 ease-out hover:border-primary/25 hover:to-peach-tint/70 hover:shadow-[0_4px_18px_-8px_rgba(184,72,92,0.12)] sm:max-w-[min(100%,calc(100vw-10rem))] sm:gap-2.5 sm:rounded-[1.15rem] sm:px-3 sm:py-2 md:max-w-[min(100%,calc(100vw-10rem))] md:shrink-0"
              aria-label="نبتة لابو — البداية"
            >
              <Image
                src={BRAND_LOGO_SRC}
                alt="نبتة لابو · مكمّل غذائي على شكل علكة — منتجات وروتينات يومية مرخّصة SFDA"
                width={320}
                height={140}
                priority
                quality={PRODUCT_PHOTO_QUALITY}
                sizes="(max-width: 640px) 38vw, 180px"
                className="h-9 w-auto max-w-[min(128px,32vw)] shrink-0 object-contain object-right sm:h-10 sm:max-w-[min(160px,36vw)]"
              />
              <span className="hidden h-9 w-px shrink-0 bg-border/75 sm:block" aria-hidden />
              <span className="min-w-0 text-right leading-tight">
                <span className="block truncate text-sm font-extrabold tracking-tight text-charcoal sm:text-base" lang="ar">
                  نبتة لابو
                </span>
                <span
                  className="mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-[11px]"
                  lang="fr"
                  translate="no"
                >
                  Nabta Labo
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile full-screen nav */}
      {menuOpen ? (
        <div
          className="fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-white md:hidden"
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التصفح"
        >
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
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6" aria-label="التنقل الرئيسي">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex min-h-[48px] items-center rounded-xl px-3 py-4 text-base font-medium transition-[color,background-color] duration-200 ease-out ${
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
