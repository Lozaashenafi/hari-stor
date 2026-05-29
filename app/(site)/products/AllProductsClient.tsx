'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'

export default function AllProductsClient({ products, company, categoryName }: { products: any[], company: any, categoryName?: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('featured')
  const [filterType, setFilterType] = useState(categoryName || 'All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4 // 12 items = 3 rows of 4 on desktop, 6 rows of 2 on mobile
  const gridTopRef = useRef<HTMLDivElement>(null)

  // Banner Mapping
  const categoryBanners: Record<string, string> = {
    all: '/banners/all-collections.jpg', 
    wigs: '/banners/wigs.jpg',
    bundles: '/banners/bundles.jpg',
    'clip ins': '/banners/clip-ins.jpg',
    ponytail: '/banners/ponytail.jpg',
  };

  const safeCategoryKey = (categoryName || filterType || "all").toLowerCase();

  const types = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category?.name || p.hairType).filter(Boolean)))]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const pCategory = p.category?.name || p.hairType || ""
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = p.name.toLowerCase().includes(searchLower) || pCategory.toLowerCase().includes(searchLower);
      const matchesType = filterType === 'All' || pCategory === filterType
      return matchesSearch && matchesType
    })

    if (sortOrder === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortOrder === 'price-high') result.sort((a, b) => b.price - a.price)
    return result
  }, [searchTerm, filterType, sortOrder, products])

  // Reset to page 1 whenever filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterType, sortOrder])

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    // Scroll smoothly back to the top of the grid when page changes
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      
      {/* 1. STATIC BANNER */}
      <div className="max-w-7xl mx-auto px-4 pt-2"> 
        <div className="aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
            <img 
              src={'/hero-model.png'} 
              alt="Collection Banner"
              className="w-full h-full object-cover object-top" 
            />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12" ref={gridTopRef}>
        {/* 2. PAGE TITLE */}
        <h1 className="text-4xl md:text-5xl font-serif text-[#C5A059] uppercase tracking-[0.2em] mb-10 text-center md:text-left">
            {filterType === 'All' ? 'Our Collections' : filterType}
     </h1>

        {/* 3. SEARCH & FILTERS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Search Products or Categories</label>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-black border border-white/40 py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Filter By Category</label>
                <div className="relative">
                    <select 
                        className="w-full bg-black border border-white/40 py-3 px-4 text-xs appearance-none text-white focus:outline-none focus:border-[#C5A059]"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        {types.map(cat => <option key={cat} value={cat} className="bg-zinc-900">{cat === 'All' ? 'All Collections' : cat}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Sort By</label>
                <div className="relative">
                    <select 
                        className="w-full bg-black border border-white/40 py-3 px-4 text-xs appearance-none text-white focus:outline-none focus:border-[#C5A059]"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="featured" className="bg-zinc-900">Featured</option>
                        <option value="price-low" className="bg-zinc-900">Price, low to high</option>
                        <option value="price-high" className="bg-zinc-900">Price, high to low</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
            </div>
        </div>

        {/* 4. RESULTS GRID (Now using currentProducts instead of filteredProducts) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                            <img 
                                src={product.images[0]?.imageUrl} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt={product.name}
                            />
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
                ))
            ) : (
                <div className="col-span-full py-20 text-center text-gray-500 text-sm tracking-widest uppercase">
                    No products found matching your criteria.
                </div>
            )}
        </div>

        {/* 5. PAGINATION CONTROLS */}
        {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-2 md:gap-4 border-t border-white/10 pt-10">
                <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-widest text-[#C5A059] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C5A059]/10 px-3 py-2 transition-colors border border-transparent hover:border-[#C5A059]/30"
                >
                    <ChevronLeft size={16} /> Prev
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs transition-colors border ${
                                currentPage === page 
                                ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] font-bold' 
                                : 'border-white/10 text-gray-400 hover:border-[#C5A059]/50 hover:text-white'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-widest text-[#C5A059] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C5A059]/10 px-3 py-2 transition-colors border border-transparent hover:border-[#C5A059]/30"
                >
                    Next <ChevronRight size={16} />
                </button>
            </div>
        )}
      </div>

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