'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'

const LOGO_GRADIENT = 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)'

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'المنتجات' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'اتصل بنا' },
] as const

const BANNER_MESSAGES = [
  { icon: '🏥', text: 'نبتة لابو بتجربة تقترب من صيدلية الثقة — مكمّل غذائي على هيئة علكة، مرخّص SFDA؛ لسنا نقطة وصف تشخّص طبيّ' },
  { icon: '🔬', text: 'مكوّنات موسومة وفق تصنيف الغذاء والدواء؛ وعد لا يخرج عن حدود المكمّل الغذائي' },
  { icon: '🚚', text: 'الدفع عند الاستلام · شحن إلى جميع مناطق المملكة' },
  { icon: '🌙', text: 'حلال 100% · ضمان استرجاع 30 يومًا' },
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
      {/* Announcement — في المقدمة فوق الهيدر */}
      <div
        className="py-2.5 px-4 overflow-hidden"
        style={{
          background: LOGO_GRADIENT,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className="flex items-center gap-2 transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <span className="text-xs">{msg.icon}</span>
            <span className="text-xs font-semibold tracking-wide text-white drop-shadow-sm text-center max-w-xl leading-snug">
              {msg.text}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
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

      {/* Main Header — القائمة والشعار أمام المحتوى تحت الواجهة */}
      <header className="bg-white border-b border-[#dfd6d4] shadow-sm relative z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 transition-all px-3 py-2 rounded-full"
            style={{ border: '1.5px solid #dfd6d4' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#b8485c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#dfd6d4'}
            aria-label="السلة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: '#b8485c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 ? (
              <span className="text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center" style={{ background: '#b8485c' }}>
                {count}
              </span>
            ) : (
              <span className="text-xs font-medium hidden sm:inline" style={{ color: '#5c5656' }}>السلة</span>
            )}
          </button>

          {/* Nav — desktop */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-4 py-2 rounded-lg transition-all font-medium"
                style={{ color: '#5c5656' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#b8485c'; (e.currentTarget as HTMLElement).style.background = '#f1e6e4'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#5c5656'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              className="p-2.5 rounded-lg border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ borderColor: '#dfd6d4', color: '#5c5656' }}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label="فتح القائمة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group py-1 -my-0.5"
            aria-label="نبتة لابو — الصفحة الرئيسية"
          >
            <Image
              src="/nabta-lab-brand.png"
              alt="نبتة لابو — سلطة مكمّل غذائي على شكل علكة"
              width={320}
              height={140}
              priority
              sizes="(max-width: 640px) 42vw, 200px"
              className="h-10 sm:h-11 w-auto max-w-[min(200px,42vw)] object-contain object-right"
            />
          </Link>
        </div>
      </header>

      {/* Mobile full-screen nav */}
      {menuOpen ? (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-white" id="mobile-nav-menu" role="dialog" aria-modal="true" aria-label="قائمة التصفح">
          <div className="shrink-0 flex items-center justify-between px-4 h-16 border-b border-[#dfd6d4] bg-white">
            <button
              type="button"
              className="p-2.5 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: '#5c5656' }}
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-sm font-semibold" style={{ color: '#3d3838' }}>القائمة</span>
            <span className="w-11" aria-hidden />
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="التنقل الرئيسي">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center text-base font-medium py-4 px-3 rounded-xl transition-colors min-h-[48px]"
                      style={{
                        color: active ? '#b8485c' : '#5c5656',
                        background: active ? '#f1e6e4' : 'transparent',
                      }}
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
    </div>
  )
}
