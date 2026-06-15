/** نصوص خانة الطلب وCTA — حسب المنتج (مو نفس الروتين لكل SKU). */

import type { Product } from '@/lib/products'

/** جرعة الاستعمال على الغلاف — علكة. */
export const PDP_DOSE_SNIPPET_GUMMY = 'علكتان في الجرعة حسب الغلاف المعتمد'

/** جرعة الاستعمال على الغلاف — مسحوق. */
export const PDP_DOSE_SNIPPET_POWDER = 'ساشيه واحد يومياً حسب الجرعة على الغلاف المعتمد'

export const PDP_ADD_CTA: Record<string, string> = {
  'rawnaq-c': 'ابدئي روتين الصباح الآن',
  khiffabiotic: 'ابدئي روتين أخف بعد الأكل',
  laylmag: 'ابدئي روتين المساء الآن',
  'quwwat-sha3r': 'ابدئي روتين الشعر من الداخل',
  wudouh: 'ابدئي روتين البشرة من الداخل',
  'shahr-hadi': 'ابدئي شهراً أهدأ',
}

export const PDP_ROUTINE_NOTE: Record<string, { titleAr: string; bodyAr: string }> = {
  'rawnaq-c': {
    titleAr: 'روتين صباحي — علكتان في الجرعة',
    bodyAr: 'صباحًا: علكتان حسب الغلاف (مو علكة وحدة). العروض والسعر النهائي واضحين قبل التأكيد.',
  },
  khiffabiotic: {
    titleAr: 'بعد الأكل — علكتان، مو صباح ولا كبسولة',
    bodyAr: 'بعد الغداء أو العشا: علكتان في المرة حسب تعليمات العبوة. السعر يظهر كاملاً على زر السلة.',
  },
  laylmag: {
    titleAr: 'مساءً — علكتان قبل النوم',
    bodyAr: 'غالبًا قبل النوم بساعة: علكتان حسب الغلاف، مو منوم وصفة. العروض من خانة الطلب أدناه.',
  },
  'quwwat-sha3r': {
    titleAr: 'صباحاً — ساشيه واحد في كوب ماء',
    bodyAr: 'صباحاً: ساشيه واحد يُذاب في ماء أو عصير فاتر حسب الغلاف (مو علكة ولا كبسولة). العروض والسعر واضحين قبل التأكيد.',
  },
  wudouh: {
    titleAr: 'يومياً — ساشيه واحد للبشرة من الداخل',
    bodyAr: 'صباحاً على معدة فارغة أو مع وجبة خفيفة: ساشيه واحد في ماء فاتر حسب تعليمات العبوة المعتمدة.',
  },
  'shahr-hadi': {
    titleAr: 'يومياً وباستمرار — ساشيه واحد',
    bodyAr: 'ساشيه واحد يومياً في ماء أو عصير — الاستمرار أهم من «أيام الدورة» فقط. العروض من خانة الطلب أدناه.',
  },
}

const GUMMY_ROUTINE_FALLBACK = {
  titleAr: 'علكتان في الجرعة — خطوة واضحة قبل الطلب',
  bodyAr: 'الجرعة على الغلاف (غالبًا علكتان). العروض أدناه والسعر على زر السلة قبل التأكيد.',
}

const POWDER_ROUTINE_FALLBACK = {
  titleAr: 'ساشيه واحد يومياً — حسب الغلاف',
  bodyAr: 'ذوّبي الساشيه في ماء أو عصير فاتر حسب الجرعة المعتمدة (مو علكة). العروض أدناه والسعر على زر السلة.',
}

export function getPdpAddCta(productId: string): string {
  return PDP_ADD_CTA[productId] ?? 'اطلبي الآن'
}

export function getPdpRoutineNote(productId: string, format?: Product['format']) {
  if (PDP_ROUTINE_NOTE[productId]) return PDP_ROUTINE_NOTE[productId]
  return format === 'powder_sachet' ? POWDER_ROUTINE_FALLBACK : GUMMY_ROUTINE_FALLBACK
}

export function getPdpComplianceNote(format?: Product['format']): { lead: string; rest: string } {
  if (format === 'powder_sachet') {
    return {
      lead: 'أسابيع أولى بانتظام تفرق أكثر من «يوم واحد معجزة»؛',
      rest: 'التزمي بساشيه واحد يومياً حسب الغلاف — ذوّبيه في ماء أو عصير فاتر. كثير من عميلاتنا يبنين العادة قبل ما يكمل الشهر والإحساس أو المظهر',
    }
  }
  return {
    lead: 'أسابيع أولى بانتظام تفرق أكثر من «يوم واحد معجزة»؛',
    rest: 'التزمي بعلكتين في الجرعة حسب الغلاف. كثير من عميلاتنا يقلّبوها عادة قبل ما يكمل الشهر والإحساس أو المظهر',
  }
}
