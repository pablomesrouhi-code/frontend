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

      <div className="flex flex-1 flex-col gap-4 p-5 min-h-0 min-w-0 sm:p-7 sm:gap-4">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span
            className="text-sm font-bold px-3 py-1.5 rounded-full text-white tracking-wide"
            style={{ background: product.accentColor }}
          >
            {product.badgeAr}
          </span>
        </div>

        <h3 className="text-[1.35rem] leading-snug font-bold text-charcoal tracking-tight break-words sm:text-3xl md:text-[1.875rem]">
          {product.nameAr}
        </h3>
        <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-base">{product.subtitleAr}</p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold transition-all active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 group/btn"
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
