'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import PublicProductModal from './PublicProductModal'
import { ArrowRight } from 'lucide-react'

export default function ProductSection({ products, company }: { products: any[], company: any }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  
  // Show only first 3 products for the "Luxe" landing look
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="products" className="bg-[#050505] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-black block mb-4">
              Featured Selection
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white italic">
              The Essentials
            </h2>
          </div>
          
          <Link href="/products" className="group flex items-center gap-3 text-gray-400 hover:text-[#C5A059] transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">
            Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 relative border border-white/5">
                <img 
                  src={product.images[0]?.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <span className="text-gray-500 text-[9px] uppercase tracking-[0.4em] font-black block mb-2">{product.hairType}</span>
              <h3 className="text-white text-xl font-serif italic mb-1">{product.name}</h3>
              <p className="text-[#C5A059] text-sm font-light italic">From ${(product.price / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <PublicProductModal 
          product={selectedProduct} 
          company={company}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  )
}