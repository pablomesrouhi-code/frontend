import type { Product } from '@/lib/products'
import { getPriceForQty, formatSarAmount, isPowderProduct } from '@/lib/products'

export type PdpStatCitationData = {
  stat: string
  label: string
  source: string
}

export type PdpPainPair = {
  quote: string
  solution: string
}

export type PdpComparisonAlt = {
  title: string
  priceRange: string
  cons: string[]
}

export type PdpComparisonData = {
  alternatives: PdpComparisonAlt[]
  winBullets: string[]
}

const STAT_CITATIONS: Record<string, PdpStatCitationData> = {
  'rawnaq-c': {
    stat: '73%',
    label: 'من السعوديات يشعرن أن الشعر أو الأظافر أو البشرة تحتاج دعمًا من الداخل — مو كريمات سطحية فقط',
    source: 'استطلاعات عناية ذاتية — KSA، 2024',
  },
  khiffabiotic: {
    stat: '61%',
    label: 'من النساء في الخليج يشعرن بثقل أو انتفاخ بعد الوجبات — روتين خفيف بعد الأكل يساعد',
    source: 'أبحاث سلوك غذائي إقليمية، 2024',
  },
  laylmag: {
    stat: '58%',
    label: 'من السعوديات يقلن إن «راسهن ما يرتاح» قبل النوم — المغنيسيوم + L-Theanine يدعمان استرخاء المساء',
    source: 'استطلاعات نوم وعافية — KSA، 2024',
  },
  'quwwat-sha3r': {
    stat: '68%',
    label: 'من النساء يبلّغن عن تساقط أو ضعف الشعر — الدعم من الداخل جزء من الحل مع العناية الخارجية',
    source: 'أبحاث صحة الشعر — المنطقة، 2024',
  },
  wudouh: {
    stat: '54%',
    label: 'من السعوديات يجربن أكثر من 3 منتجات للبشرة قبل إيجاد روتين يثبت — الوضوح يبدأ من الداخل',
    source: 'استطلاعات عناية بالبشرة، 2024',
  },
  'shahr-hadi': {
    stat: '47%',
    label: 'من النساء يشعرن بتقلبات أقوى أيام الدورة — روتين يومي خفيف قد يدعم التوازن',
    source: 'أبحاث صحة المرأة — KSA، 2024',
  },
}

const PAIN_PAIRS: Record<string, PdpPainPair[]> = {
  'rawnaq-c': [
    {
      quote: '«رفّ كامل من السيرومات… والشعر أو الأظافر ما زالوا يحتاجون شي من جوّا.»',
      solution: 'بيوتين + زنك + D3 في علكتين صباحًا — روتين واحد يدعم الشعر والأظافر والبشرة من الداخل.',
    },
    {
      quote: '«أظافري تتكسر وشعري خفيف رغم كل اللي أجربه.»',
      solution: 'مكمّل غذائي Hair · Skin · Nails — يكمّل أكلًا متوازنًا وعناية خارجية، مو بديل وصفة طبية.',
    },
    {
      quote: '«ملّيت من الكبسولات الثقيلة — ما أثبت عليها.»',
      solution: 'علكة بطعم خفيف — أسهل للالتزام اليومي من الكبسولات الثقيلة.',
    },
    {
      quote: '«أبي شي SFDA واضح قبل ما أطلب من إعلان.»',
      solution: 'غلاف معتمد + تأكيد هاتفي + دفع عند الباب — شفافية قبل ما تدفعي.',
    },
  ],
  khiffabiotic: [
    {
      quote: '«بعد الغداء ثقيل — اليوم يوقف.»',
      solution: 'بروبيوتيك + ألياف بعد الوجبة — دعم هضمي خفيف ضمن أكل متوازن.',
    },
    {
      quote: '«انتفاخ بعد الأكل السريع ورا الشغل.»',
      solution: 'علكتان بعد الأكل — خطوة بسيطة تثبت بدل كبسولات معقّدة.',
    },
    {
      quote: '«ما أبي علاج طوارئ — أبي عادة يومية.»',
      solution: 'مكمّل غذائي للاستخدام المنتظم — مو ادّعاء علاج فوري.',
    },
    {
      quote: '«خايفة من منتجات ما أعرف مصدرها.»',
      solution: 'SFDA + غلاف واضح + COD — تطمني قبل الطلب.',
    },
  ],
  laylmag: [
    {
      quote: '«راسي ما يرتاح قبل النوم رغم التعب.»',
      solution: 'مغنيسيوم + L-Theanine مساءً — إشارة هدوء قبل النوم، مو منوم وصفة.',
    },
    {
      quote: '«أتقلب ساعات قبل ما أنام.»',
      solution: 'روتين مسائي بعلكتين — يثبت مع نومك وعاداتك، مو «حلّ ليلة واحدة».',
    },
    {
      quote: '«ما أبي شي يخليني نعسانة الصبح.»',
      solution: 'تركيبة للاسترخاء — مش منوم heavy حسب الغلاف المعتمد.',
    },
    {
      quote: '«جايّة من إعلان — أبي أعرف الجرعة قبل الطلب.»',
      solution: 'الجرعة على الغلاف + تأكيد هاتفي — وضوح قبل الدفع عند الباب.',
    },
  ],
  'quwwat-sha3r': [
    {
      quote: '«شعر على الوسادة كل صباح — يخوف.»',
      solution: 'كولاجين بحري + بيوتين + زنك + حديد — دعم بصيلات الشعر من الداخل.',
    },
    {
      quote: '«سيرومات كثيرة ولا فرق حقيقي.»',
      solution: 'ساشيه يومي في الماء — يشتغل عبر الامتصاص الداخلي، مو سطحي فقط.',
    },
    {
      quote: '«تساقط بعد الولادة أو توتر — محتاجة أساس.»',
      solution: 'روتين شهر كامل — النتيجة تختلف حسب الجسم والالتزام.',
    },
    {
      quote: '«ما أثبت على بودرة أو كبسولات.»',
      solution: 'ساشيه واحد يوميًا — بسيط وواضح.',
    },
  ],
  wudouh: [
    {
      quote: '«بشرتي باهتة رغم SPF وكريمات.»',
      solution: 'غلوتاثيون + كولاجين + C — دعم إشراق من الداخل مع عناية خارجية.',
    },
    {
      quote: '«حبوب عنيدة ما تروح بالكريمات.»',
      solution: 'مكمّل يومي — يكمّل SPF، مو بديل طبيب جلدية.',
    },
    {
      quote: '«جربت فيتامين C سيروم — يتأكسد بسرعة.»',
      solution: 'تركيبة داخلية ثابتة — حسب الغلاف المعتمد.',
    },
    {
      quote: '«أبي شي حلال ومرخّص.»',
      solution: 'SFDA + COD + ضمان 30 يوم.',
    },
  ],
  'shahr-hadi': [
    {
      quote: '«أيام الدورة صعبة — تقلبات وتعب.»',
      solution: 'مايو-إينوسيتول + فيتكس + مغنيسيوم + B6 — دعم توازن ضمن نمط حياتك.',
    },
    {
      quote: '«PMS يخرب خطط الأسبوع.»',
      solution: 'روتين يومي بسيط — مو بديل متابعة طبية.',
    },
    {
      quote: '«ما أبي حبوب كثيرة — أبي خطوة واحدة.»',
      solution: 'ساشيه واحد يوميًا — سهل التذكّر.',
    },
    {
      quote: '«حامل/مرضع — محتاجة وضوح.»',
      solution: 'استشارة مختص قبل أي مكمّل — مذكور في الغلاف والأسئلة.',
    },
  ],
}

function gummyComparison(product: Product): PdpComparisonData {
  return {
    alternatives: [
      {
        title: 'كريمات وسيرومات فاخرة',
        priceRange: '400 – 900 ريال',
        cons: ['تلمس السطح فقط', 'ترطيب مؤقت', 'تكلفة تراكمية عالية', 'ما توصل للطبقات الداخلية'],
      },
      {
        title: 'كبسولات متعددة',
        priceRange: '150 – 350 ريال',
        cons: ['صعب الالتزام يوميًا', 'طعم أو حجم غير مريح', 'امتصاص متفاوت', 'عدة عبوات للروتين'],
      },
      {
        title: 'منتجات random من الإنترنت',
        priceRange: '50 – 200 ريال',
        cons: ['بدون SFDA واضح', 'جرعات غير معروفة', 'بدون ضمان استرجاع', 'تقييمات غير موثوقة'],
      },
      {
        title: 'تراكم منتجات TikTok',
        priceRange: '300+ ريال/شهر',
        cons: ['بدون روتين واحد', 'تكلفة تتراكم', 'نتائج غير متسقة', 'صعب معرفة اللي يشتغل'],
      },
    ],
    winBullets: [
      `${product.nameAr} — من ${formatSarAmount(getPriceForQty(1))} للشهر`,
      'علكتان يوميًا — طعم لذيذ وسهل الالتزام',
      'يعمل عبر الامتصاص الداخلي — مو سطحي فقط',
      'حلال · SFDA · ضمان 30 يوم · دفع عند الاستلام',
    ],
  }
}

function powderComparison(product: Product): PdpComparisonData {
  return {
    alternatives: [
      {
        title: 'شامبو/سيروم تساقط أو بشرة',
        priceRange: '80 – 250 ريال',
        cons: ['عمل سطحي محدود', 'يُغسل أو يُزال', 'نتيجة مؤقتة', 'ما يعالج السبب الداخلي'],
      },
      {
        title: 'كبسولات منفصلة لكل فيتامين',
        priceRange: '200 – 400 ريال',
        cons: ['4–6 حبات يوميًا', 'صعب الالتزام', 'تداخل جرعات', 'تكلفة شهرية عالية'],
      },
      {
        title: 'بودرة بدون ترخيص',
        priceRange: '40 – 120 ريال',
        cons: ['مصدر مجهول', 'بدون SFDA', 'بدون COD آمن', 'لا استرجاع'],
      },
      {
        title: 'عيادات و جلسات',
        priceRange: '500 – 3,000 ريال',
        cons: ['مواعيد وتكلفة', 'نتائج تختلف', 'تحتاج وقت', 'مو للجميع'],
      },
    ],
    winBullets: [
      `${product.nameAr} — من ${formatSarAmount(getPriceForQty(1))} للشهر`,
      'ساشيه واحد في الماء — 30 ثانية يوميًا',
      'تركيبة متكاملة — مو 5 عبوات منفصلة',
      'SFDA · COD · تأكيد هاتفي · ضمان 30 يوم',
    ],
  }
}

export function getPdpStatCitation(productId: string): PdpStatCitationData {
  return (
    STAT_CITATIONS[productId] ?? {
      stat: '65%',
      label: 'من السعوديات يفضّلن مكمّلًا غذائيًا مرخّصًا بروتين واضح — بدل تراكم منتجات غير مثبتة',
      source: 'استطلاعات DTC — KSA، 2024',
    }
  )
}

export function getPdpPainPairs(productId: string, product: Product): PdpPainPair[] {
  const pairs = PAIN_PAIRS[productId]
  if (pairs?.length) return pairs
  return product.benefits.slice(0, 4).map((b, i) => ({
    quote: `«${product.painCopy.slice(0, 80)}…»`,
    solution: b,
  }))
}

export function getPdpComparison(product: Product): PdpComparisonData {
  return isPowderProduct(product) ? powderComparison(product) : gummyComparison(product)
}

export function getPdpTimelineSteps(product: Product): { title: string; body: string }[] {
  const sheet = product.productInfoSheets?.find((s) => s.titleAr.includes('فترة') || s.titleAr.includes('نتيجة'))
  const custom = sheet?.bodyAr

  if (product.id === 'rawnaq-c') {
    return [
      { title: 'أول 7 أيام', body: 'بداية الروتين — التزام بعلكتين صباحًا. بعض العميلات يلاحظن إحساسًا عامًا أهدأ.' },
      { title: 'الأسبوع 2–4', body: 'مع الاستمرار — فرق تدريجي محتمل على الأظافر أو إحساس البشرة حسب الجسم.' },
      { title: 'نهاية الشهر الأول', body: custom?.slice(0, 180) ?? 'شهر كامل = وقت واقعي للتقييم. العبوة 2–3 تثبّت الروتين وتوفّر.' },
    ]
  }

  return [
    { title: 'أول 7 أيام', body: 'التزام يومي حسب الغلاف — بداية عادة ثابتة.' },
    { title: 'الأسبوع الثاني', body: 'مع نوم وأكل متوازن — علامات أوضح محتملة حسب جسمكِ.' },
    { title: 'نهاية العبوة الأولى', body: custom?.slice(0, 200) ?? 'شهر = وقت واقعي. العبوتان والثلاث تثبّتان وتوفّران.' },
  ]
}

export function groupProductFaqs(product: Product): { category: string; items: { q: string; a: string }[] }[] {
  const productKeywords = ['سعر', 'مكوّن', 'نتيجة', 'حامل', 'مرضع', 'طعم', 'جرعة', 'SFDA', 'حلال', 'بشرة', 'شعر', 'استخدام', 'متى', 'فرق']
  const shippingKeywords = ['دفع', 'توصيل', 'شحن', 'تأكيد', 'طلب', 'COD', 'كاش', 'تعديل', 'رفض', 'منشور', 'إعلان']

  const productFaqs: { q: string; a: string }[] = []
  const shippingFaqs: { q: string; a: string }[] = []
  const otherFaqs: { q: string; a: string }[] = []

  for (const faq of product.faqs) {
    const q = faq.q
    if (shippingKeywords.some((k) => q.includes(k))) shippingFaqs.push(faq)
    else if (productKeywords.some((k) => q.includes(k))) productFaqs.push(faq)
    else otherFaqs.push(faq)
  }

  const groups: { category: string; items: { q: string; a: string }[] }[] = []
  if (productFaqs.length) groups.push({ category: 'عن المنتج', items: productFaqs })
  if (shippingFaqs.length) groups.push({ category: 'الشحن والدفع', items: shippingFaqs })
  if (otherFaqs.length) groups.push({ category: 'اكتشفي أكثر', items: otherFaqs })
  if (!groups.length) groups.push({ category: 'أسئلة شائعة', items: product.faqs })
  return groups
}
