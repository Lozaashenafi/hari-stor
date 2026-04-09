'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import PublicProductModal from './PublicProductModal'
import { ArrowRight } from 'lucide-react'

export default function ProductSection({ products, company }: { products: any[], company: any }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  
  // Displaying only the first 4 products to match the grid style of the collection pages
  const featuredProducts = products.slice(0, 4)

  return (
    <section id="products" className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#C5A059]/10 pb-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C5A059] block">
               Premium Collections
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-white uppercase tracking-wider">
              The Essentials
            </h2>
          </div>
          
          <Link 
            href="/products" 
            className="group flex items-center gap-3 text-[#C5A059] hover:text-white transition-all uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 relative border border-white/5 shadow-xl transition-all">
                
                {/* Clean Sale Badge */}
                {product.isOnSale && (
                  <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    SALE
                  </div>
                )}
                
                <img 
                  src={product.images[0]?.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left space-y-2">
                <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-bold">
                   {product.category?.name || product.hairType}
                </span>
                
                <h3 className="text-white text-sm font-medium tracking-tight h-10 overflow-hidden leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <p className="text-white text-sm font-bold">
                    from ${(product.price / 100).toFixed(2)}
                  </p>
                  
                  {product.isOnSale && product.previousPrice && (
                    <p className="text-zinc-500 text-xs line-through italic">
                      ${(product.previousPrice / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-16 text-center md:hidden">
            <Link 
                href="/products/wigs" 
                className="inline-block px-10 py-4 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest font-bold"
            >
                View Vault
            </Link>
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