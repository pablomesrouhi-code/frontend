import Image from 'next/image'
import Link from 'next/link'
import { BRAND_LOGO_SRC } from '@/lib/brand'

const FOOTER_LINKS = [
  { href: '/', label: 'البداية' },
  { href: '/products', label: 'منتجاتنا' },
  { href: '/about', label: 'عن نبتة لابو' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/privacy-policy', label: 'خصوصية' },
  { href: '/terms', label: 'شروط' },
  { href: '/shipping-policy', label: 'شحن' },
  { href: '/returns-refunds', label: 'إرجاع' },
  { href: '/cod-policy', label: 'الدفع عند الاستلام' },
] as const

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/75">
      <div
        style={{
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, rgba(20,107,112,0.55), rgba(184,72,92,0.45), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 text-center md:text-right">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-md mx-auto md:mx-0">
            <Link href="/" className="inline-block mb-4 mx-auto md:mx-0" aria-label="نبتة لابو — البداية">
              <Image
                src={BRAND_LOGO_SRC}
                alt="نبتة لابو · مكمّل غذائي على شكل علكة — منتجات وروتينات يومية مرخّصة SFDA"
                width={320}
                height={140}
                className="h-14 sm:h-16 w-auto max-w-[240px] object-contain mx-auto md:mx-0"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/80 mb-4">
              نبتة لابو — علكة بوظيفة مكمّل غذائي، بتجربة تقترب من ثقة نقطة اعتماد (صيدلية من حيث الصياغة والترخيص، لا من حيث تشخيص أو وصف دواء): تراخيص SFDA، أسئلة وفق تصنيف المكمّل، ودفع عند الاستلام.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 flex-wrap">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/90"
              >
                <span aria-hidden>🛡️</span>
                <span>الدفع عند الاستلام فقط</span>
              </div>
              <a
                href="mailto:contact@nabtalabo.store"
                className="break-all text-sm font-medium text-white transition-colors hover:text-peach"
              >
                contact@nabtalabo.store
              </a>
            </div>
          </div>

          {/* كل الروابط في سطر/موحّد — نص أبيض */}
          <nav
            className="flex flex-wrap items-center justify-center md:justify-end gap-x-1 gap-y-2 text-sm text-white/90 max-w-xl md:max-w-none"
            aria-label="روابط الموقع"
          >
            {FOOTER_LINKS.map((l, i) => (
              <span key={l.href} className="inline-flex items-center gap-1">
                {i > 0 && <span className="text-white/25 px-0.5 select-none" aria-hidden>|</span>}
                <Link href={l.href} className="hover:text-white transition-colors whitespace-nowrap px-1 py-0.5">
                  {l.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <p className="text-xs text-white/50">© 2026 نبتة لابو. جميع الحقوق محفوظة.</p>
          <p className="text-xs text-white/50">مرخّص من هيئة الغذاء والدواء السعودية · SFDA</p>
        </div>
      </div>
    </footer>
  )
}
