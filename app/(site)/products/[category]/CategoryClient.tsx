'use client'
import React, { useState, useMemo } from 'react';
import { Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function CategoryClient({ initialProducts, categoryName, company }: any) {
  const [sortOrder, setSortOrder] = useState('featured');
  const [filterValue, setFilterValue] = useState('all');
  const safeCategoryKey = (categoryName || "").toLowerCase();

 const categoryBanners: Record<string, string> = {
    wigs: '/banners/wigs.png',
    bundles: '/banners/bundles.png',
    'clip-ins': '/banners/clip-ins.png',
    ponytail: '/banners/ponytail.png',
  };


  return (
    <div className="pb-20">
   
      {/* 3. FEATURED CATEGORY IMAGE */}
     
       <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
            <img 
              // Fallback to a default image if the category doesn't match
              src={categoryBanners[safeCategoryKey] || '/banners/default.jpg'} 
              alt={categoryName}
              className="w-full h-full object-cover object-center"
            />
        </div>
      </div>

      {/* 4. TITLE & FILTERS */}
      <div className="max-w-7xl mx-auto px-6 mt-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif text-[#C5A059] uppercase tracking-widest mb-10">
            {categoryName}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="flex flex-col gap-2 w-full md:w-64">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Filter</label>
                <div className="relative">
                    <select 
                        className="w-full bg-black border border-white/40 py-3 px-4 text-xs appearance-none focus:outline-none focus:border-[#C5A059]"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    >
                        <option value="all">All products</option>
                        {/* More options... */}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-64">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Sort by</label>
                <div className="relative">
                    <select 
                        className="w-full bg-black border border-white/40 py-3 px-4 text-xs appearance-none focus:outline-none focus:border-[#C5A059]"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price, low to high</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
            </div>
        </div>

        {/* 5. PRODUCT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {initialProducts.map((product: any) => (
                <div key={product.id} className="group cursor-pointer">
                    <div className="aspect-[4/5] bg-zinc-900 overflow-hidden mb-4 border border-white/5">
                        <img 
                            src={product.images[0]?.imageUrl} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            alt={product.name}
                        />
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <h3 className="text-[#C5A059] text-[11px] md:text-sm font-medium tracking-tight h-10 overflow-hidden">
                            {product.name}
                        </h3>
                        <p className="text-white font-bold text-xs md:text-sm">
                            from <span className="text-white">${(product.price / 100).toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}