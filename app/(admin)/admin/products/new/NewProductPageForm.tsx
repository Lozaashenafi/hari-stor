'use client'
import { useState } from 'react'
import { createHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import { Plus, Trash2 } from 'lucide-react'

// Define the Category type for strict TS
interface Category {
  id: number;
  name: string;
}

export default function NewProductPageForm({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  
  // State for dynamic inches pricing
  const [inchesList, setInchesList] = useState([{ inches: '', additionalPrice: '0' }])

  const addInchRow = () => setInchesList([...inchesList, { inches: '', additionalPrice: '0' }])
  const removeInchRow = (index: number) => setInchesList(inchesList.filter((_, i) => i !== index))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (imageUrls.length === 0) return alert("Please upload at least one image")
    
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const priceInCents = Math.round(parseFloat(formData.get('price') as string) * 100)

    const payload = {
      name: formData.get('name'),
      categoryId: formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null,
      texture: formData.get('texture'),
      hairType: formData.get('hairType'),
      origin: formData.get('origin'),
      processing: formData.get('processing'),
      options: formData.get('options'),
      price: priceInCents,
      isOnSale: formData.get('isOnSale') === 'on',
      availability: formData.get('availability'),
      quantityInHand: parseInt(formData.get('quantityInHand') as string || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map((s: string) => s.trim()),
      inches: inchesList
        .filter(i => i.inches !== '')
        .map(i => ({ 
          value: i.inches, 
          extra: Math.round(parseFloat(i.additionalPrice) * 100) 
        })),
      images: imageUrls,
    }

    const res = await createHairProduct(payload)
    if (res.success) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert("Error saving product")
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white placeholder:text-zinc-400 outline-none focus:border-[#C5A059] transition-all";
  const labelClass = "text-xs uppercase tracking-widest text-white font-black block mb-2";

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-10 mt-6 text-center lg:text-left">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">New Masterpiece</h1>
        <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black mt-4">Archive to Luxury Vault</p>
      </header>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2.5rem] shadow-2xl">
             <ImageUpload 
                urls={imageUrls} 
                onUploadComplete={(url) => setImageUrls(prev => [...prev, url])} 
                onRemove={(url) => setImageUrls(prev => prev.filter(item => item !== url))} 
              />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase font-black border-b border-zinc-800 pb-3">Basic Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Product Name</label>
                <input name="name" type="text" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select name="categoryId" className={inputClass + " appearance-none"}>
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Base Price ($)</label>
                <input name="price" type="number" step="0.01" className={inputClass} required />
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-4 bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 w-full">
                  <input type="checkbox" name="isOnSale" id="isOnSale" className="w-6 h-6 accent-[#C5A059]" />
                  <label htmlFor="isOnSale" className="text-xs text-white font-bold uppercase cursor-pointer">On Sale</label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[#C5A059] text-[10px] uppercase font-black border-b border-zinc-800 pb-3">Specs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div><label className={labelClass}>Origin</label><input list="origins" name="origin" className={inputClass} /><datalist id="origins"><option value="Brazilian"/><option value="Chinese"/><option value="Malaysian"/></datalist></div>
               <div><label className={labelClass}>Texture</label><input list="textures" name="texture" className={inputClass} /><datalist id="textures"><option value="Straight"/><option value="Body Wave"/><option value="Curly Wave"/></datalist></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black">Inch Pricing (Dynamic)</h3>
              <button type="button" onClick={addInchRow} className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold border border-[#C5A059]/30 px-3 py-1 rounded-full hover:bg-[#C5A059]/10">
                <Plus size={12} /> Add Length
              </button>
            </div>
            
            <div className="space-y-3">
              {inchesList.map((row, index) => (
                <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-2">
                  <div className="flex-1">
                    <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Inches</label>
                    <input 
                      type="number" 
                      placeholder='22' 
                      className={inputClass} 
                      value={row.inches} 
                      onChange={(e) => {
                        const newList = [...inchesList];
                        newList[index].inches = e.target.value;
                        setInchesList(newList);
                      }} 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Extra Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      placeholder='7.00' 
                      className={inputClass} 
                      value={row.additionalPrice}
                      onChange={(e) => {
                        const newList = [...inchesList];
                        newList[index].additionalPrice = e.target.value;
                        setInchesList(newList);
                      }} 
                    />
                  </div>
                  <button type="button" onClick={() => removeInchRow(index)} className="p-4 text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className={labelClass}>Colors (Comma separated)</label>
            <input name="colors" type="text" className={inputClass} placeholder="Natural Black, #613" />
          </div>

          <button disabled={loading} className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl shadow-2xl active:scale-95 transition-all">
            {loading ? 'SYNCHRONIZING...' : 'CREATE MASTERPIECE'}
          </button>
        </div>
      </form>
    </div>
  )
}