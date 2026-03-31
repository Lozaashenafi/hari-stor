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

    const res = await createHairProduct(payload)
    if (res.success) {
      router.push('/admin/products')
    } else {
      alert("Error saving product")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-8 mt-6">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">New Masterpiece</h1>
        <p className="text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold mt-4">Complete Inventory Profile</p>
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
          
          {/* Section 1: Basic Identity */}
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Basic Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Product Name" name="name" placeholder="E.g. Raw Vietnamese Silk" required />
              <InputGroup label="Price ($)" name="price" type="number" step="0.01" placeholder="299.99" required />
            </div>
          </div>

          {/* Section 2: Hair Specifications (The missing attributes) */}
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Hair Type" name="hairType" placeholder="Wavy, Curly, Coily" />
              <InputGroup label="Texture" name="texture" placeholder="Fine, Medium, Coarse" />
              <InputGroup label="Origin" name="origin" placeholder="Vietnam, India, etc" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Processing" name="processing" placeholder="Raw, Steam Processed" />
              <InputGroup label="Options" name="options" placeholder="Single Drawn, Double Drawn" />
            </div>
          </div>

          {/* Section 3: Availability & Stock */}
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Inventory Logic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white font-bold block">Availability</label>
                <select name="availability" className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-white outline-none focus:border-[#C5A059] appearance-none cursor-pointer shadow-inner">
                  <option value="in_hand">In Hand (Immediate Ship)</option>
                  <option value="order">Pre-Order (Waitlist)</option>
                </select>
              </div>
              <InputGroup label="Quantity in Hand" name="quantityInHand" type="number" placeholder="0" />
            </div>
          </div>

          {/* Section 4: Variants */}
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black border-b border-zinc-800 pb-2">Customization Options</h3>
            <InputGroup label="Available Colors (Separate by comma)" name="colors" placeholder="Natural Black, 613, #2, #4" />
            <InputGroup label="Available Inches (Separate by comma)" name="inches" placeholder="12, 14, 18, 24" />
          </div>

          <button 
            disabled={loading || imageUrls.length === 0}
            className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl hover:bg-[#D4B26E] hover:scale-[1.01] active:scale-95 transition-all tracking-[0.3em] uppercase text-xs shadow-2xl shadow-gold/20 disabled:opacity-30 mt-6"
          >
            {loading ? 'ARCHIVING TO VAULT...' : 'CREATE PRODUCT PROFILE'}
          </button>
        </div>
      </form>
    </div>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-white font-bold block">{label}</label>
      <input 
        className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all shadow-inner"
        {...props}
      />
    </div>
  )
}