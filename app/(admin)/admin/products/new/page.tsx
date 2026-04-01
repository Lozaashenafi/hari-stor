'use client'
import { useState } from 'react'
import { createHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (imageUrls.length === 0) return alert("Please upload at least one image")
    
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
      availability: formData.get('availability'),
      quantityInHand: parseInt(formData.get('quantityInHand') as string || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      inches: formData.get('inches')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      images: imageUrls,
    }

    const res = await createHairProduct(payload)
    if (res.success) router.push('/admin/products')
    setLoading(false)
  }


  // High visibility style variables
  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white placeholder:text-zinc-400 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all shadow-md";
  const labelClass = "text-xs uppercase tracking-[0.2em] text-white font-black block mb-2 ml-1";

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-10 mt-6 text-center lg:text-left">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">New Masterpiece</h1>
        <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black mt-4">Archive to Luxury Vault</p>
      </header>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT: IMAGES */}
        <div className="lg:col-span-4 space-y-6 order-1">
          <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2.5rem] shadow-2xl">
             <ImageUpload 
                urls={imageUrls} 
                onUploadComplete={(url) => setImageUrls(prev => [...prev, url])} 
                onRemove={(url) => setImageUrls(prev => prev.filter(item => item !== url))}
              />
          </div>
        </div>

        {/* RIGHT: FORM DETAILS */}
        <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl order-2">
          
          {/* Section 1: Pricing & Identity */}
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-3">Basic Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Product Name</label>
                <input name="name" type="text" className={inputClass} placeholder="E.g. Raw Vietnamese Silk" required />
              </div>
              <div>
                <label className={labelClass}>Price ($)</label>
                <input name="price" type="number" step="0.01" className={inputClass} placeholder="299.99" required />
              </div>
            </div>

            {/* Sale Toggle */}
            <div className="flex items-center gap-4 bg-zinc-800/50 p-5 rounded-2xl border border-zinc-700">
               <input type="checkbox" name="isOnSale" id="isOnSale" className="w-6 h-6 accent-[#C5A059] cursor-pointer" />
               <label htmlFor="isOnSale" className="text-sm text-white font-bold cursor-pointer uppercase tracking-tighter">
                  Apply "ON SALE" badge & enable price comparison
               </label>
            </div>
          </div>

          {/* Section 2: Specifications */}
          <div className="space-y-6 pt-4">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-3">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Origin</label>
                <input list="origins" name="origin" className={inputClass} placeholder="Select or type..." />
                <datalist id="origins">
                  <option value="Brazilian"/><option value="Peruvian"/><option value="Chinese"/><option value="Malaysian"/>
                </datalist>
              </div>
              <div>
                <label className={labelClass}>Texture</label>
                <input list="textures" name="texture" className={inputClass} placeholder="Select or type..." />
                <datalist id="textures">
                  <option value="Straight"/><option value="Body Wave"/><option value="Deep Wave"/><option value="Curly Wave"/>
                </datalist>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Hair Type</label>
                  <input name="hairType" className={inputClass} placeholder="E.g. Raw Virgin" />
                </div>
                <div>
                  <label className={labelClass}>Processing</label>
                  <select name="processing" className={inputClass + " appearance-none"}>
                    <option value="Raw Hair">Raw Hair</option>
                    <option value="Processed">Processed</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Inventory Level</label>
                  <input name="quantityInHand" type="number" className={inputClass} placeholder="0" />
                </div>
            </div>
          </div>

          {/* Section 3: Customization */}
          <div className="space-y-6 pt-4">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-3">Variants</h3>
            <div>
                <label className={labelClass}>Available Colors (Comma separated)</label>
                <input name="colors" type="text" className={inputClass} placeholder="Natural Black, 613, #2" />
            </div>
            <div>
                <label className={labelClass}>Available Inches (Comma separated)</label>
                <input name="inches" type="text" className={inputClass} placeholder="12, 14, 22, 28" />
            </div>
          </div>

          <button 
            disabled={loading || imageUrls.length === 0}
            className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl hover:bg-white hover:scale-[1.01] active:scale-95 transition-all tracking-[0.3em] uppercase text-xs shadow-2xl shadow-gold/20 disabled:opacity-30 mt-6"
          >
            {loading ? 'SYNCHRONIZING...' : 'CREATE MASTERPIECE'}
          </button>
        </div>
      </form>
    </div>
  )
}