/** عناوين أقسام صفحة المنتج — جذّابة ومخصّصة لكل SKU */

export type PdpSectionHeadlines = {
  pain?: {
    eyebrowAr?: string
    titleAr?: string
    subtitleAr?: string
    feelTitleAr?: string
    whyTitleAr?: string
    desireTitleAr?: string
  }
  ingredients?: {
    eyebrowAr?: string
    titleAr?: string
    subtitleAr?: string
  }
  routine?: { titleAr?: string }
  infoSheets?: { eyebrowAr?: string; titleAr?: string }
  faq?: { eyebrowAr?: string; titleAr?: string; subtitleAr?: string }
  reviews?: { eyebrowAr?: string; titleAr?: string; subtitleAr?: string }
  closingOffer?: { eyebrowAr?: string; titleAr?: string; subtitleAr?: string }
}

export const PDP_SECTION_HEADLINES: Record<string, PdpSectionHeadlines> = {
  'rawnaq-c': {
    pain: {
      eyebrowAr: 'تجاعيد، بشرة مرهقة، شعر خفيف؟',
      titleAr: 'مو كل ما تحتاجينه كريمات — أحيانًا الأساس من جوّا',
      subtitleAr:
        'رونق C يثبت علكتين صباحًا: بيوتين، زنك، D3 — للبشرة والتجاعيد أولاً، ثم الشعر والأظافر.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش عميلات يثبتن على علكتين صباحًا؟',
      desireTitleAr: 'وش يقدر يكمّل روتينكِ — بكل واقعية؟',
    },
    ingredients: {
      eyebrowAr: 'تركيبة واضحة',
      titleAr: 'بيوتين · زنك · D3 — دعم البشرة ومقاومة التجاعيد، ثم الشعر والأظافر',
      subtitleAr: 'التفاصيل الكاملة على الغلاف المعتمد؛ هنا خلاصة تساعدكِ تقرري بثقة.',
    },
    routine: { titleAr: 'علكتان مع قهوتك — روتين يثبت ما يطيّح من بالك' },
    faq: {
      eyebrowAr: 'جايّة من إعلان «رونق C»؟',
      titleAr: 'كل اللي تبغين تعرفينه قبل الطلب — بدون لفّ',
      subtitleAr: 'دفع عند الباب، تأكيد هاتفي، وجرعة الغلاف — بوضوح.',
    },
    reviews: {
      eyebrowAr: 'تجارب حقيقية',
      titleAr: 'عميلات اختارت رونق C — كلام روتين، مو وعود سحرية',
      subtitleAr: 'آراء شخصية؛ النتيجة تعتمد على الالتزام والجسم.',
    },
    closingOffer: {
      eyebrowAr: 'قرار اليوم',
      titleAr: 'اختاري العرض فوق واطلبي — نفس الأسعار اللي شفتيها',
    },
  },
  khiffabiotic: {
    pain: {
      eyebrowAr: 'بعد الأكل ثقيل أو منتفخ؟',
      titleAr: 'مو كل وجبة تحتاج كبسولة — أحيانًا علكتان بعد الطعام أهدأ',
      subtitleAr:
        'خفّة بيوتك بروبيوتيك + ألياف: خطوة واحدة بعد الغداء أو العشا تثبت الروتين.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يختارونه بعد الوجبات؟',
      desireTitleAr: 'وش يقدر يكمّل يومكِ — واقعيًا؟',
    },
    ingredients: {
      eyebrowAr: 'دعم هضمي',
      titleAr: 'بروبيوتيك + ألياف — تركيبة خفيفة بعد الأكل',
      subtitleAr: 'مكمّل غذائي يكمّل أكلًا متوازنًا؛ مو علاج طوارئ للانتفاخ.',
    },
    routine: { titleAr: 'بعد الغداء أو العشا — علكتان وتكمّلين يومكِ' },
    faq: {
      eyebrowAr: 'قبل ما تطلبي',
      titleAr: 'أسئلة «خفّة بيوتك» اللي تجي بعد الإعلان — إجابات مباشرة',
    },
    reviews: {
      titleAr: 'عميلات جرّبن خفّة بيوتك بعد الوجبات — بدون مبالغة',
    },
    closingOffer: {
      titleAr: 'جاهزة للطلب؟ العروض فوق — دفع عند الباب',
    },
  },
  laylmag: {
    pain: {
      eyebrowAr: 'راسك ما يرتاح قبل النوم؟',
      titleAr: 'مو منوم وصفة — إشارة هدوء قبل ما تنامين',
      subtitleAr:
        'ليل ماج مسحوق مغنيسيوم 14 في 1 بنكهة التوت: جرعة في كوب ماء تكمل روتينك قبل ما تطفين الشاشة.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يختارونه قبل النوم؟',
      desireTitleAr: 'وش يقدر يكمّل مساءكِ — بلا ادّعاء سحر؟',
    },
    ingredients: {
      eyebrowAr: 'مساء هادئ',
      titleAr: 'مغنيسيوم · L-Theanine — دعم استرخاء قبل النوم',
      subtitleAr: 'مو بديل نوم طبيعي؛ روتين يكمّل نومكِ وعاداتكِ.',
    },
    routine: { titleAr: 'قبل النوم بـ30–60 دقيقة — مسحوق في كوب ماء وروتين يثبت' },
    faq: {
      titleAr: 'أسئلة «ليل ماج» قبل ما تدفعي عند الباب',
    },
    reviews: {
      titleAr: 'عميلات بدأن روتين مسائي بليل ماج — تجارب واقعية',
    },
    closingOffer: {
      titleAr: 'اختاري عرض ليل ماج واطلبي — تأكيد هاتفي قبل الشحن',
    },
  },
  'quwwat-sha3r': {
    pain: {
      eyebrowAr: 'شعر على الوسادة، فراغات، خيط يتكسر؟',
      titleAr: 'التساقط يبدأ من الداخل — مو من سيروم واحد',
      subtitleAr:
        'قوة شعر كولاجين بحري + بيوتين + زنك + حديد: مكيال يومي يذاب في الماء ويثبت الروتين.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يختارونه للتساقط؟',
      desireTitleAr: 'وش يقدر يكمّل روتين شعركِ — واقعيًا؟',
    },
    ingredients: {
      eyebrowAr: 'من الداخل',
      titleAr: 'كولاجين بحري · بيوتين · زنك · حديد — تركيبة شعر من جوّا',
      subtitleAr: 'مكيال يومي؛ الجرعة والتفاصيل على الغلاف المعتمد.',
    },
    routine: { titleAr: 'مكيال واحد في الماء — روتين شعر بسيط يثبت' },
    faq: {
      titleAr: 'أسئلة «قوة شعر» — قبل الطلب والدفع عند الاستلام',
    },
    reviews: {
      titleAr: 'تجارب عميلات مع قوة شعر — روتين، مو معجزة',
    },
    closingOffer: {
      titleAr: 'جاهزة تبدئي؟ العروض فوق — نفس اللي شفتيه في الإعلان',
    },
  },
  wudouh: {
    pain: {
      eyebrowAr: 'حبوب stubborn ما تروح بالكريمات؟',
      titleAr: 'البشرة النقية تبدأ مما تأكلين — مو من concealer فقط',
      subtitleAr:
        'وضوح غلوتاثيون + كولاجين + زنك + C: مكيال يومي يدعم إشراق البشرة من الداخل.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يختارونه للبشرة؟',
      desireTitleAr: 'وش يقدر يكمّل عنايتكِ — بلا وعود طبية؟',
    },
    ingredients: {
      eyebrowAr: 'إشراق من الداخل',
      titleAr: 'غلوتاثيون · كولاجين · زنك · C — تركيبة وضوح واضحة',
      subtitleAr: 'يكمّل SPF وعناية خارجية؛ مو بديل طبيب جلدية.',
    },
    routine: { titleAr: 'مكيال صباحًا في الماء — روتين بشرة يثبت' },
    faq: {
      titleAr: 'أسئلة «وضوح» — شفافية قبل ما تطلبي',
    },
    reviews: {
      titleAr: 'عميلات جرّبن وضوح — كلام بشرة واقعي',
    },
    closingOffer: {
      titleAr: 'اختاري عرض وضوح واطلبي — دفع عند الباب',
    },
  },
  'shahr-hadi': {
    pain: {
      eyebrowAr: 'أيام الدورة صعبة، تقلبات، تعب؟',
      titleAr: 'الشهر أهدأ يبدأ من روتين صغير — مو من صبر وحده',
      subtitleAr:
        'شهر هادئ مايو-إينوسيتول + فيتكس + مغنيسيوم + B6: مكيال يومي يدعم توازنكِ.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يختارونه أيام الدورة؟',
      desireTitleAr: 'وش يقدر يكمّل شهركِ — واقعيًا؟',
    },
    ingredients: {
      eyebrowAr: 'توازن أنثوي',
      titleAr: 'مايو-إينوسيتول · فيتكس · مغنيسيوم · B6 — تركيبة شهر هادئ',
      subtitleAr: 'مكمّل غذائي يكمّل نمط حياتك؛ مو بديل متابعة طبية.',
    },
    routine: { titleAr: 'مكيال يومي — روتين بسيط قبل أيام الدورة' },
    faq: {
      titleAr: 'أسئلة «شهر هادئ» — قبل الطلب',
    },
    reviews: {
      titleAr: 'تجارب عميلات مع شهر هادئ — بدون مبالغة',
    },
    closingOffer: {
      titleAr: 'جاهزة؟ العروض فوق — تأكيد هاتفي + دفع عند الاستلام',
    },
  },
  naseej: {
    pain: {
      eyebrowAr: 'تجاعيد… شعر خفيف… بشرة باهتة… أظافر تتكسر؟',
      titleAr: 'المشكل مو كريم برّا فقط — الجمال من الداخل ناقص كولاجين',
      subtitleAr:
        'نسيج: كولاجين متعدد + هيالورونيك + فيتامين C + بيوتين. مكيال يومي يدعم التجاعيد والشعر والبشرة والأظافر من جوّا.',
      feelTitleAr: 'تعرفين هذا الإحساس؟',
      whyTitleAr: 'ليش يثبتن على مكيال كولاجين يومياً؟',
      desireTitleAr: 'وش يقدر يكمّل روتين جمالك من الداخل؟',
    },
    ingredients: {
      eyebrowAr: 'تركيبة واضحة',
      titleAr: 'كولاجين متعدد · هيالورونيك · فيتامين C · بيوتين',
      subtitleAr: 'ملخص تسويقي؛ الجرعة والقائمة الكاملة على الغلاف المعتمد.',
    },
    routine: { titleAr: 'مكيال واحد في الماء — تجاعيد وشعر وبشرة وأظافر' },
    faq: {
      eyebrowAr: 'جايّة من إعلان «نسيج»؟',
      titleAr: 'كل الإجابات قبل الطلب — بدون لفّ',
      subtitleAr: 'تجاعيد · شعر · بشرة · أظافر · دفع عند الباب.',
    },
    reviews: {
      eyebrowAr: 'تجارب حقيقية',
      titleAr: 'عميلات على روتين نسيج — كلام واقعي، مو وعود سحرية',
      subtitleAr: 'آراء شخصية؛ النتيجة تعتمد على الالتزام والجسم.',
    },
    closingOffer: {
      eyebrowAr: 'جاهزة؟',
      titleAr: 'اختاري عرض نسيج واطلبي — نفس الأسعار اللي شفتيها',
    },
  },
}

export function getPdpSectionHeadlines(productId: string): PdpSectionHeadlines {
  return PDP_SECTION_HEADLINES[productId] ?? {}
}
