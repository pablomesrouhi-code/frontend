'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-[0_2px_8px_rgba(26,25,21,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-authority/30 hover:shadow-[0_20px_48px_-12px_rgba(20,107,112,0.14)]"
    >
      <Link href={`/products/${product.slug}`} className="block shrink-0 overflow-hidden bg-[#FAFAFA]">
        <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={product.coverImage}
            alt={product.nameAr}
            fill
            sizes="(max-width: 767px) 100vw, 33vw"
            className="object-cover object-center"
          />
        </div>
      </Link>

      <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${product.accentColor}66, transparent)` }} />

      <div className="p-6 sm:p-7 flex flex-1 flex-col gap-4 min-h-0 min-w-0">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span
            className="text-sm font-bold px-3 py-1.5 rounded-full text-white tracking-wide"
            style={{ background: product.accentColor }}
          >
            {product.badgeAr}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-tight tracking-tight break-words">
          {product.nameAr}
        </h3>
        <p className="text-sm sm:text-base text-[#5c5656] leading-relaxed line-clamp-3 break-words">{product.subtitleAr}</p>

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
