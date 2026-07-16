import type { Product } from '@/lib/products'
import { isPowderProduct } from '@/lib/products'

export type PdpHeroStat = { value: string; label: string }

export function getPdpHeroStats(product: Product): PdpHeroStat[] {
  const powder = isPowderProduct(product)
  if (product.id === 'laylmag') {
    return [
      { value: '14 في 1', label: 'تركيبة مغنيسيوم متكاملة' },
      { value: 'مسحوق', label: 'عبوة قابلة لإعادة الإغلاق' },
      { value: 'توت', label: 'نكهة خفيفة في الماء' },
      { value: 'SFDA', label: 'مكمّل غذائي مرخّص' },
    ]
  }
  return [
    { value: powder ? '30' : '60', label: powder ? 'مكيال في العبوة' : 'علكة في العلبة' },
    { value: '30', label: 'يوم لكل عبوة' },
    { value: 'حلال', label: powder ? 'مكمّل غذائي' : 'بكتين نباتي' },
    { value: 'SFDA', label: 'مرخّصة رسمياً' },
  ]
}
