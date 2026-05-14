/**
 * جودة Next/Image للصور داخل الكادرات (غلاف منتج، هيرو، إلخ).
 * أعلى من الافتراضي (75) لعرض أوضح مع بقاء الأداء معقولاً.
 */
export const PRODUCT_PHOTO_QUALITY = 88

/** نسبة عرض/ارتفاع الملف — كادر يطابق الصورة فلا تبقى روافد جانبية مع object-contain */
export function coverFrameAspect(width: number, height: number): string {
  const w = Math.max(1, width)
  const h = Math.max(1, height)
  return `${w} / ${h}`
}
