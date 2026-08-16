'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PublicProductModal from './PublicProductModal'
import { ArrowRight } from 'lucide-react'
import type { Product, CompanyProfile } from '@/lib/types'

export default function ProductSection({ products, company }: { products: Product[]; company: CompanyProfile | null }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // Displaying only the first 4 products to match the grid style of the collection pages
  const featuredProducts = products.slice(0, 4)

  return (
    <section id="products" className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#C5A059]/10 pb-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300 block">
               Premium Collections
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#C5A059] uppercase tracking-wider">
              The Essentials
            </h2>
          </div>
          
          <Link 
            href="/products" 
            className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => setSelectedProduct(product)}>
              
              {/* ON SALE Badge - Completely Outside the Image Box */}
              <div className="h-[30px] md:h-[36px] w-full flex items-end">
                {product.isOnSale && (
                  <div className="bg-[#ED2939] text-white text-[11px] md:text-[13px] font-bold px-3 py-1 md:px-4 md:py-1.5 tracking-wide w-max">
                    ON SALE
                  </div>
                )}
              </div>
              
              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-white mb-5 relative transition-all">
                {product.images[0] && (
                  <Image 
                    src={product.images[0].imageUrl} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="text-center space-y-2 px-1">
                {/* Product Title - Gold Color */}
                <h3 className="text-[#C5A059] text-[14px] md:text-[16px] font-normal leading-snug">
                  {product.name}
                </h3>
                
                {/* Price layout - Old Price Left, New Price Right */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  {product.isOnSale && product.previousPrice && (
                    <span className="text-gray-300 text-[14px] md:text-[16px] line-through">
                      ${(product.previousPrice / 100).toFixed(2)}
                    </span>
                  )}
                  
                  <span className="text-white text-[15px] md:text-[18px] font-bold">
                    ${(product.price / 100).toFixed(2)}
                  </span>
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