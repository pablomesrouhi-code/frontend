/** بيانات عرض إضافية للتقييمات — أسلوب المتاجر المعروفة (اسم + عمر + مدينة + صورة دائرية صغيرة) */

export type PdpTestimonialMeta = {
  displayName: string
  age?: number
  cityAr?: string
  /** صورة أفاتار صغيرة (~176px) داخل الدائرة بجانب الاسم */
  avatarSrc?: string
}

const A = (n: number) => `/products/reviews/avatars/a${String(n).padStart(2, '0')}.webp`
const R = (n: number) => `/products/reviews/avatars/r${String(n).padStart(2, '0')}.webp`

export const PDP_TESTIMONIAL_META: Record<string, PdpTestimonialMeta[]> = {
  'rawnaq-c': [
    { displayName: 'سارة العتيبي', age: 32, cityAr: 'الرياض', avatarSrc: R(1) },
    { displayName: 'ريم القحطاني', age: 29, cityAr: 'جدة', avatarSrc: R(2) },
    { displayName: 'منى الدوسري', age: 35, cityAr: 'الدمام', avatarSrc: R(3) },
    { displayName: 'ليلى الشهراني', age: 28, cityAr: 'مكة', avatarSrc: R(4) },
    { displayName: 'فاطمة الخالدي', age: 41, cityAr: 'الخبر', avatarSrc: R(5) },
  ],
  khiffabiotic: [
    { displayName: 'نور السبيعي', age: 34, cityAr: 'الرياض', avatarSrc: A(1) },
    { displayName: 'هدى الفهد', age: 27, cityAr: 'جدة', avatarSrc: A(2) },
    { displayName: 'لينا الرشيد', age: 38, cityAr: 'الطائف', avatarSrc: A(3) },
    { displayName: 'أمل الحربي', age: 31, cityAr: 'بريدة', avatarSrc: A(4) },
    { displayName: 'شهد المطيري', age: 36, cityAr: 'المدينة', avatarSrc: A(5) },
  ],
  laylmag: [
    { displayName: 'عبير المالكي', age: 33, cityAr: 'الرياض', avatarSrc: A(6) },
    { displayName: 'ديما الحسن', age: 30, cityAr: 'جدة', avatarSrc: A(7) },
    { displayName: 'شيماء العنزي', age: 37, cityAr: 'الدمام', avatarSrc: A(8) },
    { displayName: 'رغد الأحمد', age: 42, cityAr: 'أبها', avatarSrc: A(9) },
    { displayName: 'لمياء إبراهيم', age: 29, cityAr: 'تبوك', avatarSrc: A(10) },
  ],
  'quwwat-sha3r': [
    { displayName: 'ريم الشمري', age: 31, cityAr: 'الرياض', avatarSrc: A(11) },
    { displayName: 'منى العتيبي', age: 28, cityAr: 'جدة', avatarSrc: A(12) },
    { displayName: 'هند المطيري', age: 39, cityAr: 'الخبر', avatarSrc: A(1) },
    { displayName: 'سلوى الأحمد', age: 34, cityAr: 'مكة', avatarSrc: A(3) },
    { displayName: 'دينا الحربي', age: 26, cityAr: 'نجران', avatarSrc: A(5) },
  ],
  wudouh: [
    { displayName: 'لينا الحسن', age: 27, cityAr: 'جدة', avatarSrc: A(2) },
    { displayName: 'جود الأسمري', age: 33, cityAr: 'الرياض', avatarSrc: A(4) },
    { displayName: 'سلمى الرشيد', age: 35, cityAr: 'الدمام', avatarSrc: A(6) },
    { displayName: 'مها السبيعي', age: 24, cityAr: 'الطائف', avatarSrc: A(8) },
    { displayName: 'رنا الفهد', age: 30, cityAr: 'المدينة', avatarSrc: A(10) },
  ],
  'shahr-hadi': [
    { displayName: 'فاطمة النجار', age: 29, cityAr: 'الرياض', avatarSrc: A(7) },
    { displayName: 'أمل الخالد', age: 34, cityAr: 'جدة', avatarSrc: A(9) },
    { displayName: 'نورة الدوسري', age: 31, cityAr: 'الخبر', avatarSrc: A(11) },
    { displayName: 'هالة المالكي', age: 38, cityAr: 'أبها', avatarSrc: A(12) },
    { displayName: 'وئام العتيبي', age: 27, cityAr: 'بريدة', avatarSrc: A(2) },
  ],
  naseej: [
    { displayName: 'هند السلمي', age: 33, cityAr: 'الرياض', avatarSrc: A(3) },
    { displayName: 'لمى العتيبي', age: 29, cityAr: 'جدة', avatarSrc: A(5) },
    { displayName: 'ريم الكعبي', age: 36, cityAr: 'الدمام', avatarSrc: A(8) },
  ],
  vitaflow: [
    { displayName: 'نورة الشمري', age: 28, cityAr: 'الرياض', avatarSrc: A(4) },
    { displayName: 'هدى العتيبي', age: 31, cityAr: 'جدة', avatarSrc: A(6) },
    { displayName: 'لينا المالكي', age: 26, cityAr: 'الخبر', avatarSrc: A(10) },
  ],
}

export function getTestimonialMeta(productId: string, index: number): PdpTestimonialMeta | null {
  const list = PDP_TESTIMONIAL_META[productId]
  return list?.[index] ?? null
}
