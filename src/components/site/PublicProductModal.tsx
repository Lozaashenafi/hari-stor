'use client'
import React, { useState } from 'react'
import { X, MessageCircle, ChevronLeft, ChevronRight, Palette, Ruler } from 'lucide-react'

export default function PublicProductModal({ product, company, onClose }: { product: any, company: any, onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  
  // 1. New States to track selection
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedInch, setSelectedInch] = useState<string | null>(null)

  if (!product) return null

  const images = product.images || []
  const colors = product.colors || [] 
  const inches = product.inches || []
  
  const whatsappNumber = company?.whatsapp?.replace(/\D/g, '') || ''

  // 2. Generate Dynamic WhatsApp Message
  const generateWhatsAppLink = () => {
    const baseUrl = `https://wa.me/${whatsappNumber}`
    const intro = `Hi ShallyLuxe! ✨%0A%0AI am interested in ordering the following:%0A%0A`
    const itemName = `*Product:* ${product.name}%0A`
    const colorPart = selectedColor ? `*Color:* ${selectedColor}%0A` : `*Color:* Not selected%0A`
    const inchPart = selectedInch ? `*Length:* ${selectedInch}"%0A` : `*Length:* Not selected%0A`
    const footer = `%0APlease let me know the availability and total price.`
    
    return `${baseUrl}?text=${intro}${itemName}${colorPart}${inchPart}${footer}`
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-[110] bg-black/50 p-2 rounded-full transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[95vh] md:max-h-[85vh]">
          
          {/* LEFT: IMAGE CAROUSEL */}
          <div className="w-full md:w-1/2 relative bg-zinc-950 flex flex-col border-b md:border-b-0 md:border-r border-white/5">
            <div className="relative flex-1 min-h-[350px] md:min-h-0 overflow-hidden">
              <img 
                src={images[activeImage]?.imageUrl} 
                className="w-full h-full object-cover transition-all duration-500" 
                alt={product.name} 
              />

              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-[#C5A059] hover:text-black transition-all backdrop-blur-sm"><ChevronLeft size={24} /></button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-[#C5A059] hover:text-black transition-all backdrop-blur-sm"><ChevronRight size={24} /></button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 p-4 bg-black/50 border-t border-white/5 overflow-x-auto no-scrollbar">
                {images.map((img: any, idx: number) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-[#C5A059]' : 'border-transparent opacity-50'}`}>
                    <img src={img.imageUrl} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0A0A0A] to-black overflow-y-auto custom-scrollbar">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-black">{product.hairType || 'Premium Piece'}</span>
                  <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter">
                    {product.availability === 'in_hand' ? 'In Stock' : 'Pre-Order'}
                  </span>
                </div>
                <h2 className="font-serif text-4xl text-white mb-2 italic leading-tight">{product.name}</h2>
                <p className="text-[#C5A059] font-serif text-2xl font-light italic">${(product.price / 100).toFixed(2)}</p>
              </div>

              {/* SPEC GRID */}
              <div className="grid grid-cols-2 gap-y-6 border-y border-white/5 py-8">
                 <InfoRow label="Origin" value={product.origin} />
                 <InfoRow label="Texture" value={product.texture} />
                 <InfoRow label="Processing" value={product.processing} />
                 <InfoRow label="Options" value={product.options} />
              </div>

              {/* 3. INTERACTIVE COLORS SECTION */}
              {colors.length > 0 && (
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                    <Palette size={12} className="text-[#C5A059]" /> Select Color
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c: any) => (
                      <button 
                        key={c.id} 
                        onClick={() => setSelectedColor(c.color)}
                        className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-widest transition-all border ${
                          selectedColor === c.color 
                          ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold shadow-lg shadow-gold/20' 
                          : 'bg-zinc-900 border-white/10 text-gray-400 hover:border-gray-500'
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
                    <Ruler size={12} className="text-[#C5A059]" /> Select Length
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inches.map((i: any) => (
                      <button 
                        key={i.id} 
                        onClick={() => setSelectedInch(i.inches.toString())}
                        className={`px-5 py-2 text-[11px] transition-all border ${
                          selectedInch === i.inches.toString() 
                          ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold' 
                          : 'border-white/10 text-white hover:border-gray-500'
                        }`}
                      >
                        {i.inches}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. CALL TO ACTION WITH DYNAMIC MESSAGE */}
            <div className="mt-12 space-y-4">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                className={`w-full font-black py-5 text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl ${
                  selectedColor && selectedInch 
                  ? 'bg-[#C5A059] text-black shadow-gold/10' 
                  : 'bg-zinc-800 text-zinc-500 border border-white/5 grayscale'
                }`}
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
              
              {/* Optional selection hint */}
              {(!selectedColor || !selectedInch) && (
                <p className="text-[9px] text-red-400/60 text-center uppercase tracking-widest">
                   Please select a color and length to proceed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">{label}</span>
      <span className="text-white text-sm font-medium">{value || 'Natural'}</span>
    </div>
  )
}