import type { Product } from '@/lib/products'
import { isPowderProduct } from '@/lib/products'

export type PdpHeroStat = { value: string; label: string }

export function getPdpHeroStats(product: Product): PdpHeroStat[] {
  const powder = isPowderProduct(product)
  return [
    { value: powder ? '30' : '60', label: powder ? 'ساشيه في العبوة' : 'علكة في العلبة' },
    { value: '30', label: 'يوم لكل عبوة' },
    { value: 'حلال', label: powder ? 'مكمّل غذائي' : 'بكتين نباتي' },
    { value: 'SFDA', label: 'مرخّصة رسمياً' },
  ]
}
