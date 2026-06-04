/** نصوص خانة الطلب وCTA — حسب المنتج (مو نفس الروتين لكل SKU). */

export const PDP_ADD_CTA: Record<string, string> = {
  'rawnaq-c': 'ابدئي روتين الصباح الآن',
  khiffabiotic: 'ابدئي روتين أخف بعد الأكل',
  laylmag: 'ابدئي روتين المساء الآن',
}

export const PDP_ROUTINE_NOTE: Record<string, { titleAr: string; bodyAr: string }> = {
  'rawnaq-c': {
    titleAr: 'روتين صباحي — علكة واحدة في اليوم',
    bodyAr: 'جرعة يومية حسب الغلاف (غالبًا علكة واحدة صباحًا). العروض والسعر النهائي واضحين قبل التأكيد.',
  },
  khiffabiotic: {
    titleAr: 'بعد الأكل — علكة واحدة، مو صباح ولا كبسولة',
    bodyAr: 'خطوة خفيفة بعد الغداء أو العشا حسب روتينك — علكة واحدة في المرة حسب تعليمات العبوة. السعر يظهر كاملاً على زر السلة.',
  },
  laylmag: {
    titleAr: 'مساءً — علكة واحدة قبل النوم',
    bodyAr: 'غالبًا قبل النوم بساعة — علكة واحدة حسب الغلاف، مو منوم وصفة. العروض من خانة الطلب أدناه.',
  },
}

export function getPdpAddCta(productId: string): string {
  return PDP_ADD_CTA[productId] ?? 'اطلبي الآن'
}

export function getPdpRoutineNote(productId: string) {
  return (
    PDP_ROUTINE_NOTE[productId] ?? {
      titleAr: 'علكة واحدة في الروتين — خطوة واضحة قبل الطلب',
      bodyAr: 'العروض من خانة الطلب هنا أدناه، والسعر النهائي يظهر على زر السلة قبل أي تأكيد.',
    }
  )
}
