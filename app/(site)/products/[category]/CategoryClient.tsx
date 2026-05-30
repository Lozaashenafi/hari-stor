'use client'
import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import PublicProductModal from '@/components/site/PublicProductModal'; 

export default function CategoryClient({ initialProducts, categoryName, company }: any) {
  // --- 1. FILTER & SORT STATES ---
  const [sortOrder, setSortOrder] = useState('featured');
  const [textureFilter, setTextureFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all'); // For U-Part, V-Part, etc.
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const safeCategoryKey = (categoryName || "").toLowerCase();

  // --- 2. FILTERING & SORTING LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Texture
    if (textureFilter !== 'all') {
      result = result.filter(p => p.texture === textureFilter);
    }

    // Filter by Origin
    if (originFilter !== 'all') {
      result = result.filter(p => p.origin === originFilter);
    }

    // Filter by Style (Checking name or options for Wig Styles)
    if (styleFilter !== 'all') {
      result = result.filter(p => p.name.includes(styleFilter));
    }

    // Sorting
    if (sortOrder === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [initialProducts, textureFilter, originFilter, styleFilter, sortOrder]);

  const categoryBanners: Record<string, string> = {
    wigs: '/banners/wigs.png',
    bundles: '/banners/bundles.png',
    'clip-ins': '/banners/clip-ins.png',
    ponytail: '/banners/ponytail.png',
  };

  return (
    <div className="pb-20">
      {/* FEATURED CATEGORY IMAGE */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
          <img 
            src={categoryBanners[safeCategoryKey] || '/banners/default.jpg'} 
            alt={categoryName}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif text-[#C5A059] uppercase tracking-widest mb-10 italic">
          {categoryName}
        </h1>

        {/* --- FILTER BAR --- */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-4 md:gap-8 mb-16">
        
          {/* Texture Filter */}
          <div className="flex flex-col gap-2 w-full md:w-48">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Texture</label>
            <div className="relative">
              <select 
                className="w-full bg-black border border-white/20 py-3 px-4 text-[11px] appearance-none focus:outline-none focus:border-[#C5A059] text-white"
                value={textureFilter}
                onChange={(e) => setTextureFilter(e.target.value)}
              >
                <option value="all">All Textures</option>
                <option value="Straight">Straight</option>
                <option value="Body Wave">Body Wave</option>
                <option value="Deep wave">Deep Wave</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Origin Filter */}
          <div className="flex flex-col gap-2 w-full md:w-48">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Origin</label>
            <div className="relative">
              <select 
                className="w-full bg-black border border-white/20 py-3 px-4 text-[11px] appearance-none focus:outline-none focus:border-[#C5A059] text-white"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
              >
                <option value="all">All Origins</option>
                <option value="Brazilian">Brazilian</option>
                <option value="Asian">Asian</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-2 w-full md:w-48">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Sort By</label>
            <div className="relative">
              <select 
                className="w-full bg-black border border-white/20 py-3 px-4 text-[11px] appearance-none focus:outline-none focus:border-[#C5A059] text-white"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrival</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product: any) => (
            <div 
              key={product.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden mb-4 border border-white/5">
                <img 
                  src={product.images[0]?.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={product.name}
                />
                {product.isOnSale && (
                  <div className="absolute top-2 left-2 bg-[#C5A059] text-black text-[8px] font-black px-2 py-1 uppercase tracking-tighter">
                    Sale
                  </div>
                )}
              </div>
              <div className="text-center md:text-left space-y-1">
                <h3 className="text-[#C5A059] text-[10px] md:text-xs uppercase tracking-widest font-medium h-10 overflow-hidden">
                  {product.name}
                </h3>
                <p className="text-white font-serif italic text-sm md:text-base">
                  from ${(product.price / 100).toFixed(2)} CAD
                </p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">
                  {product.texture} • {product.origin}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center border border-white/5 bg-zinc-950/50">
            <p className="text-zinc-500 uppercase tracking-widest text-xs italic">No pieces found in this selection</p>
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
  );
}