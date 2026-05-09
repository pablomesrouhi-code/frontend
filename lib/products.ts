export type Product = {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  subtitleAr: string
  heroHeadlineAr: string
  heroSubAr: string
  badgeAr: string
  accentColor: string
  bgColor: string
  /** صورة الغلاف الواحدة (بطاقة + أقسام الصفحة حتى تأتي صور إضافية) */
  coverImage: string
  coverWidth: number
  coverHeight: number
  ingredients: string[]
  benefits: string[]
  howToUse: string
  painCopy: string
  crossSells: string[]
  rating: number
  reviewCount: number
  reviews: { name: string; text: string; rating: number }[]
  faqs: { q: string; a: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'rawnaq-c',
    slug: 'rawnaq-c-collagen-gummies',
    nameAr: 'رونق C',
    nameEn: 'Rawnaq-C Collagen Gummies',
    subtitleAr: 'علكات الكولاجين وفيتامين C لدعم نضارة البشرة وقوة الشعر والأظافر',
    heroHeadlineAr: 'نضارة تبدأ من روتينك اليومي',
    heroSubAr:
      'علكات كولاجين وفيتامين C بطعم لذيذ، مصممة لدعم نضارة البشرة وقوة الشعر والأظافر ضمن روتين بسيط.',
    badgeAr: 'روتين الجمال اليومي',
    accentColor: '#b8485c',
    bgColor: '#f1e6e4',
    coverImage: '/products/rawnaq-c.png',
    coverWidth: 1024,
    coverHeight: 769,
    ingredients: ['كولاجين', 'فيتامين C'],
    benefits: [
      'يدعم نضارة البشرة من الداخل',
      'يساعد في دعم قوة الشعر والأظافر',
      'طعم لذيذ سهل الالتزام به يومياً',
      'تركيبة مدروسة لروتين المرأة اليومي',
    ],
    howToUse: 'تناولي العلكات يومياً حسب التعليمات على العبوة، ويفضل في الصباح.',
    painCopy:
      'إذا كنتِ تبحثين عن روتين جمال أبسط وأكثر ثباتاً، رونق C يعطيكِ خطوة يومية سهلة تدعم جمالك من الداخل بدون تعقيد.',
    crossSells: ['khiffabiotic', 'laylmag'],
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      { name: 'سارة م.', text: 'دخلته في روتيني الصباحي، سهل وطعمه لطيف.', rating: 5 },
      { name: 'ريم ع.', text: 'أحب المنتجات اللي ما تحتاج خطوات كثيرة، هذا بالضبط.', rating: 5 },
      { name: 'منى ك.', text: 'علكة صغيرة تفرق في الروتين اليومي.', rating: 4 },
    ],
    faqs: [
      { q: 'متى أستخدم رونق C؟', a: 'يفضل تناوله في الصباح ضمن روتينك اليومي.' },
      { q: 'هل يناسب الاستخدام اليومي؟', a: 'نعم، مصمم للاستخدام اليومي المستمر.' },
      { q: 'هل هو بديل للعناية الخارجية؟', a: 'يكمّل العناية الخارجية ولا يحل محلها، بل يدعم الجمال من الداخل.' },
      { q: 'هل الطعم حلو؟', a: 'نعم، طعم خفيف ولذيذ يسهل الالتزام به.' },
    ],
  },
  {
    id: 'khiffabiotic',
    slug: 'khiffabiotic-probiotic-gummies',
    nameAr: 'خفّة بيوتك',
    nameEn: 'KhiffaBiotic Probiotic Gummies',
    subtitleAr: 'علكات البروبيوتيك والألياف لدعم راحة الهضم وتقليل الإحساس بالانتفاخ بعد الأكل',
    heroHeadlineAr: 'خفّة بعد الأكل بدون تعقيد',
    heroSubAr:
      'علكات بروبيوتيك وألياف تدعم راحة الهضم وتساعدك تحافظين على إحساس أخف بعد الوجبات.',
    badgeAr: 'إحساس أخف بعد الوجبات',
    accentColor: '#a86b5e',
    bgColor: '#eae2df',
    coverImage: '/products/khiffabiotic.png',
    coverWidth: 1024,
    coverHeight: 769,
    ingredients: ['بروبيوتيك', 'ألياف'],
    benefits: [
      'يدعم راحة الجهاز الهضمي',
      'يساعد في الحفاظ على إحساس أخف بعد الوجبات',
      'سهل الدمج في روتين يومي ثابت',
      'تركيبة بروبيوتيك وألياف معاً',
    ],
    howToUse: 'تناولي العلكات يومياً حسب التعليمات على العبوة، ويفضل ضمن روتين ثابت.',
    painCopy:
      'بعد الوجبات الثقيلة، كثيرات منا يبحثن عن شيء بسيط يخفف الإحساس بالثقل. خفّة بيوتك مصممة لروتين يومي ألطف وأسهل.',
    crossSells: ['rawnaq-c', 'laylmag'],
    rating: 4.7,
    reviewCount: 98,
    reviews: [
      { name: 'نور س.', text: 'بعد الأكل أحب آخذ شيء خفيف وسهل، هذا المنتج ضبط.', rating: 5 },
      { name: 'هدى ف.', text: 'حلو إنه علكة مو بودرة أو كبسولة، أسهل بكثير.', rating: 5 },
      { name: 'لينا ر.', text: 'صار جزء من روتيني بعد الغداء.', rating: 4 },
    ],
    faqs: [
      { q: 'هل أستخدمها بعد الأكل؟', a: 'يمكن تناولها بعد الوجبات أو في أي وقت يناسب روتينك.' },
      { q: 'ما الفرق بين البروبيوتيك والألياف؟', a: 'البروبيوتيك بكتيريا نافعة تدعم صحة الجهاز الهضمي، والألياف تساعد في دعم حركة الهضم الطبيعية.' },
      { q: 'هل تناسب الاستخدام اليومي؟', a: 'نعم، مصممة للاستخدام اليومي المستمر.' },
      { q: 'هل تساعد مع الإحساس بالانتفاخ؟', a: 'تدعم راحة الهضم وتساعد في الحفاظ على إحساس أخف بعد الوجبات.' },
    ],
  },
  {
    id: 'laylmag',
    slug: 'laylmag-magnesium-gummies',
    nameAr: 'ليل ماج',
    nameEn: 'LaylMag Magnesium Gummies',
    subtitleAr: 'علكات المغنيسيوم وL-Theanine لروتين مساء هادئ واسترخاء قبل النوم',
    heroHeadlineAr: 'هدوء المساء يبدأ بخطوة صغيرة',
    heroSubAr:
      'علكات مغنيسيوم وL-Theanine مصممة لروتين مساء أهدأ واسترخاء قبل النوم بدون تعقيد.',
    badgeAr: 'هدوء قبل النوم',
    accentColor: '#b8485c',
    bgColor: '#faf7f6',
    coverImage: '/products/laylmag.png',
    coverWidth: 1024,
    coverHeight: 769,
    ingredients: ['مغنيسيوم', 'L-Theanine'],
    benefits: [
      'يدعم هدوء المساء',
      'يساعد في بناء روتين استرخاء قبل النوم',
      'تركيبة مغنيسيوم وL-Theanine معاً',
      'لحظة يومية هادئة لنفسك',
    ],
    howToUse: 'تناولي العلكات مساءً حسب التعليمات على العبوة.',
    painCopy:
      'بعد يوم طويل من الشاشات والتنبيهات، جسمك يحتاج إشارة هادئة. ليل ماج يساعدك تبنين روتين مساء ألطف.',
    crossSells: ['rawnaq-c', 'khiffabiotic'],
    rating: 4.9,
    reviewCount: 156,
    reviews: [
      { name: 'عبير م.', text: 'صار عندي روتين مساء أهدأ بعد ما بدأت آخذه.', rating: 5 },
      { name: 'ديما ح.', text: 'أخذه قبل النوم كجزء من وقتي لنفسي.', rating: 5 },
      { name: 'شيماء ع.', text: 'طعمه خفيف وروتينه بسيط، حبيته.', rating: 5 },
    ],
    faqs: [
      { q: 'هل ليل ماج منوم؟', a: 'لا، يدعم الاسترخاء والهدوء ولا يعمل كمنوم.' },
      { q: 'متى أستخدمه؟', a: 'يفضل تناوله مساءً قبل النوم بساعة أو حسب روتينك.' },
      { q: 'ما هو L-Theanine؟', a: 'حمض أميني طبيعي يوجد في الشاي الأخضر، معروف بمساعدته في دعم الاسترخاء دون الإحساس بالنعاس الثقيل.' },
      { q: 'هل يناسب روتين قبل النوم؟', a: 'نعم، مصمم خصيصاً لروتين المساء والاسترخاء.' },
    ],
  },
]

export const OFFERS = [
  { qty: 1 as const, label: 'قطعة واحدة', price: 199, badge: null },
  { qty: 2 as const, label: 'قطعتين', price: 279, badge: 'اختيار ذكي' },
  { qty: 3 as const, label: '3 قطع', price: 349, badge: 'الأكثر توفيراً' },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getCrossSellProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  return product.crossSells.map((id) => getProductById(id)).filter(Boolean) as Product[]
}

export function getBestUpsell(cartProductIds: string[]): Product | null {
  const all = PRODUCTS.map((p) => p.id)
  const missing = all.filter((id) => !cartProductIds.includes(id))
  if (missing.length === 0) return null
  // Prioritize: if Rawnaq-C in cart → KhiffaBiotic, else first missing
  if (cartProductIds.includes('rawnaq-c') && missing.includes('khiffabiotic')) {
    return getProductById('khiffabiotic') ?? null
  }
  if (cartProductIds.includes('laylmag') && missing.includes('rawnaq-c')) {
    return getProductById('rawnaq-c') ?? null
  }
  return getProductById(missing[0]) ?? null
}

export function getPriceForQty(qty: 1 | 2 | 3): number {
  const map: Record<number, number> = { 1: 199, 2: 279, 3: 349 }
  return map[qty]
}
