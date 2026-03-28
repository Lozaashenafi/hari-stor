'use client'
import { useState } from 'react'
import { createHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Process comma separated strings into arrays
    const payload = {
      name: formData.get('name'),
      price: formData.get('price'),
      texture: formData.get('texture'),
      origin: formData.get('origin'),
      availability: formData.get('availability'),
      quantityInHand: formData.get('quantity'),
      colors: formData.get('colors')?.toString().split(',').map(s => s.trim()),
      inches: formData.get('inches')?.toString().split(',').map(s => s.trim()),
      images: [formData.get('imageUrl')?.toString()], // Simple single URL for now
    }

    const res = await createHairProduct(payload)
    if (res.success) {
      router.push('/admin/products')
    } else {
      alert("Error saving product")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl text-white mb-8 italic">Add New Masterpiece</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-950 p-8 border border-white/5 rounded-2xl">
        <div className="grid grid-cols-2 gap-6">
          <InputGroup label="Product Name" name="name" placeholder="E.g. Raw Virgin Straight" required />
          <InputGroup label="Price ($)" name="price" type="number" placeholder="250" required />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InputGroup label="Texture" name="texture" placeholder="Straight, Curly..." />
          <InputGroup label="Origin" name="origin" placeholder="Vietnam, India..." />
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Availability</label>
            <select name="availability" className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white outline-none focus:border-[#C5A059]">
              <option value="in_hand">In Hand</option>
              <option value="order">Pre-Order</option>
            </select>
          </div>
          <InputGroup label="Quantity (if in hand)" name="quantity" type="number" placeholder="10" />
        </div>

        <InputGroup label="Colors (separated by comma)" name="colors" placeholder="Natural Black, 613, Burgundy" />
        <InputGroup label="Available Inches (comma separated)" name="inches" placeholder="12, 14, 16, 22" />
        <InputGroup label="Image URL" name="imageUrl" placeholder="https://..." />

        <button 
          disabled={loading}
          className="w-full bg-[#C5A059] text-black font-bold py-4 rounded-xl hover:bg-[#D4B26E] transition-all tracking-widest uppercase text-xs"
        >
          {loading ? 'Processing...' : 'Add to Collection'}
        </button>
      </form>
    </div>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block font-medium">{label}</label>
      <input 
        className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white outline-none focus:border-[#C5A059] transition-colors placeholder:text-zinc-800"
        {...props}
      />
    </div>
  )
}