/** نصوص خانة الطلب وCTA — حسب المنتج (مو نفس الروتين لكل SKU). */

/** جرعة الاستعمال على الغلاف: علكتان في المرة (مو علكة واحدة). */
export const PDP_DOSE_SNIPPET = 'علكتان في الجرعة حسب الغلاف المعتمد'

export const PDP_ADD_CTA: Record<string, string> = {
  'rawnaq-c': 'ابدئي روتين الصباح الآن',
  khiffabiotic: 'ابدئي روتين أخف بعد الأكل',
  laylmag: 'ابدئي روتين المساء الآن',
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
}

export function getPdpAddCta(productId: string): string {
  return PDP_ADD_CTA[productId] ?? 'اطلبي الآن'
}

export function getPdpRoutineNote(productId: string) {
  return (
    PDP_ROUTINE_NOTE[productId] ?? {
      titleAr: 'علكتان في الجرعة — خطوة واضحة قبل الطلب',
      bodyAr: 'الجرعة على الغلاف (غالبًا علكتان). العروض أدناه والسعر على زر السلة قبل التأكيد.',
    }
  )
}
