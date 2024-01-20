// Add Items
// Remove Items
// Clear the cart
// Keeps track of items in the cart
import { Product } from '@/payload-types'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

// Defines the CartItem type representing an item in the cart
export type CartItem = {
  product: Product
}

// Definition of the CartState type representing the state of the cart
type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

// Creating a Zustand store for managing cart state with persistence
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],                                            // Initial state with an empty array of items
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id
          ),  // Removing an item from the cart based on its ID
        })),
      clearCart: () => set({ items: [] }),                  // Clearing all items from the cart
    }),
    {
      name: 'cart-storage',                                 // Key for identifying the storage
      storage: createJSONStorage(() => localStorage),       // Using JSON storage with localStorage
    }
  )
)