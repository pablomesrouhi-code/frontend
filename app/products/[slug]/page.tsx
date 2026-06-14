import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getProductById } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'
import PdpSquareImage from '@/components/product/PdpSquareImage'
import PdpDeliveryPaymentSection from '@/components/product/PdpDeliveryPaymentSection'
import PdpReviewsSection from '@/components/product/PdpReviewsSection'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'
import { getPdpAddCta } from '@/lib/pdp-copy'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.nameAr} | نبتة لابو`,
    description: product.subtitleAr,
  }
}

// Ingredient description lookup
const INGREDIENT_DESC: Record<string, string> = {
  'بيوتين': 'فيتامين B7 يدعم صحة الشعر والأظافر والبشرة ضمن مكمّل غذائي.',
  'زنك': 'معدن يدعم وظائف طبيعية مرتبطة بالشعر والبشرة والمناعة.',
  'فيتامين D': 'يدعم الصحة العامة وامتصاص الكالسيوم.',
  'فيتامين D3': 'شكل نشط من فيتامين D يدعم الصحة العامة والتوازن الهرموني.',
  'بروبيوتيك': 'بكتيريا نافعة تدعم التوازن الطبيعي للجهاز الهضمي.',
  'ألياف': 'تدعم حركة الهضم الطبيعية وإحساس الخفة بعد الوجبات.',
  'مغنيسيوم': 'معدن يدعم مسارات الاسترخاء والجهاز العصبي.',
  'L-Theanine': 'حمض أميني طبيعي يدعم الاسترخاء دون نعاس ثقيل.',
  'كولاجين بحري': 'بروتين من السمك يدعم بنية الشعر والبشرة من الداخل.',
  'حديد': 'معدن ترتبط قلّته بتساقط الشعر عند النساء.',
  'فيتامين C': 'مضاد أكسدة يدعم بناء الكولاجين وامتصاص الحديد وإشراق البشرة.',
  'حمض الفوليك': 'فيتامين B9 ضروري لتجديد الخلايا وصحة بصيلات الشعر.',
  'غلوتاثيون': 'مضاد أكسدة قوي مرتبط بإضاءة البشرة وتقليل التصبّغ.',
  'NAC': 'N-أستيل سيستين، يدعم مستويات الغلوتاثيون في الجسم.',
  'كركم': 'مستخلص نباتي ذو خصائص مضادة للالتهاب.',
  'مايو-إينوسيتول': 'مادة طبيعية تدعم التوازن الهرموني الأنثوي.',
  'فيتكس': 'مستخلص توت العفاريت — عشبة مرتبطة بتخفيف أعراض PMS.',
  'فيتامين B6': 'يساعد في تنظيم الهرمونات وتقليل تقلبات المزاج.',
  'كالسيوم': 'معدن أساسي لصحة العظام والعضلات.',
  'زنجبيل': 'مستخلص نباتي مضاد للالتهاب — يخفف تقلصات البطن.',
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const isPowder = product.format === 'powder_sachet'
  const accent = product.accentColor

  const crossSellProducts = product.crossSells
    .map((id) => getProductById(id))
    .filter(Boolean) as typeof PRODUCTS

  // Only use real images for gummy products (powder products skip image sections)
  const pdpHeroImage = !isPowder && product.pdpHeroImage ? product.pdpHeroImage : null
  const painImage = !isPowder && product.painSectionImage ? product.painSectionImage : null
  const ingredientsImage = !isPowder && product.ingredientsSectionImage ? product.ingredientsSectionImage : null
  const extraStory = !isPowder ? product.extraStory : null

  const heroImageSrc = pdpHeroImage?.src ?? (!isPowder ? product.coverImage : null)

  return (
    <div className="bg-white pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))]">

      {/* ══════════════════════════════════════════════════════
          1. HERO — image (or placeholder) + buy box
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden border-b border-[#f0ece8]"
        style={{
          background: `linear-gradient(160deg, #fff 0%, ${product.bgColor} 100%)`,
        }}
      >
        {/* soft glow */}
        <div
          className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: accent }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div
                className="overflow-hidden rounded-3xl bg-white p-3 shadow-lg sm:p-4"
                style={{ border: `1.5px solid ${accent}22` }}
              >
                {heroImageSrc ? (
                  <PdpSquareImage
                    src={heroImageSrc}
                    alt={pdpHeroImage?.alt ?? product.nameAr}
                    width={pdpHeroImage?.width ?? product.coverWidth}
                    height={pdpHeroImage?.height ?? product.coverHeight}
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    maxWidthClass="max-w-full"
                  />
                ) : (
                  <div className="relative">
                    <PowderPlaceholder product={product} size="hero" />
                  </div>
                )}
              </div>
              {product.captionUnderHeroImage && !isPowder && (
                <p className="mt-3 text-center text-xs leading-snug text-[#7a726f]">
                  {product.captionUnderHeroImage}
                </p>
              )}
            </div>

            {/* TEXT + BUY */}
            <div className="order-2 min-w-0 text-start md:order-1">
              {/* badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                  style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                >
                  {isPowder ? 'ساشيه مسحوق' : 'علكة'}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black text-white"
                  style={{ background: accent }}
                >
                  ✦ {product.badgeAr}
                </span>
              </div>

              {/* Magnet line */}
              {product.pdpMagnetLineAr && (
                <p
                  className="mb-4 border-r-2 pe-3 text-sm font-semibold leading-snug text-[#1C1C1C] sm:text-base"
                  style={{ borderColor: accent }}
                >
                  {product.pdpMagnetLineAr}
                </p>
              )}

              {/* Name */}
              <h1 className="mb-3 text-3xl font-black leading-tight tracking-tight text-[#1C1C1C] sm:text-4xl lg:text-5xl">
                {product.nameAr}
              </h1>

              {/* Hero headline */}
              <p className="mb-4 text-base font-bold leading-snug text-[#1C1C1C] sm:text-lg">
                {product.heroHeadlineAr}
              </p>

              {/* Rating */}
              <div className="mb-5 flex items-center gap-3">
                <StarRating rating={product.rating} count={product.reviewCount} size="md" />
                {product.reviewCount > 0 && (
                  <a
                    href="#pdp-reviews"
                    className="text-sm font-bold text-[#146b70] underline decoration-[#146b70]/40 underline-offset-2"
                  >
                    اقرأي التقييمات ↓
                  </a>
                )}
              </div>

              {/* Hero sub */}
              <p className="mb-6 text-sm leading-relaxed text-[#5c5656] sm:text-base">
                {product.heroSubAr}
              </p>

              {/* Ingredients chips */}
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#146b70]">المكوّنات</p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.slice(0, 4).map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#1C1C1C] shadow-sm"
                      style={{ border: `1px solid ${accent}25` }}
                    >
                      {ing}
                    </span>
                  ))}
                  {product.ingredients.length > 4 && (
                    <a
                      href="#pdp-ingredients"
                      className="rounded-full border border-dashed px-3 py-1.5 text-xs font-bold transition hover:bg-white"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      + {product.ingredients.length - 4} مكوّنات أخرى
                    </a>
                  )}
                </div>
              </div>

              {/* BUY BOX */}
              <div id="pdp-buy-anchor" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))]">
                <ProductPageClient product={product} addToCartLabel={getPdpAddCta(product.id)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. TRUST STRIP
      ══════════════════════════════════════════════════════ */}
      <div
        className="border-b border-white/10 py-4"
        style={{ background: `linear-gradient(95deg, ${accent} 0%, ${accent}cc 60%, #146b70 100%)` }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 px-3 text-[11px] font-bold text-white sm:gap-x-8 sm:text-sm">
          <span>🛡️ دفع عند الاستلام</span>
          <span>🚚 توصيل المملكة كاملة</span>
          <span>📞 تأكيد هاتفي قبل الشحن</span>
          <a href="/returns-refunds" className="underline decoration-white/40 underline-offset-2 hover:decoration-white">
            ↩️ ضمان 30 يوم
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. WHY YOU NEED IT — pain section
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-[#f0ece8] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            {/* Image side */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              {painImage ? (
                <PdpSquareImage
                  src={painImage.src}
                  alt={painImage.alt}
                  width={painImage.width}
                  height={painImage.height}
                  sizes="(max-width:1024px) min(560px, 100vw), 45vw"
                  maxWidthClass="max-w-full"
                />
              ) : (
                <div className="relative">
                  <PowderPlaceholder product={product} size="section" />
                </div>
              )}
            </div>

            {/* Text side */}
            <div className="order-2 text-start lg:order-1 lg:col-span-7">
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                style={{ background: '#1C1C1C' }}
              >
                هل هذا يشبه يومك؟
              </span>
              <h2 className="mb-5 text-3xl font-black leading-tight text-[#1C1C1C] sm:text-4xl">
                ليش تختارينه أصلاً؟
              </h2>
              <p className="mb-7 text-base leading-relaxed text-[#5c5656] sm:text-lg">
                {product.painCopy}
              </p>

              {/* Benefits */}
              <ul className="flex flex-col gap-3">
                {product.benefits.slice(0, 4).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4"
                    style={{ border: `1.5px solid ${accent}22` }}
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                      style={{ background: accent }}
                    >
                      ✓
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-[#1C1C1C] sm:text-base">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. EXTRA STORY (gummy products only)
      ══════════════════════════════════════════════════════ */}
      {extraStory && (
        <section className="border-b border-[#f0ece8] py-14 sm:py-20" style={{ background: `${product.bgColor}50` }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="text-start">
                <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-[#c9937e]">لمسة إضافية</p>
                <h2 className="mb-4 text-2xl font-black text-[#1C1C1C] sm:text-3xl">{extraStory.titleAr}</h2>
                <p className="text-base leading-relaxed text-[#5c5656] sm:text-lg">{extraStory.bodyAr}</p>
              </div>
              <div>
                <PdpSquareImage
                  src={extraStory.src}
                  alt={extraStory.alt}
                  width={extraStory.width}
                  height={extraStory.height}
                  sizes="(max-width: 768px) 100vw, 480px"
                  maxWidthClass="max-w-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          5. INGREDIENTS — clean cards
      ══════════════════════════════════════════════════════ */}
      <section id="pdp-ingredients" className="scroll-mt-20 border-b border-[#f0ece8] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#146b70]">شفافية كاملة</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">المكوّنات الفعّالة</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5c5656] sm:text-base">
              كل ما هو أساسي على الغلاف المعتمد لمنتجكم. هذا تعريف مختصر لفهم الفورمولا — مكمّل غذائي وليس دواء.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Image side */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              {ingredientsImage ? (
                <PdpSquareImage
                  src={ingredientsImage.src}
                  alt={ingredientsImage.alt}
                  width={ingredientsImage.width}
                  height={ingredientsImage.height}
                  sizes="(max-width:1024px) min(560px, 100vw), 45vw"
                  maxWidthClass="max-w-full"
                />
              ) : isPowder ? (
                <div className="relative">
                  <PowderPlaceholder product={product} size="section" />
                </div>
              ) : null}
            </div>

            {/* Ingredients list */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="flex flex-col gap-3">
                {product.ingredients.map((ing) => (
                  <div
                    key={ing}
                    className="rounded-2xl bg-white px-5 py-4"
                    style={{ border: '1.5px solid #ece5e2' }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black text-[#1C1C1C]">{ing}</p>
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-black uppercase"
                        style={{ background: `${accent}15`, color: accent }}
                      >
                        فعّال
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#5c5656]">
                      {INGREDIENT_DESC[ing] ?? 'مكوّن أساسي ضمن الفورمولا — التفاصيل الكاملة على الغلاف المعتمد.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. HOW TO USE
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-[#f0ece8] py-14 sm:py-16" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="text-4xl">{isPowder ? '🥤' : '🌿'}</div>
          <p className="mt-3 text-[11px] font-black uppercase tracking-widest text-[#b8485c]">كيف الاستخدام</p>
          <h2 className="mt-2 text-3xl font-black text-[#1C1C1C] sm:text-4xl">روتين بسيط</h2>
          <p className="mt-5 text-base leading-relaxed text-[#5c5656] sm:text-lg">{product.howToUse}</p>
          <p
            className="mt-6 rounded-2xl px-5 py-4 text-sm leading-relaxed text-[#1C1C1C]"
            style={{ background: 'white', border: `1.5px solid ${accent}22` }}
          >
            <strong style={{ color: '#146b70' }}>الالتزام 4–8 أسابيع</strong> أفضل من «نتيجة ليلة واحدة». التفاصيل الدقيقة على الغلاف المعتمد.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. PRODUCT INFO SHEETS (optional)
      ══════════════════════════════════════════════════════ */}
      {product.productInfoSheets && product.productInfoSheets.length > 0 && (
        <section className="border-b border-[#f0ece8] bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-2 text-start text-[11px] font-black uppercase tracking-widest text-[#5c5656]">معلومات المنتج</p>
            <h2 className="mb-8 text-start text-3xl font-black text-[#1C1C1C] sm:text-4xl">
              المكوّنات، النتيجة، وموانع الاستعمال
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.productInfoSheets.map((sheet) => (
                <article
                  key={sheet.titleAr}
                  className="rounded-2xl bg-white p-6"
                  style={{ border: '1.5px solid #ece5e2' }}
                >
                  <h3 className="text-lg font-black text-[#1C1C1C]">{sheet.titleAr}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c5656]">{sheet.bodyAr}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-start text-xs leading-relaxed text-[#7a726f]">
              المرجع النهائي: غلاف عبوّتكم المعتمد (SFDA) — الجرعة، القائمة الكاملة، والصلاحية.
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          8. REVIEWS
      ══════════════════════════════════════════════════════ */}
      <PdpReviewsSection product={product} />

      {/* ══════════════════════════════════════════════════════
          9. CROSS-SELLS
      ══════════════════════════════════════════════════════ */}
      {crossSellProducts.length > 0 && (
        <section className="border-b border-[#f0ece8] py-14 sm:py-20" style={{ background: '#faf8f7' }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 max-w-2xl text-start">
              <p className="mb-2 text-[11px] font-black uppercase tracking-widest" style={{ color: accent }}>
                كمّلي السلة
              </p>
              <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">
                عميلات كثيرات يضفن لروتينهن
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5c5656] sm:text-base">
                كل منتج له دوره. اختاري ما يكمّل يومك — وفّري في عرض الباقة.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {crossSellProducts.slice(0, 2).map((p) => (
                <ProductCard key={p.id} product={p} layout="list" useHomeCardImage />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          10. RETURN TO BUY
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-[#f0ece8] py-14 sm:py-16" style={{ background: '#1C1C1C' }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-[11px] font-black uppercase tracking-widest" style={{ color: accent }}>
            جاهزة من القرار؟
          </p>
          <h2 className="mb-5 text-3xl font-black text-white sm:text-4xl">
            اطلبيه الآن — دفع عند الباب
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/65">
            نفس العروض والأسعار موجودة في خانة الطلب فوق. ادفعي كاش عند الاستلام.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#pdp-buy-anchor"
              className="inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-black text-white transition hover:-translate-y-0.5"
              style={{ background: accent, boxShadow: `0 18px 48px -12px ${accent}55` }}
            >
              رجوع للطلب ↑
            </a>
            <a
              href="#pdp-reviews"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/25 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              قرأ التقييمات
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. DELIVERY + PAYMENT
      ══════════════════════════════════════════════════════ */}
      <PdpDeliveryPaymentSection accentColor={accent} bgColor={product.bgColor} />

      {/* ══════════════════════════════════════════════════════
          12. FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-start text-[11px] font-black uppercase tracking-widest text-[#146b70]">أسئلة شائعة</p>
          <h2 className="mb-8 text-start text-3xl font-black text-[#1C1C1C] sm:text-4xl">
            كل ما يخاف منه قبل الطلب — نقوله بوضوح
          </h2>
          <div className="flex flex-col gap-2">
            {product.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl bg-white"
                style={{ border: '1.5px solid #ece5e2' }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-[#1C1C1C] hover:bg-[#fdf9f7] sm:text-base">
                  <span className="flex-1 text-start">{faq.q}</span>
                  <span className="shrink-0 transition-transform group-open:rotate-180" style={{ color: accent }}>▼</span>
                </summary>
                <div className="border-t border-[#ece5e2] bg-[#fdf9f7] px-6 py-5 text-sm leading-relaxed text-[#5c5656]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
