'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/lib/types'
import { makeCartKey, priceForSelection, type CartItem } from '@/lib/cart'

const STORAGE_KEY = 'shallyluxe-cart'

interface AddSelection {
  color: string | null
  inches: string | null
  qty?: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotalCents: number
  /** False until the cart has been loaded from localStorage on the client. */
  hydrated: boolean
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (product: Product, selection: AddSelection) => void
  removeItem: (key: string) => void
  updateQty: (key: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadInitial(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((i) => i && typeof i.key === 'string' && typeof i.qty === 'number')
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load once on mount (avoids SSR mismatch)
  useEffect(() => {
    setItems(loadInitial())
    setHydrated(true)
  }, [])

  // Persist on change
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage full / private mode — cart still works in memory
    }
  }, [items, hydrated])

  const addItem = useCallback((product: Product, selection: AddSelection) => {
    const color = selection.color ?? null
    const inches = selection.inches ?? null
    const qty = Math.max(1, Math.min(99, selection.qty ?? 1))
    const key = makeCartKey(product.id, color, inches)
    const unitPriceCents = priceForSelection(product, inches)
    const imageUrl = product.images?.[0]?.imageUrl ?? null

    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(99, i.qty + qty), unitPriceCents } : i
        )
      }
      return [
        ...prev,
        { key, productId: product.id, name: product.name, imageUrl, color, inches, unitPriceCents, qty },
      ]
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    const next = Math.max(1, Math.min(99, Math.floor(qty) || 1))
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: next } : i)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const { count, subtotalCents } = useMemo(() => {
    return {
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotalCents: items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0),
    }
  }, [items])

  const value = useMemo(
    () => ({ items, count, subtotalCents, hydrated, isOpen, setOpen, addItem, removeItem, updateQty, clear }),
    [items, count, subtotalCents, hydrated, isOpen, addItem, removeItem, updateQty, clear]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
