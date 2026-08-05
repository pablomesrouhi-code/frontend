/** بيانات عرض إضافية للتقييمات — أسلوب المتاجر المعروفة (اسم + عمر + مدينة + صورة دائرية فريدة) */

export type PdpTestimonialMeta = {
  displayName: string
  age?: number
  cityAr?: string
  /** صورة أفاتار صغيرة (~176px) — كل تقييم له صورة مختلفة بدون تكرار */
  avatarSrc?: string
}

const A = (n: number) => `/products/reviews/avatars/a${String(n).padStart(2, '0')}.webp`
const R = (n: number) => `/products/reviews/avatars/r${String(n).padStart(2, '0')}.webp`

/**
 * كل صورة تُستخدم مرة واحدة فقط عبر كل المنتجات (ما كاينش تكرار).
 * rawnaq → r01–r05 · الباقي → a01–a35
 */
export const PDP_TESTIMONIAL_META: Record<string, PdpTestimonialMeta[]> = {
  'rawnaq-c': [
    { displayName: 'سارة العتيبي', age: 32, cityAr: 'الرياض', avatarSrc: R(1) },
    { displayName: 'ريم القحطاني', age: 29, cityAr: 'جدة', avatarSrc: R(2) },
    { displayName: 'منى الدوسري', age: 35, cityAr: 'الدمام', avatarSrc: R(3) },
    { displayName: 'ليلى الشهراني', age: 28, cityAr: 'مكة', avatarSrc: R(4) },
    { displayName: 'فاطمة الخالدي', age: 41, cityAr: 'الخبر', avatarSrc: R(5) },
  ],
  'shahr-hadi': [
    { displayName: 'فاطمة النجار', age: 29, cityAr: 'الرياض', avatarSrc: A(1) },
    { displayName: 'أمل الخالد', age: 34, cityAr: 'جدة', avatarSrc: A(2) },
    { displayName: 'نورة الدوسري', age: 31, cityAr: 'الخبر', avatarSrc: A(3) },
    { displayName: 'هالة المالكي', age: 38, cityAr: 'أبها', avatarSrc: A(4) },
    { displayName: 'وئام العتيبي', age: 27, cityAr: 'بريدة', avatarSrc: A(5) },
  ],
  naseej: [
    { displayName: 'هند السلمي', age: 33, cityAr: 'الرياض', avatarSrc: A(6) },
    { displayName: 'لمى العتيبي', age: 29, cityAr: 'جدة', avatarSrc: A(7) },
    { displayName: 'ريم الكعبي', age: 36, cityAr: 'الدمام', avatarSrc: A(8) },
    { displayName: 'جود الشمري', age: 28, cityAr: 'مكة', avatarSrc: A(9) },
    { displayName: 'سارة الفهد', age: 31, cityAr: 'الطائف', avatarSrc: A(10) },
  ],
  vitaflow: [
    { displayName: 'نورة الشمري', age: 28, cityAr: 'الرياض', avatarSrc: A(11) },
    { displayName: 'هدى العتيبي', age: 31, cityAr: 'جدة', avatarSrc: A(12) },
    { displayName: 'لينا المالكي', age: 26, cityAr: 'الخبر', avatarSrc: A(13) },
    { displayName: 'مها الدوسري', age: 34, cityAr: 'الدمام', avatarSrc: A(14) },
    { displayName: 'رغد الحربي', age: 29, cityAr: 'المدينة', avatarSrc: A(15) },
  ],
  laylmag: [
    { displayName: 'عبير المالكي', age: 33, cityAr: 'الرياض', avatarSrc: A(16) },
    { displayName: 'ديما الحسن', age: 30, cityAr: 'جدة', avatarSrc: A(17) },
    { displayName: 'شيماء العنزي', age: 37, cityAr: 'الدمام', avatarSrc: A(18) },
    { displayName: 'رغد الأحمد', age: 42, cityAr: 'أبها', avatarSrc: A(19) },
    { displayName: 'لمياء إبراهيم', age: 29, cityAr: 'تبوك', avatarSrc: A(20) },
  ],
  wudouh: [
    { displayName: 'لينا الحسن', age: 27, cityAr: 'جدة', avatarSrc: A(21) },
    { displayName: 'جود الأسمري', age: 33, cityAr: 'الرياض', avatarSrc: A(22) },
    { displayName: 'سلمى الرشيد', age: 35, cityAr: 'الدمام', avatarSrc: A(23) },
    { displayName: 'مها السبيعي', age: 24, cityAr: 'الطائف', avatarSrc: A(24) },
    { displayName: 'رنا الفهد', age: 30, cityAr: 'المدينة', avatarSrc: A(25) },
  ],
  khiffabiotic: [
    { displayName: 'نور السبيعي', age: 34, cityAr: 'الرياض', avatarSrc: A(26) },
    { displayName: 'هدى الفهد', age: 27, cityAr: 'جدة', avatarSrc: A(27) },
    { displayName: 'لينا الرشيد', age: 38, cityAr: 'الطائف', avatarSrc: A(28) },
    { displayName: 'أمل الحربي', age: 31, cityAr: 'بريدة', avatarSrc: A(29) },
    { displayName: 'شهد المطيري', age: 36, cityAr: 'المدينة', avatarSrc: A(30) },
  ],
  'quwwat-sha3r': [
    { displayName: 'ريم الشمري', age: 31, cityAr: 'الرياض', avatarSrc: A(31) },
    { displayName: 'منى العتيبي', age: 28, cityAr: 'جدة', avatarSrc: A(32) },
    { displayName: 'هند المطيري', age: 39, cityAr: 'الخبر', avatarSrc: A(33) },
    { displayName: 'سلوى الأحمد', age: 34, cityAr: 'مكة', avatarSrc: A(34) },
    { displayName: 'دينا الحربي', age: 26, cityAr: 'نجران', avatarSrc: A(35) },
  ],
}

export function getTestimonialMeta(productId: string, index: number): PdpTestimonialMeta | null {
  const list = PDP_TESTIMONIAL_META[productId]
  return list?.[index] ?? null
}
