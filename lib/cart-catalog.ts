/**
 * Slim catalog for cart / checkout / upsell — avoids pulling the full `products.ts`
 * FAQ + PDP copy (~90KB+) into the purchase chunk.
 */

export type CartProduct = {
  id: string
  nameAr: string
  subtitleAr: string
  availability: 'in_stock' | 'sold_out'
  coverImage: string
  coverWidth: number
  coverHeight: number
  accentColor: string
  bgColor: string
}

const CART_PRODUCTS: CartProduct[] = [
  {
    id: 'rawnaq-c',
    nameAr: 'رونق C',
    subtitleAr: 'علكات كولاجين للبشرة والشعر والأظافر',
    availability: 'in_stock',
    coverImage: '/products/home-rawnaq-c.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#b8485c',
    bgColor: '#f1e6e4',
  },
  {
    id: 'shahr-hadi',
    nameAr: 'شهر هادئ',
    subtitleAr: 'مسحوق مع مكيال لدعم أيام الدورة',
    availability: 'in_stock',
    coverImage: '/products/shahr-hadi-powder.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#8E6C8E',
    bgColor: '#F0E9F0',
  },
  {
    id: 'naseej',
    nameAr: 'نسيج',
    subtitleAr: 'مسحوق كولاجين متعدد لقوام الوجه',
    availability: 'in_stock',
    coverImage: '/products/naseej-powder.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#6B4C7A',
    bgColor: '#F3EEF5',
  },
  {
    id: 'vitaflow',
    nameAr: 'فيتا فلو',
    subtitleAr: 'مسحوق طاقة بنكهة الكراميل',
    availability: 'in_stock',
    coverImage: '/products/vitaflow-powder.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#B8784A',
    bgColor: '#F7F0E8',
  },
  {
    id: 'laylmag',
    nameAr: 'ليل ماغ',
    subtitleAr: 'مسحوق مغنيسيوم للنوم',
    availability: 'sold_out',
    coverImage: '/products/laylmag-powder.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#5B6B8C',
    bgColor: '#EEF1F6',
  },
  {
    id: 'wudouh',
    nameAr: 'وضوح',
    subtitleAr: 'علكات تركيز ووضوح',
    availability: 'sold_out',
    coverImage: '/products/wudouh-product.png',
    coverWidth: 800,
    coverHeight: 800,
    accentColor: '#4A7C6F',
    bgColor: '#EAF3F0',
  },
]

export const CART_CATALOG: CartProduct[] = CART_PRODUCTS

export function getCartProductById(id: string): CartProduct | undefined {
  return CART_PRODUCTS.find((p) => p.id === id)
}

export function isCartProductAvailable(
  product: CartProduct | undefined | null,
): product is CartProduct {
  return product?.availability === 'in_stock'
}

export function getBestUpsell(cartProductIds: string[]): CartProduct | null {
  const all = CART_PRODUCTS.filter(isCartProductAvailable).map((p) => p.id)
  const missing = all.filter((id) => !cartProductIds.includes(id))
  if (missing.length === 0) return null
  if (cartProductIds.includes('rawnaq-c') && missing.includes('naseej'))
    return getCartProductById('naseej') ?? null
  if (cartProductIds.includes('naseej') && missing.includes('rawnaq-c'))
    return getCartProductById('rawnaq-c') ?? null
  if (cartProductIds.includes('vitaflow') && missing.includes('laylmag'))
    return getCartProductById('laylmag') ?? null
  if (cartProductIds.includes('laylmag') && missing.includes('vitaflow'))
    return getCartProductById('vitaflow') ?? null
  if (cartProductIds.includes('rawnaq-c') && missing.includes('shahr-hadi'))
    return getCartProductById('shahr-hadi') ?? null
  if (cartProductIds.includes('shahr-hadi') && missing.includes('rawnaq-c'))
    return getCartProductById('rawnaq-c') ?? null
  if (cartProductIds.includes('naseej') && missing.includes('shahr-hadi'))
    return getCartProductById('shahr-hadi') ?? null
  if (cartProductIds.includes('shahr-hadi') && missing.includes('naseej'))
    return getCartProductById('naseej') ?? null
  if (cartProductIds.includes('vitaflow') && missing.includes('rawnaq-c'))
    return getCartProductById('rawnaq-c') ?? null
  return getCartProductById(missing[0]) ?? null
}
