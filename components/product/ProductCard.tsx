'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ border: '1px solid #dfd6d4', boxShadow: '0 2px 8px rgba(26,25,21,0.06)' }}>

      {/* Image slot */}
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-white">
        <div
          className="w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ background: '#FAFAFA', minHeight: 'clamp(260px, 38vw, 360px)', maxHeight: '380px' }}
        >
          <Image
            src={product.coverImage}
            alt={product.nameAr}
            width={product.coverWidth}
            height={product.coverHeight}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
            className="h-auto w-full object-contain"
          />
        </div>
      </Link>

      <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${product.accentColor}66, transparent)` }} />

      <div className="p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className="text-sm font-bold px-3 py-1.5 rounded-full text-white tracking-wide"
            style={{ background: product.accentColor }}
          >
            {product.badgeAr}
          </span>
          <span className="text-base sm:text-lg font-bold" style={{ color: '#b8485c' }}>من 199 ريال</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-tight tracking-tight">{product.nameAr}</h3>
        <p className="text-sm sm:text-base text-[#5c5656] leading-relaxed line-clamp-3">{product.subtitleAr}</p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-auto w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-base group/btn transition-all"
          style={{ background: '#FFFFFF', color: product.accentColor, border: `2px solid ${product.accentColor}44` }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = product.accentColor; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; (e.currentTarget as HTMLElement).style.color = product.accentColor; }}
        >
          <span>اكتشفي المنتج</span>
          <span className="transition-transform group-hover/btn:-translate-x-1">←</span>
        </Link>
      </div>
    </div>
  )
}
