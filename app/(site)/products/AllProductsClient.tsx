'use client'
import React, { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'

export default function AllProductsClient({ products, company, categoryName }: { products: any[], company: any, categoryName?: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('featured')
  const [filterType, setFilterType] = useState(categoryName || 'All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Banner Mapping
  const categoryBanners: Record<string, string> = {
    all: '/banners/all-collections.jpg', // Ensure these exist in public/banners
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

  return (
    <div className="bg-black min-h-screen pb-20">
      
      {/* 1. STATIC BANNER - Fixed object-top alignment */}
      <div className="max-w-7xl mx-auto px-4 pt-2"> {/* Reduced pt-8 to pt-2 to bring it to the top */}
        <div className="aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
            <img 
              // Restored dynamic banner logic, fallback to hero-model if not found
              src={'/hero-model.png'} 
              alt="Collection Banner"
              className="w-full h-full object-cover object-top" // CHANGED TO object-top
            />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
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

        {/* 4. RESULTS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 border border-white/5 relative shadow-xl">
                        {product.isOnSale && (
                            <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                SALE
                            </div>
                        )}
                        <img 
                            src={product.images[0]?.imageUrl} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={product.name}
                        />
                    </div>

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