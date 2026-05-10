'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/stores/cart-store'

const LOGO_GRADIENT = 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)'

const BANNER_MESSAGES = [
  { icon: '🚚', text: 'الدفع عند الاستلام · شحن سريع لجميع مناطق المملكة' },
  { icon: '✅', text: 'علكات مرخّصة من هيئة الغذاء والدواء (SFDA)' },
  { icon: '🌙', text: 'حلال 100% · ضمان 30 يوم (استرجاع كامل)' },
]

export default function Header() {
  const { items, openCart } = useCartStore()
  const count = items.length
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)

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
      {/* Main Header */}
      <header className="bg-white border-b border-[#dfd6d4] shadow-sm">
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

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: '/', label: 'الرئيسية' },
              { href: '/products', label: 'المنتجات' },
              { href: '/about', label: 'من نحن' },
              { href: '/contact', label: 'اتصل بنا' },
            ].map((link) => (
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

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group py-1 -my-0.5"
            aria-label="نبتة لابو — الصفحة الرئيسية"
          >
            <Image
              src="/nabta-lab-brand.png"
              alt="نبتة لابو — من الطبيعة لراحتك وجمالك"
              width={320}
              height={140}
              priority
              sizes="(max-width: 640px) 42vw, 200px"
              className="h-10 sm:h-11 w-auto max-w-[min(200px,42vw)] object-contain object-right"
            />
          </Link>
        </div>
      </header>

      {/* Announcement Banner — خلفية موحّدة بنفس تدرّج اللوغو */}
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
            <span className="text-xs font-semibold tracking-wide text-white drop-shadow-sm">{msg.text}</span>
          </div>
          <div className="flex items-center gap-1">
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
