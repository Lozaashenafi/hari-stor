'use client'
import { useState, useMemo } from 'react'
import { updateHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(product.images.map((img: any) => img.imageUrl))
  const [origin, setOrigin] = useState(product.origin || '')


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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

    const res = await updateHairProduct(product.id, payload)
    if (res.success) router.push('/admin/products')
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#5a3e00] transition-all shadow-inner";
  const labelClass = "text-xs uppercase tracking-widest text-white font-bold block mb-2";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2rem] shadow-xl">
          <ImageUpload 
            urls={imageUrls} 
            onUploadComplete={(url) => setImageUrls(prev => [...prev, url])}
            onRemove={(url) => setImageUrls(prev => prev.filter(i => i !== url))}
          />
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] shadow-2xl">
        <div className="space-y-6">
          <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Basic Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className={labelClass}>Product Name</label>
                <input name="name" defaultValue={product.name} className={inputClass} required />
            </div>
            <div className="space-y-2">
                <label className={labelClass}>Price ($)</label>
                <input name="price" type="number" step="0.01" defaultValue={(product.price / 100).toFixed(2)} className={inputClass} required />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Origin</label>
              <input list="origins" name="origin" defaultValue={product.origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass} />
              <datalist id="origins">
                <option value="Brazilian" /><option value="Peruvian" /><option value="Chinese" /><option value="Malaysian" /><option value="Asia" />
              </datalist>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Texture</label>
              <input list="textures" name="texture" defaultValue={product.texture} className={inputClass} />
              <datalist id="textures">
                <option value="Straight" /><option value="Natural Wave" /><option value="Body Wave" /><option value="Classic Wave" /><option value="Deep Wave" /><option value="Curly Wave" />
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className={labelClass}>Hair Type</label>
                <input name="hairType" defaultValue={product.hairType} className={inputClass} />
            </div>
            <div className={`space-y-2 transition-all duration-500}`}>
              <label className={labelClass}>Processing</label>
              <select name="processing" defaultValue={product.processing} className={inputClass}>
                <option value="Raw Hair">Raw Hair</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
                <label className={labelClass}>Options</label>
                <input name="options" defaultValue={product.options} className={inputClass} />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Availability</label>
              <select name="availability" defaultValue={product.availability} className={inputClass}>
                <option value="in_hand">In Hand</option>
                <option value="order">Pre-Order</option>
              </select>
            </div>
            <div className="space-y-2">
                <label className={labelClass}>Quantity</label>
                <input name="quantityInHand" type="number" defaultValue={product.quantityInHand} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Variants</h3>
          <div className="space-y-2">
            <label className={labelClass}>Colors</label>
            <input name="colors" defaultValue={product.colors.map((c: any) => c.color).join(', ')} className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Inches</label>
            <input name="inches" defaultValue={product.inches.map((i: any) => i.inches).join(', ')} className={inputClass} />
          </div>
        </div>

        <button disabled={loading} className="w-full bg-[#5a3e00] text-black font-black py-6 rounded-2xl hover:bg-[#D4B26E] transition-all tracking-[0.3em] uppercase text-xs mt-6 shadow-2xl">
          {loading ? 'REFINING...' : 'UPDATE MASTERPIECE'}
        </button>
      </div>
    </form>
  )
}