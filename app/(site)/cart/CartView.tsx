'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { buildCartWhatsAppLink, formatPriceCents } from '@/lib/cart'

export default function CartView({ whatsapp }: { whatsapp: string }) {
  const { items, hydrated, count, subtotalCents, updateQty, removeItem, clear } = useCart()

  const digits = (whatsapp || '').replace(/\D/g, '')
  const checkoutLink = digits && items.length > 0 ? buildCartWhatsAppLink(items, digits) : '#'
  const checkoutDisabled = items.length === 0 || !digits

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-serif text-[#C5A059] uppercase tracking-widest italic mb-12">
        {hydrated && count > 0 ? `Your Bag (${count})` : 'Your Bag'}
      </h1>

      {!hydrated ? (
        /* Avoids flashing "empty bag" before localStorage is read */
        <div className="space-y-4 animate-pulse">
          <div className="h-32 bg-zinc-900/60 rounded-lg" />
          <div className="h-32 bg-zinc-900/60 rounded-lg" />
        </div>
      ) : items.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-5 border border-white/5 bg-zinc-950/50">
          <ShoppingBag size={48} className="text-[#C5A059]/40" />
          <p className="text-gray-400 text-sm uppercase tracking-widest">Your bag is empty</p>
          <Link
            href="/products"
            className="px-8 py-3 border border-[#C5A059] text-[#C5A059] text-[11px] uppercase tracking-widest font-bold hover:bg-[#C5A059] hover:text-black transition"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.key} className="flex gap-5 bg-zinc-950/60 border border-white/5 rounded-lg p-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded overflow-hidden">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill sizes="128px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No image</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-white text-sm md:text-base font-medium">{item.name}</p>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-gray-500 text-[11px] uppercase tracking-widest mt-1">
                    {[item.color, item.inches ? `${item.inches}"` : null].filter(Boolean).join(' / ') || 'Standard'}
                  </p>
                  <p className="text-[#C5A059] text-sm font-bold mt-1">{formatPriceCents(item.unitPriceCents)}</p>

                  <div className="flex items-center justify-between mt-3">
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
                    <p className="text-white text-sm font-bold">
                      {formatPriceCents(item.unitPriceCents * item.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clear}
              className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-red-400 transition"
            >
              Clear bag
            </button>
          </div>

          {/* SUMMARY */}
          <aside className="lg:sticky lg:top-8 h-max border border-white/10 bg-black p-6 space-y-5">
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-[#C5A059]">Order Summary</h2>

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

            <Link
              href="/products"
              className="block text-center text-[11px] uppercase tracking-widest text-gray-400 hover:text-white underline underline-offset-4"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
