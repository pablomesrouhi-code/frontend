/** بيانات عرض إضافية للتقييمات — أسلوب nama (اسم كامل، عمر، مدينة) */

export type PdpTestimonialMeta = {
  displayName: string
  age?: number
  cityAr?: string
}

export const PDP_TESTIMONIAL_META: Record<string, PdpTestimonialMeta[]> = {
  'rawnaq-c': [
    { displayName: 'سارة العتيبي', age: 32, cityAr: 'الرياض' },
    { displayName: 'ريم القحطاني', age: 29, cityAr: 'جدة' },
    { displayName: 'منى الدوسري', age: 35, cityAr: 'الدمام' },
    { displayName: 'ليلى الشهراني', age: 28, cityAr: 'مكة' },
    { displayName: 'فاطمة الخالدي', age: 41, cityAr: 'الخبر' },
  ],
  khiffabiotic: [
    { displayName: 'نور السبيعي', age: 34, cityAr: 'الرياض' },
    { displayName: 'هدى الفهد', age: 27, cityAr: 'جدة' },
    { displayName: 'لينا الرشيد', age: 38, cityAr: 'الطائف' },
    { displayName: 'أمل الحربي', age: 31, cityAr: 'بريدة' },
    { displayName: 'شهد المطيري', age: 36, cityAr: 'المدينة' },
  ],
  laylmag: [
    { displayName: 'عبير المالكي', age: 33, cityAr: 'الرياض' },
    { displayName: 'ديما الحسن', age: 30, cityAr: 'جدة' },
    { displayName: 'شيماء العنزي', age: 37, cityAr: 'الدمام' },
    { displayName: 'رغد الأحمد', age: 42, cityAr: 'أبها' },
    { displayName: 'لمياء إبراهيم', age: 29, cityAr: 'تبوك' },
  ],
  'quwwat-sha3r': [
    { displayName: 'ريم الشمري', age: 31, cityAr: 'الرياض' },
    { displayName: 'منى العتيبي', age: 28, cityAr: 'جدة' },
    { displayName: 'هند المطيري', age: 39, cityAr: 'الخبر' },
    { displayName: 'سلوى الأحمد', age: 34, cityAr: 'مكة' },
    { displayName: 'دينا الحربي', age: 26, cityAr: 'نجران' },
  ],
  wudouh: [
    { displayName: 'لينا الحسن', age: 27, cityAr: 'جدة' },
    { displayName: 'جود الأسمري', age: 33, cityAr: 'الرياض' },
    { displayName: 'سلمى الرشيد', age: 35, cityAr: 'الدمام' },
    { displayName: 'مها السبيعي', age: 24, cityAr: 'الطائف' },
    { displayName: 'رنا الفهد', age: 30, cityAr: 'المدينة' },
  ],
  'shahr-hadi': [
    { displayName: 'فاطمة النجار', age: 29, cityAr: 'الرياض' },
    { displayName: 'أمل الخالد', age: 34, cityAr: 'جدة' },
    { displayName: 'نورة الدوسري', age: 31, cityAr: 'الخبر' },
    { displayName: 'هالة المالكي', age: 38, cityAr: 'أبها' },
    { displayName: 'وئام العتيبي', age: 27, cityAr: 'بريدة' },
  ],
}

export function getTestimonialMeta(productId: string, index: number): PdpTestimonialMeta | null {
  const list = PDP_TESTIMONIAL_META[productId]
  return list?.[index] ?? null
}
