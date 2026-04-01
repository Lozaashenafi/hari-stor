'use client'
import { useState, useMemo } from 'react'
import { createHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [origin, setOrigin] = useState('')


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (imageUrls.length === 0) return alert("Please upload at least one image")
    
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const rawPrice = formData.get('price') as string
    const priceInCents = Math.round(parseFloat(rawPrice) * 100)

    const payload = {
      name: formData.get('name'),
      texture: formData.get('texture'),
      hairType: formData.get('hairType'),
      origin: formData.get('origin'),
      options: formData.get('options'),
      price: priceInCents,
      availability: formData.get('availability'),
      quantityInHand: formData.get('quantityInHand'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      inches: formData.get('inches')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      images: imageUrls,
    }

    const res = await createHairProduct(payload)
    if (res.success) router.push('/admin/products')
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#5a3e00] focus:ring-1 focus:ring-[#5a3e00] transition-all shadow-inner";
  const labelClass = "text-xs uppercase tracking-widest text-white font-bold block mb-2";

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-8 mt-6">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">New Masterpiece</h1>
        <p className="text-[#5a3e00] text-xs uppercase tracking-[0.4em] font-bold mt-4">Inventory Profile</p>
      </header>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* IMAGE SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2rem] shadow-xl">
             <ImageUpload 
                urls={imageUrls} 
                onUploadComplete={(url) => setImageUrls(prev => [...prev, url])} 
                onRemove={(url) => setImageUrls(prev => prev.filter(item => item !== url))}
              />
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] shadow-2xl">
          
          <div className="space-y-6">
            <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Basic Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Product Name</label>
                <input name="name" type="text" className={inputClass} placeholder="E.g. Raw Vietnamese Silk" required />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Price ($)</label>
                <input name="price" type="number" step="0.01" className={inputClass} placeholder="299.99" required />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Origin</label>
                <input list="origins" name="origin" onChange={(e) => setOrigin(e.target.value)} className={inputClass} placeholder="Select or type origin..." />
                <datalist id="origins">
                  <option value="Brazilian" /><option value="Peruvian" /><option value="Chinese" /><option value="Malaysian" /><option value="Asia" />
                </datalist>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Texture</label>
                <input list="textures" name="texture" className={inputClass} placeholder="Select or type texture..." />
                <datalist id="textures">
                  <option value="Straight" /><option value="Natural Wave" /><option value="Body Wave" /><option value="Classic Wave" /><option value="Deep Wave" /><option value="Curly Wave" />
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Hair Type</label>
                <input name="hairType" type="text" className={inputClass} placeholder="E.g. Double Drawn" />
              </div>
              <div className={`space-y-2 transition-all duration-500 `}>
                <label className={labelClass}>Processing</label>
                <select name="processing" className={inputClass}>
                  <option value="Raw Hair">Raw Hair</option>
                  <option value="Processed">Processed</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
                <label className={labelClass}>Additional Options</label>
                <input name="options" type="text" className={inputClass} placeholder="E.g. HD Lace, Transparent" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Inventory Logic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Availability</label>
                <select name="availability" className={inputClass}>
                  <option value="in_hand">In Hand</option>
                  <option value="order">Pre-Order</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Quantity in Hand</label>
                <input name="quantityInHand" type="number" className={inputClass} placeholder="0" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Customization</h3>
            <div className="space-y-2">
                <label className={labelClass}>Colors (Comma separated)</label>
                <input name="colors" type="text" className={inputClass} placeholder="Natural Black, 613, #2" />
            </div>
            <div className="space-y-2">
                <label className={labelClass}>Inches (Comma separated)</label>
                <input name="inches" type="text" className={inputClass} placeholder="12, 14, 18, 24" />
            </div>
          </div>

          <button 
            disabled={loading || imageUrls.length === 0}
            className="w-full bg-[#5a3e00] text-black font-black py-6 rounded-2xl hover:bg-[#D4B26E] transition-all tracking-[0.3em] uppercase text-xs shadow-2xl shadow-gold/20 disabled:opacity-30"
          >
            {loading ? 'ARCHIVING...' : 'CREATE PRODUCT'}
          </button>
        </div>
      </form>
    </div>
  )
}