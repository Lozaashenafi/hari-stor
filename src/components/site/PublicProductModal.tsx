'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, MessageCircle, ChevronLeft, ChevronRight, Palette, Ruler } from 'lucide-react'
import type { Product, ProductColor, ProductInch, CompanyProfile } from '@/lib/types'

export default function PublicProductModal({ product, company, onClose }: { product: Product; company?: CompanyProfile | null; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  
  // 1. States to track selection
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedInch, setSelectedInch] = useState<string | null>(null)

  // Prevent background scroll when modal is open on mobile
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  if (!product) return null

  const images = product.images || []
  const colors = product.colors || [] 
  const inches = product.inches || []
  
  const whatsappNumber = company?.whatsapp?.replace(/\D/g, '') || ''

  // --- DYNAMIC PRICE CALCULATION ---
  // Find the selected inch object to get its additionalPrice
  const selectedInchData = inches.find((i: ProductInch) => i.inches.toString() === selectedInch)
  const additionalCost = selectedInchData?.additionalPrice || 0
  const totalPrice = product.price + additionalCost
  const displayPrice = (totalPrice / 100).toFixed(2)
  // ---------------------------------

  // 2. Generate Dynamic WhatsApp Message
  const generateWhatsAppLink = () => {
    const baseUrl = `https://wa.me/${whatsappNumber}`
    const intro = `Hi ShallyLuxe! ✨%0A%0AI am interested in ordering the following:%0A%0A`
    const itemName = `*Product:* ${product.name}%0A`
    const colorPart = selectedColor ? `*Color:* ${selectedColor}%0A` : `*Color:* Not selected%0A`
    const inchPart = selectedInch ? `*Length:* ${selectedInch}"%0A` : `*Length:* Not selected%0A`
    const pricePart = `*Total Price:* $${displayPrice}%0A` // Added total price to message
    const footer = `%0APlease let me know the availability.`
    
    return `${baseUrl}?text=${intro}${itemName}${colorPart}${inchPart}${pricePart}${footer}`
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/98 md:bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0A0A0A] border-t md:border border-white/10 w-full h-full md:h-auto md:max-w-5xl md:rounded-xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* MOBILE CLOSE BUTTON (Top Right) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white z-[110] bg-black/50 p-3 rounded-full transition-colors active:scale-90"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-visible">
          
          {/* LEFT: IMAGE CAROUSEL */}
          <div className="w-full md:w-1/2 relative bg-zinc-950 flex flex-col flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5">
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:flex-1 overflow-hidden">
              {images[activeImage] && (
                <Image 
                  src={images[activeImage].imageUrl} 
                  className="object-cover transition-all duration-500" 
                  alt={product.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}

              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-4 bg-black/30 text-white rounded-full transition-all active:bg-[#5a3e00]"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-4 bg-black/30 text-white rounded-full transition-all active:bg-[#5a3e00]"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 bg-black/50 border-t border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
                {images.map((img: Product['images'][number], idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)} 
                    className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === idx ? 'border-[#5a3e00]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <Image src={img.imageUrl} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-gradient-to-br from-[#0A0A0A] to-black">
            <div className="space-y-8 flex-1">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-[10px] uppercase tracking-[0.5em] font-black">
                    {product.hairType || 'Premium Piece'}
                  </span>
                  <span className="bg-[#5a3e00]/10 text-[#5a3e00] border border-[#5a3e00]/20 px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter">
                    {product.availability === 'in_hand' ? 'In Stock' : 'Pre-Order'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-[#5a3e00] mb-2 italic leading-tight">{product.name}</h2>
                {/* DYNAMIC PRICE DISPLAY */}
                <p className="text-gray-400 font-serif text-2xl font-light italic transition-all duration-300">
                  ${displayPrice}
                </p>
              </div>

              {/* SPEC GRID */}
              <div className="grid grid-cols-2 gap-y-6 border-y border-white/5 py-6">
                 <InfoRow label="Origin" value={product.origin} />
                 <InfoRow label="Texture" value={product.texture} />
                 <InfoRow label="Processing" value={product.processing} />
                 <InfoRow label="Options" value={product.options} />
              </div>

              {/* 3. INTERACTIVE COLORS SECTION */}
              {colors.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                    <Palette size={12} className="text-[#5a3e00]" /> Select Color
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c: ProductColor) => (
                      <button 
                        key={c.id} 
                        onClick={() => setSelectedColor(c.color)}
                        className={`min-h-[44px] px-5 py-2 rounded-xl text-[11px] uppercase tracking-widest transition-all border ${
                          selectedColor === c.color 
                          ? 'bg-[#5a3e00] text-black border-[#5a3e00] font-bold' 
                          : 'bg-zinc-900 border-white/10 text-gray-400 active:border-gray-500'
                        }`}
                      >
                        {c.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. INTERACTIVE LENGTHS SECTION */}
              {inches.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                    <Ruler size={12} className="text-[#5a3e00]" /> Select Length
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inches.map((i: ProductInch) => (
                      <button 
                        key={i.id} 
                        onClick={() => setSelectedInch(i.inches.toString())}
                        className={`min-h-[44px] min-w-[50px] px-5 py-2 text-[12px] transition-all border rounded-xl ${
                          selectedInch === i.inches.toString() 
                          ? 'bg-[#5a3e00] text-black border-[#5a3e00] font-bold' 
                          : 'border-white/10 text-white active:border-gray-500'
                        }`}
                      >
                        {i.inches}&quot;
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. CALL TO ACTION */}
            <div className="mt-12 mb-8 md:mb-0 space-y-4">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                className={`w-full font-black py-5 text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                  selectedColor && selectedInch 
                  ? 'bg-[#5a3e00] text-black' 
                  : 'bg-zinc-800 text-zinc-500 border border-white/5 opacity-50'
                }`}
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </a>
              
              {(!selectedColor || !selectedInch) && (
                <p className="text-[10px] text-red-400/80 text-center uppercase tracking-widest animate-pulse">
                   Select color & length to order
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string, value?: string | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">{label}</span>
      <span className="text-[#5a3e00] text-sm font-medium leading-tight">{value || 'Natural'}</span>
    </div>
  )
}