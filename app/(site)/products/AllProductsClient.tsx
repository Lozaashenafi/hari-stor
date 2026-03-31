'use client'
import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'

export default function AllProductsClient({ products, company }: { products: any[], company: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Get unique hair types for the filter buttons
  const types = ['All', ...Array.from(new Set(products.map(p => p.hairType).filter(Boolean)))]

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || p.hairType === filterType
      return matchesSearch && matchesType
    })
  }, [searchTerm, filterType, products])

  return (
    <div className="space-y-12">
      {/* SEARCH & FILTER BAR */}
     
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search our vault..."
            className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#C5A059] outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                filterType === type 
                ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                : 'bg-transparent text-gray-400 border-white/10 hover:border-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 border border-white/5 rounded-2xl">
              <img 
                src={product.images[0]?.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={product.name}
              />
            </div>
            <span className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-bold block mb-2">{product.hairType}</span>
            <h3 className="text-white text-lg font-serif italic mb-1 group-hover:text-[#C5A059] transition-colors">{product.name}</h3>
            <p className="text-gray-400 text-sm font-light">${(product.price / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* NO RESULTS STATE */}
      {filteredProducts.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-600 font-serif text-2xl italic">No hair matches your search criteria...</p>
        </div>
      )}

      {/* Detail Popup */}
      {selectedProduct && (
        <PublicProductModal 
          product={selectedProduct} 
          company={company}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}