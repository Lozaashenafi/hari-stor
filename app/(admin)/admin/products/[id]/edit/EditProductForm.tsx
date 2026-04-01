'use client'
import { useState } from 'react'
import { updateHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(product.images.map((img: any) => img.imageUrl))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const priceInCents = Math.round(parseFloat(formData.get('price') as string) * 100)

    const payload = {
      name: formData.get('name'),
      texture: formData.get('texture'),
      hairType: formData.get('hairType'),
      origin: formData.get('origin'),
      processing: formData.get('processing'),
      options: formData.get('options'),
      price: priceInCents,
      isOnSale: formData.get('isOnSale') === 'on',
      availability: formData.get('availability'), // Now included!
      quantityInHand: parseInt(formData.get('quantityInHand') as string || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      inches: formData.get('inches')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      images: imageUrls,
    }

    const res = await updateHairProduct(product.id, payload)
    if (res.success) {
      router.push('/admin/products')
      router.refresh()
    }
    setLoading(false)
  }



  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white outline-none focus:border-[#C5A059] transition-all shadow-inner";
  const labelClass = "text-xs uppercase tracking-widest text-white font-black block mb-2 ml-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
      
      <div className="lg:col-span-4 space-y-6 order-1">
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2.5rem] shadow-xl">
          <ImageUpload 
            urls={imageUrls} 
            onUploadComplete={(url) => setImageUrls(prev => [...prev, url])}
            onRemove={(url) => setImageUrls(prev => prev.filter(i => i !== url))}
          />
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl order-2">
        
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
             <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black">Basic Identity</h3>
             {product.previousPrice && (
               <span className="text-[9px] text-zinc-500 uppercase tracking-widest bg-black px-3 py-1 rounded-full border border-zinc-800">
                  Last: ${(product.previousPrice / 100).toFixed(2)}
               </span>
             )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelClass}>Product Name</label>
                <input name="name" defaultValue={product.name} className={inputClass} required />
            </div>
            <div>
                <label className={labelClass}>Price ($)</label>
                <input name="price" type="number" step="0.01" defaultValue={(product.price / 100).toFixed(2)} className={inputClass} required />
            </div>
          </div>

          <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${product.isOnSale ? 'bg-[#C5A059]/10 border-[#C5A059]/40' : 'bg-zinc-800/50 border-zinc-700'}`}>
               <input 
                  type="checkbox" 
                  name="isOnSale" 
                  id="isOnSale" 
                  defaultChecked={product.isOnSale}
                  className="w-6 h-6 accent-[#C5A059] cursor-pointer" 
               />
               <label htmlFor="isOnSale" className="text-sm text-white font-bold cursor-pointer uppercase tracking-tighter">
                  This product is currently highlighted as "ON SALE"
               </label>
            </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black mb-4">Product Specs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Origin</label>
              <input list="origins" name="origin" defaultValue={product.origin} className={inputClass} />
              <datalist id="origins">
                <option value="Brazilian"/><option value="Peruvian"/><option value="Chinese"/><option value="Malaysian"/>
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Texture</label>
              <input list="textures" name="texture" defaultValue={product.texture} className={inputClass} />
              <datalist id="textures">
                <option value="Straight"/><option value="Body Wave"/><option value="Deep Wave"/><option value="Curly Wave"/>
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className={labelClass}>Hair Type</label>
                <input name="hairType" defaultValue={product.hairType} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Processing</label>
              <select name="processing" defaultValue={product.processing} className={inputClass + " appearance-none"}>
                <option value="Raw Hair">Raw Hair</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
            <div>
                <label className={labelClass}>Inventory</label>
                <input name="quantityInHand" type="number" defaultValue={product.quantityInHand} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black">Variants</h3>
          <div>
            <label className={labelClass}>Colors</label>
            <input name="colors" defaultValue={product.colors.map((c: any) => c.color).join(', ')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Inches</label>
            <input name="inches" defaultValue={product.inches.map((i: any) => i.inches).join(', ')} className={inputClass} />
          </div>
        </div>

        <button disabled={loading} className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl hover:bg-white transition-all tracking-[0.3em] uppercase text-xs mt-6 shadow-2xl">
          {loading ? 'REFINING VAULT...' : 'UPDATE MASTERPIECE'}
        </button>
      </div>
    </form>
  )
}