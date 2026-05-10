type Props = {
  width: number
  height: number
  accentColor: string
  labelAr: string
  helperAr?: string
  className?: string
}

/**
 * مساحة صورة فارغة على صفحة المنتج فقط — عرّفي المسارات في `products.ts` أو ضع الملفات تحت `public/products/` ثم بدّلي هذا المكوّن بـ `next/image`.
 */
export default function ProductPageImageSlot({
  width,
  height,
  accentColor,
  labelAr,
  helperAr = 'هنا تضيفين ملف PNG أو WebP بجودة عالية؛ عدّلي المقاسات في تعريف المنتج إن احتجتِ نسبة مختلفة.',
  className = '',
}: Props) {
  return (
    <div
      className={`flex w-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#cfc4c0] bg-gradient-to-br from-[#faf9f8] via-white to-[#f3edeb] px-4 py-8 text-center sm:px-6 sm:py-12 ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={labelAr}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-lg text-white shadow-md sm:h-14 sm:w-14"
        style={{ background: accentColor }}
        aria-hidden
      >
        +
      </div>
      <p className="text-sm font-bold text-[#3a3534] sm:text-base">{labelAr}</p>
      <p className="max-w-sm text-xs leading-relaxed text-[#7a726f] sm:text-sm">{helperAr}</p>
    </div>
  )
}
