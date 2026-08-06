/** Arabic copy for the PDP offer selector — kept in a dedicated file for encoding safety. */

export const PDP_OFFER_HEADING = 'اختاري عرضك الآن:'
export const PDP_OFFER_TAGLINE = 'قطعتين أوضح نتيجة · ثلاث قطع أوفر سعر — والدفع عند الباب'

export function formatOfferSavings(save: number): string {
  return `وفّري ${save} ريال`
}
