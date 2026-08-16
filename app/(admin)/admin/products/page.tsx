import { getAdminProducts } from '@/services/product.service'
import ProductListClient from '../../../../src/components/admin/ProductListClient' // We will create this next
import Link from 'next/link'

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-10 pb-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-white italic tracking-tighter">
            Vault
          </h1>
          <p className="text-[#5a3e00] text-xs uppercase tracking-[0.5em] mt-4 font-black">
            Inventory Archives
          </p>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="w-full md:w-auto bg-[#5a3e00] text-black px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#D4B26E] transition-all text-center shadow-2xl shadow-gold/20"
        >
          + Create Masterpiece
        </Link>
      </div>

      <ProductListClient products={products} />
    </div>
  )
}