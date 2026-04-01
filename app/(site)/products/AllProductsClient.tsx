'use client'
import React, { useState, useMemo } from 'react'
import { Search, Menu, X, ChevronDown, SlidersHorizontal, RotateCcw } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'

export default function AllProductsClient({ products, company }: { products: any[], company: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOrigin, setFilterOrigin] = useState('All')
  const [filterTexture, setFilterTexture] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Options from your request
  const origins = ['All', 'Brazilian', 'Peruvian', 'Chinese', 'Malaysian']
  const textures = ['All', 'Straight', 'Natural Wave', 'Body Wave', 'Classic Wave', 'Deep Wave', 'Curly Wave']
  const types = ['All', ...Array.from(new Set(products.map(p => p.hairType).filter(Boolean)))]

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesOrigin = filterOrigin === 'All' || p.origin === filterOrigin
      const matchesTexture = filterTexture === 'All' || p.texture === filterTexture
      const matchesType = filterType === 'All' || p.hairType === filterType
      return matchesSearch && matchesOrigin && matchesTexture && matchesType
    })
  }, [searchTerm, filterOrigin, filterTexture, filterType, products])

  const resetFilters = () => {
    setFilterOrigin('All')
    setFilterTexture('All')
    setFilterType('All')
    setSearchTerm('')
    setIsSidebarOpen(false)
  }

  const selectClass = "appearance-none w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-sm text-white focus:border-[#C5A059] outline-none transition-all cursor-pointer";

  return (
    <div className="space-y-12 relative">
      
      {/* --- TOP BAR (Search + Sambusa Icon) --- */}
      <div className="flex gap-4 items-center bg-zinc-900/40 p-4 md:p-6 rounded-[2rem] border border-white/5 backdrop-blur-md sticky top-24 z-30">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search collections..."
            className="w-full bg-black border border-white/10 rounded-2xl py-3 md:py-4 pl-12 pr-4 text-sm text-white focus:border-[#C5A059] outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Mobile Filter Trigger (Sambusa Icon) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 bg-[#C5A059] text-black px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Quick Filters (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-4">
           <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-4">Filter by:</div>
           <select value={filterOrigin} onChange={(e)=>setFilterOrigin(e.target.value)} className="bg-transparent border-none text-white text-xs font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-[#C5A059]">
              {origins.map(o => <option key={o} value={o} className="bg-black">{o === 'All' ? 'Origin' : o}</option>)}
           </select>
           <select value={filterTexture} onChange={(e)=>setFilterTexture(e.target.value)} className="bg-transparent border-none text-white text-xs font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-[#C5A059]">
              {textures.map(t => <option key={t} value={t} className="bg-black">{t === 'All' ? 'Texture' : t}</option>)}
           </select>
           {searchTerm || filterOrigin !== 'All' || filterTexture !== 'All' ? (
             <button onClick={resetFilters} className="text-[#C5A059]"><RotateCcw size={16}/></button>
           ) : null}
        </div>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Drawer Content */}
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#0A0A0A] border-l border-white/10 p-8 shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white font-serif text-2xl italic">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-white">
              <X size={28} />
            </button>
          </div>

          <div className="space-y-10">
            {/* Origin Filter */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-black">Origin</label>
              <div className="grid grid-cols-2 gap-2">
                {origins.map(o => (
                  <button 
                    key={o} 
                    onClick={() => setFilterOrigin(o)}
                    className={`py-3 px-2 rounded-xl text-[10px] uppercase tracking-widest border transition-all ${filterOrigin === o ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Texture Filter */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-black">Texture</label>
              <div className="flex flex-wrap gap-2">
                {textures.map(t => (
                  <button 
                    key={t} 
                    onClick={() => setFilterTexture(t)}
                    className={`py-2 px-4 rounded-full text-[9px] uppercase tracking-widest border transition-all ${filterTexture === t ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={resetFilters}
              className="w-full py-5 border border-white/10 rounded-2xl text-white text-xs uppercase tracking-[0.4em] font-bold mt-10 hover:bg-white/5 transition-all flex items-center justify-center gap-3"
            >
              <RotateCcw size={16} /> Reset All
            </button>
          </div>
        </div>
      </div>

         {/* --- RESULTS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8 rounded-[2rem] border border-white/5 relative shadow-2xl">
              
              {/* --- LARGE ATTRACTIVE SALE BADGE --- */}
              {product.isOnSale && (
                <div className="absolute top-5 left-5 z-20 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                  Sale
                </div>
              )}

              <img 
                src={product.images[0]?.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={product.name}
              />
              
              <div className="absolute top-5 right-5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-[#C5A059]/30 text-[8px] text-[#C5A059] uppercase tracking-widest font-black">
                {product.origin}
              </div>
            </div>

            <div className="space-y-3 px-2">
                <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black opacity-80">
                    {product.texture}
                </span>
                
                <h3 className="text-white text-xl font-serif italic group-hover:text-[#C5A059] transition-colors leading-tight">
                    {product.name}
                </h3>
                
                {/* --- BIG VISIBLE PRICE --- */}
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-white text-2xl font-serif font-medium">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  
                  {product.isOnSale && product.previousPrice && (
                    <p className="text-zinc-600 text-sm line-through decoration-red-600/40 italic font-light">
                      ${(product.previousPrice / 100).toFixed(2)}
                    </p>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS STATE */}
      {filteredProducts.length === 0 && (
        <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem]">
          <p className="text-gray-600 font-serif text-2xl italic tracking-widest">No matching pieces in our vault...</p>
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