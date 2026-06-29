/** Arabic copy for the PDP offer selector — kept in a dedicated file for encoding safety. */

export const PDP_OFFER_HEADING = '\u0627\u062E\u062A\u0627\u0631\u064A \u0627\u0644\u0639\u0631\u0636:'
export const PDP_OFFER_TAGLINE = '\u0646\u062A\u064A\u062C\u0629 \u0645\u0646 \u0627\u0644\u0639\u0644\u0628\u0629 \u0627\u0644\u0623\u0648\u0644\u0649'

export function formatOfferSavings(save: number): string {
  return `\u0648\u0641\u0651\u0631\u064A ${save} \u0631\u064A\u0627\u0644`
}
