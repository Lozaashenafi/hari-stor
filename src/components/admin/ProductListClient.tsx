'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Edit2, Eye, Package, MapPin, Hash } from 'lucide-react'
import ProductDetailsModal from '@/components/admin/ProductDetailsModal'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default function ProductListClient({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  return (
    <>
      {/* MOBILE VIEW: Grid of Cards (Visible on small screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-700 p-5 rounded-3xl space-y-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden border border-zinc-700 flex-shrink-0">
                {product.images?.[0] ? (
                  <img src={product.images[0].imageUrl} className="w-full h-full object-cover" />
                ) : <Package className="w-full h-full p-5 text-zinc-800" />}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{product.name}</h3>
                <p className="text-[#5a3e00] font-serif text-xl">
                  ${(product.price / 100).toFixed(2)}
                </p>
                <div className="flex gap-2 mt-2">
                   <span className="text-[9px] bg-zinc-800 text-gray-300 px-2 py-1 rounded uppercase tracking-widest border border-zinc-700">
                    {product.texture}
                   </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-zinc-800">
              <button onClick={() => setSelectedProduct(product)} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-zinc-700">
                <Eye size={16} /> View
              </button>
              <Link href={`/admin/products/${product.id}/edit`} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-zinc-700">
                <Edit2 size={16} /> Edit
              </Link>
              <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: High-Contrast Table (Hidden on small screens) */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-700 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-black/50 border-b border-zinc-700 text-[10px] uppercase tracking-[0.2em] text-[#5a3e00] font-black">
              <tr>
                <th className="px-8 py-6 text-white">Masterpiece</th>
                <th className="px-6 py-6 text-white">Investment</th>
                <th className="px-6 py-6 text-white">Spec</th>
                <th className="px-6 py-6 text-white">Status</th>
                <th className="px-8 py-6 text-right text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden border border-zinc-700 flex-shrink-0 shadow-lg">
                        {product.images?.[0] && (
                          <img src={product.images[0].imageUrl} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-bold text-base leading-tight">{product.name}</div>
                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{product.hairType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[#5a3e00] font-serif text-2xl font-light">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-white flex items-center gap-1"><MapPin size={10} className="text-[#5a3e00]"/> {product.origin}</span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-tighter"><Hash size={10}/> {product.texture}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border ${
                      product.availability === 'in_hand' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {product.availability === 'in_hand' ? 'In Stock' : 'Pre-Order'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                       <button onClick={() => setSelectedProduct(product)} className="p-3 bg-zinc-800 rounded-xl text-white hover:border-[#5a3e00] border border-zinc-700 transition-all shadow-md">
                         <Eye size={18} />
                       </button>
                       <Link href={`/admin/products/${product.id}/edit`} className="p-3 bg-zinc-800 rounded-xl text-white hover:border-[#5a3e00] border border-zinc-700 transition-all shadow-md">
                         <Edit2 size={18} />
                       </Link>
                       <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  )
}