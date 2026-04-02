'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import PublicProductModal from './PublicProductModal'
import { ArrowRight } from 'lucide-react'

export default function ProductSection({ products, company }: { products: any[], company: any }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="products" className="relative bg-[#0a0904] py-32 px-6 border-t border-[#C5A059]/20 overflow-hidden">
      
      {/* --- INTENSE LUXURY GOLDEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Large Central Golden Radiance */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] rounded-full bg-[#5a3e00]/40 blur-[160px] opacity-60" />
        
        {/* 2. Top Header Amber Wash (Much brighter) */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#5a3e00]/60 blur-[120px]" />
        
        {/* 3. High-Gold Accents (Brighter highlights) */}
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ffd700]/20 blur-[100px]" />
        
        {/* 4. Bottom Corner Warmth */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#5a3e00]/60 blur-[120px]" />

        {/* Subtle Shimmer Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 mb-4 backdrop-blur-sm">
                <span className="text-[#C5A059] text-xs">✦</span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-[#C5A059]">
                  Curated Selection
                </span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl text-white italic leading-tight">
              The Essentials
            </h2>
          </div>
          
          <Link 
            href="/products" 
            className="group flex items-center gap-4 text-zinc-400 hover:text-[#C5A059] transition-all uppercase text-[10px] tracking-[0.4em] font-black bg-black/40 px-8 py-4 rounded-full border border-white/5 hover:border-[#C5A059]/50"
          >
            Explore Vault <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-[#C5A059]" />
          </Link>
        </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-[4/5] overflow-hidden bg-black mb-8 relative border border-white/10 rounded-[2rem] shadow-2xl transition-all group-hover:border-[#C5A059]/30">
                
                {/* --- ATTRACTIVE RED SALE BADGE --- */}
                {product.isOnSale && (
                  <div className="absolute top-6 left-6 z-20 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(220,38,38,0.3)] animate-pulse">
                    Special Offer
                  </div>
                )}
                
                <img 
                  src={product.images[0]?.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Subtle Inner Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="space-y-4 px-2">
                <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black block">
                  {product.hairType}
                </span>
                
                <h3 className="text-white text-3xl font-serif italic group-hover:text-[#C5A059] transition-colors leading-tight">
                  {product.name}
                </h3>
                
                {/* --- ENHANCED PRICE DISPLAY --- */}
                <div className="flex items-center gap-5 pt-2">
                  <p className="text-white text-3xl font-serif font-light italic">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  
                  {product.isOnSale && product.previousPrice && (
                    <p className="text-zinc-600 text-xl line-through decoration-red-600/30 font-light italic opacity-60">
                      ${(product.previousPrice / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <PublicProductModal product={selectedProduct} company={company} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  )
}