'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  productId: string
  offerQty: 1 | 2 | 3
  price: number
  nameAr: string
  accentColor: string
  bgColor: string
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, offerQty: 1 | 2 | 3, price: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, offerQty: item.offerQty, price: item.price }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }))
      },
      updateQty: (productId, offerQty, price) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, offerQty, price } : i
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
    }),
    { name: 'nabtalabo-cart' }
  )
)
