'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import PublicProductModal from '@/components/site/PublicProductModal'

export default function SearchPageClient({ products = [], company }: { products: any[], company: any }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams?.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Sync input with URL query (for back/forward navigation)
  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const searchResults = useMemo(() => {
    if (!query || !products) return []
    const lowerQuery = query.toLowerCase()
    
    return products.filter((product) => {
      if (!product) return false
      const productName = product.name?.toLowerCase() || ''
      const categoryName = product.category?.name?.toLowerCase() || product.hairType?.toLowerCase() || ''
      return productName.includes(lowerQuery) || categoryName.includes(lowerQuery)
    })
  }, [query, products])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <div className="bg-black min-h-screen pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 mt-10">
          
          {query && searchResults.length === 0 ? (
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-10">
              Your search for &quot;{query}&quot; did not yield results.
            </h1>
          ) : query ? (
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-10">
              Search Results for &quot;{query}&quot;
            </h1>
          ) : (
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-10">
              Search Our Store
            </h1>
          )}

          <form onSubmit={handleSearchSubmit} className="flex items-center w-full shadow-lg">
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products or categories..."
              className="flex-grow bg-white text-black py-3 md:py-4 px-4 text-lg focus:outline-none border-2 border-white focus:border-[#C5A059] transition-colors"
            />
            <button type="submit" className="bg-[#C5A059] hover:bg-[#b08d4b] p-4 md:px-6 md:py-4 border-2 border-[#C5A059]">
              <SearchIcon className="text-white" size={24} />
            </button>
          </form>
        </div>

        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/10 pt-16">
            {searchResults.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="aspect-square overflow-hidden bg-white mb-4">
                  <img src={product.images?.[0]?.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[#C5A059] text-center">{product.name}</h3>
                <p className="text-white text-center font-bold">${(product.price / 100).toFixed(2)}</p>
              </div>
            ))}
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