'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function CartButton({ whatsapp }: { whatsapp: string }) {
  const { count, setOpen } = useCart()
  const [mounted, setMounted] = useState(false)

  // Portal target only exists on the client
  useEffect(() => setMounted(true), [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open shopping bag, ${count} items`}
        className="relative text-[#C5A059] hover:text-white transition p-1"
      >
        <ShoppingCart className="cursor-pointer" size={20} />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
      {/* Rendered through a portal so the drawer escapes the navbar's
          stacking context (z-50) and always appears above overlays like
          the product modal (z-100). */}
      {mounted && createPortal(<CartDrawer whatsapp={whatsapp} />, document.body)}
    </>
  )
}
