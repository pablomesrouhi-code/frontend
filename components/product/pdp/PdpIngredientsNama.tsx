import type { Product } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getIngredientDescription, INGREDIENT_FREE_FROM } from '@/lib/pdp-ingredient-copy'
import PdpSquareImage from '@/components/product/PdpSquareImage'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'
import ProductPageImageSlot from '@/components/product/ProductPageImageSlot'
import { isPowderProduct } from '@/lib/products'

type Props = {
  product: Product
}

export default function PdpIngredientsNama({ product }: Props) {
  const accent = product.accentColor
  const ingH = getPdpSectionHeadlines(product.id).ingredients ?? {}
  const isPowder = isPowderProduct(product)
  const photo = product.ingredientsSectionImage

  return (
    <section id="pdp-ingredients" className="scroll-mt-28 border-b border-border/70 bg-[#faf9f8] py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start md:mb-10">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">
            {ingH.eyebrowAr ?? 'المكوّنات الفعّالة'}
          </p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            {ingH.titleAr ?? 'السرّ في التركيز، مو في القائمة'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
            {ingH.subtitleAr ??
              'كل مكوّن بجرعة مدروسة حسب الغلاف المعتمد. مو خلطة عشوائية — شفافية قبل الطلب.'}
          </p>
        </div>

        <div className="mb-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            {photo ? (
              <PdpSquareImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width:1024px) min(560px, 100vw), 40vw"
                maxWidthClass="max-w-full"
              />
            ) : isPowder ? (
              <div className="relative min-h-[280px]">
                <PowderPlaceholder product={product} size="section" />
              </div>
            ) : (
              <ProductPageImageSlot
                width={product.coverWidth}
                height={product.coverHeight}
                accentColor={accent}
                labelAr="مساحة صورة — المكوّنات"
              />
            )}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            {product.ingredients.map((ing) => (
              <article
                key={ing}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-black text-charcoal sm:text-lg">{ing}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white sm:text-xs"
                    style={{ background: accent }}
                  >
                    حسب الغلاف
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-[15px]">
                  {getIngredientDescription(ing)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 sm:rounded-3xl sm:p-6">
          <h3 className="mb-4 text-base font-black text-charcoal sm:text-lg">ما لن تجديه في منتجك</h3>
          <div className="flex flex-wrap gap-2">
            {INGREDIENT_FREE_FROM.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-[#fdfcfc] px-3 py-1.5 text-xs font-semibold text-charcoal"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
