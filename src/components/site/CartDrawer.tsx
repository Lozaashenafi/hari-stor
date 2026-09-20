'use client'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { buildCartWhatsAppLink, formatPriceCents } from '@/lib/cart'

export default function CartDrawer({ whatsapp }: { whatsapp: string }) {
  const { items, isOpen, setOpen, updateQty, removeItem, clear, subtotalCents, count } = useCart()

  if (!isOpen) return null

  const digits = (whatsapp || '').replace(/\D/g, '')
  const checkoutLink = digits && items.length > 0 ? buildCartWhatsAppLink(items, digits) : '#'
  const checkoutDisabled = items.length === 0 || !digits

  return (
    <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-[#C5A059]/20 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-[#C5A059] flex items-center gap-2">
            <ShoppingBag size={16} /> Your Bag ({count})
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close bag" className="p-2 text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <ShoppingBag size={40} className="text-[#C5A059]/40" />
              <p className="text-gray-400 text-sm uppercase tracking-widest">Your bag is empty</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 px-8 py-3 border border-[#C5A059] text-[#C5A059] text-[11px] uppercase tracking-widest font-bold hover:bg-[#C5A059] hover:text-black transition"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-4 bg-zinc-950/60 border border-white/5 rounded-lg p-3">
                <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded overflow-hidden">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No image</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-gray-500 text-[11px] uppercase tracking-widest mt-1">
                    {[item.color, item.inches ? `${item.inches}"` : null].filter(Boolean).join(' / ') || 'Standard'}
                  </p>
                  <p className="text-[#C5A059] text-sm font-bold mt-1">{formatPriceCents(item.unitPriceCents)}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-white/10 rounded">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        disabled={item.qty <= 1}
                        aria-label="Decrease quantity"
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-30"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        disabled={item.qty >= 99}
                        aria-label="Increase quantity"
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-30"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="p-2 text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4 bg-black">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 uppercase tracking-widest text-[11px]">Subtotal</span>
              <span className="text-white font-bold text-lg">{formatPriceCents(subtotalCents)}</span>
            </div>
            <p className="text-[11px] text-gray-500">No payment online — you confirm and pay on WhatsApp.</p>

            <a
              href={checkoutDisabled ? undefined : checkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={checkoutDisabled}
              onClick={(e) => checkoutDisabled && e.preventDefault()}
              className={`w-full font-bold py-4 text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition active:scale-[0.99] ${
                checkoutDisabled ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#C5A059] text-black hover:bg-white'
              }`}
            >
              <MessageCircle size={18} /> Order via WhatsApp
            </a>

            {items.length > 0 && !digits && (
              <p className="text-[10px] text-red-400/80 text-center uppercase tracking-widest">
                WhatsApp number not set — add it in Admin → Profile
              </p>
            )}

            <div className="flex items-center justify-between">
              <Link href="/cart" onClick={() => setOpen(false)} className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-white underline underline-offset-4">
                View full bag
              </Link>
              <button onClick={clear} className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-red-400">
                Clear bag
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
