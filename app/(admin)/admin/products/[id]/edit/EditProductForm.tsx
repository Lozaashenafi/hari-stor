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
    
    // Price Logic: Convert float to integer (cents) for DB storage
    const rawPrice = formData.get('price') as string
    const priceInCents = Math.round(parseFloat(rawPrice) * 100)

    const payload = {
      name: formData.get('name'),
      texture: formData.get('texture'),
      hairType: formData.get('hairType'),
      origin: formData.get('origin'),
      processing: formData.get('processing'),
      options: formData.get('options'),
      price: priceInCents,
      availability: formData.get('availability'),
      quantityInHand: formData.get('quantityInHand'),
      // Related tables
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      inches: formData.get('inches')?.toString().split(',').filter(Boolean).map(s => s.trim()),
      images: imageUrls,
    }

    const res = await updateHairProduct(product.id, payload)
    if (res.success) {
      router.push('/admin/products')
    } else {
      alert("Error updating masterpiece")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
      
      {/* LEFT: IMAGE MANAGEMENT */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2rem] shadow-xl">
          <ImageUpload 
            urls={imageUrls} 
            onUploadComplete={(url) => setImageUrls(prev => [...prev, url])}
            onRemove={(url) => setImageUrls(prev => prev.filter(i => i !== url))}
          />
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] shadow-2xl">
        
        {/* Section 1: Basic Identity */}
        <div className="space-y-6">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Basic Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Product Name" name="name" defaultValue={product.name} required />
            <InputGroup 
              label="Price ($)" 
              name="price" 
              type="number" 
              step="0.01" 
              defaultValue={(product.price / 100).toFixed(2)} 
              required 
            />
          </div>
        </div>

        {/* Section 2: Technical Specifications */}
        <div className="space-y-6">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Hair Type" name="hairType" defaultValue={product.hairType} placeholder="Wavy, Curly..." />
            <InputGroup label="Texture" name="texture" defaultValue={product.texture} placeholder="Fine, Coarse..." />
            <InputGroup label="Origin" name="origin" defaultValue={product.origin} placeholder="Vietnam, India..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Processing" name="processing" defaultValue={product.processing} />
            <InputGroup label="Options" name="options" defaultValue={product.options} />
          </div>
        </div>

        {/* Section 3: Inventory Logic */}
        <div className="space-y-6">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Inventory Logic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white font-bold block">Status</label>
              <select name="availability" defaultValue={product.availability} className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-white outline-none focus:border-[#C5A059] appearance-none">
                <option value="in_hand">In Hand (Immediate)</option>
                <option value="order">Pre-Order</option>
              </select>
            </div>
            <InputGroup label="Quantity" name="quantityInHand" type="number" defaultValue={product.quantityInHand} />
          </div>
        </div>

        {/* Section 4: Variants */}
        <div className="space-y-6 pt-4">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Variants</h3>
          <InputGroup label="Colors" name="colors" defaultValue={product.colors.map((c: any) => c.color).join(', ')} />
          <InputGroup label="Inches" name="inches" defaultValue={product.inches.map((i: any) => i.inches).join(', ')} />
        </div>

        <button disabled={loading} className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl hover:bg-[#D4B26E] transition-all tracking-[0.3em] uppercase text-xs shadow-xl shadow-gold/10 mt-6">
          {loading ? 'REFINING VAULT...' : 'UPDATE MASTERPIECE'}
        </button>
      </div>
    </form>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-white font-bold block">{label}</label>
      <input className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#C5A059] transition-all shadow-inner" {...props} />
    </div>
  )
}