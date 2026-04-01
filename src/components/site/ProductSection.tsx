'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import PublicProductModal from './PublicProductModal'
import { ArrowRight } from 'lucide-react'

export default function ProductSection({ products, company }: { products: any[], company: any }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="products" className="bg-[#050505] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <span className="text-[#5a3e00] text-[10px] uppercase tracking-[0.5em] font-black block mb-4">
              Featured Selection
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white italic">
              The Essentials
            </h2>
          </div>
          <Link href="/products" className="group flex items-center gap-3 text-gray-400 hover:text-[#5a3e00] transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">
            Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8 relative border border-white/5 rounded-2xl">
                
                {/* --- ATTRACTIVE RED SALE BADGE --- */}
                {product.isOnSale && (
                  <div className="absolute top-5 left-5 z-20 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse">
                    Special Offer
                  </div>
                )}
                
                <img 
                  src={product.images[0]?.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-black block mb-3">
                {product.hairType}
              </span>
              
              <h3 className="text-white text-2xl font-serif italic mb-3 group-hover:text-[#C5A059] transition-colors leading-tight">
                {product.name}
              </h3>
              
              {/* --- ENHANCED PRICE DISPLAY --- */}
              <div className="flex items-baseline gap-4">
                <p className="text-[#C5A059] text-2xl font-serif font-bold italic">
                  ${(product.price / 100).toFixed(2)}
                </p>
                
                {product.isOnSale && product.previousPrice && (
                  <p className="text-zinc-600 text-lg line-through decoration-red-600/50 font-light italic">
                    ${(product.previousPrice / 100).toFixed(2)}
                  </p>
                )}
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