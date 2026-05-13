import { createBrandOgImageResponse } from '@/lib/brand-og-image'

export const alt = 'شعار نبتة لابو — مكمّل غذائي على شكل علكة'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return createBrandOgImageResponse()
}
