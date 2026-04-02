'use client'
import { useState, FormEvent, ChangeEvent } from 'react'
import { updateHairProduct } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import { Plus, Trash2 } from 'lucide-react'

// Define Props with strict types
interface EditProductFormProps {
  product: ProductWithRelations;
  categories: Category[];
}
interface HairImage {
  id: number;
  productId: number;
  imageUrl: string;
}

interface HairColor {
  id: number;
  productId: number;
  color: string;
}

interface HairInch {
  id: number;
  productId: number;
  inches: number;
  additionalPrice: number;
}

interface Category {
  id: number;
  name: string;
}

interface ProductWithRelations {
  id: number;
  name: string;
  categoryId: number | null;
  texture: string | null;
  hairType: string | null;
  origin: string | null;
  processing: string | null;
  options: string | null;
  price: number;
  previousPrice: number | null;
  isOnSale: boolean;
  availability: string;
  quantityInHand: number | null;
  images: HairImage[];
  colors: HairColor[];
  inches: HairInch[];
}

interface InchRow {
  inches: string;
  additionalPrice: string;
}

export default function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<string[]>(product.images.map((img) => img.imageUrl))
  
  // State for dynamic inches pricing (converted from cents to dollars for the UI)
  const [inchesList, setInchesList] = useState<InchRow[]>(
    product.inches.length > 0 
      ? product.inches.map((i) => ({ 
          inches: i.inches.toString(), 
          additionalPrice: (i.additionalPrice / 100).toString() 
        }))
      : [{ inches: '', additionalPrice: '0' }]
  )

  const addInchRow = (): void => {
    setInchesList([...inchesList, { inches: '', additionalPrice: '0' }])
  }

  const removeInchRow = (index: number): void => {
    setInchesList(inchesList.filter((_, i: number) => i !== index))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Strict type casting for Form Data
    const name = formData.get('name') as string
    const rawPrice = formData.get('price') as string
    const priceInCents = Math.round(parseFloat(rawPrice) * 100)
    const isOnSale = formData.get('isOnSale') === 'on'
    const categoryId = formData.get('categoryId') as string
    const availability = formData.get('availability') as string || 'in_hand'
    const quantityInHand = formData.get('quantityInHand') as string

    const payload = {
      name,
      categoryId: categoryId ? parseInt(categoryId) : null,
      texture: formData.get('texture') as string,
      hairType: formData.get('hairType') as string,
      origin: formData.get('origin') as string,
      processing: formData.get('processing') as string,
      options: formData.get('options') as string,
      price: priceInCents,
      isOnSale,
      availability,
      quantityInHand: parseInt(quantityInHand || '0'),
      colors: formData.get('colors')?.toString().split(',').filter(Boolean).map((s: string) => s.trim()),
      inches: inchesList
        .filter((i: InchRow) => i.inches !== '')
        .map((i: InchRow) => ({ 
          value: i.inches, 
          extra: Math.round(parseFloat(i.additionalPrice || '0') * 100) 
        })),
      images: imageUrls,
    }

    const res = await updateHairProduct(product.id, payload)
    if (res.success) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert("Error updating masterpiece")
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-500 p-4 rounded-xl text-sm text-white outline-none focus:border-[#C5A059] transition-all shadow-inner"
  const labelClass = "text-xs uppercase tracking-widest text-white font-black block mb-2 ml-1"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
      
      {/* LEFT: IMAGE MANAGEMENT */}
      <div className="lg:col-span-4 space-y-6 order-1">
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-[2.5rem] shadow-xl">
          <ImageUpload 
            urls={imageUrls} 
            onUploadComplete={(url: string) => setImageUrls(prev => [...prev, url])}
            onRemove={(url: string) => setImageUrls(prev => prev.filter((imgUrl: string) => imgUrl !== url))}
          />
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="lg:col-span-8 space-y-8 bg-zinc-900 p-6 md:p-12 border border-zinc-700 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl order-2">
        
        {/* Section 1: Basic Identity */}
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
                <label className={labelClass}>Category</label>
                <select name="categoryId" defaultValue={product.categoryId || ""} className={inputClass}>
                  <option value="">None</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelClass}>Price ($)</label>
                <input name="price" type="number" step="0.01" defaultValue={(product.price / 100).toFixed(2)} className={inputClass} required />
            </div>
            <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all mt-6 ${product.isOnSale ? 'bg-[#C5A059]/10 border-[#C5A059]/40' : 'bg-zinc-800/50 border-zinc-700'}`}>
               <input type="checkbox" name="isOnSale" id="isOnSale" defaultChecked={product.isOnSale} className="w-6 h-6 accent-[#C5A059] cursor-pointer" />
               <label htmlFor="isOnSale" className="text-sm text-white font-bold cursor-pointer uppercase tracking-tighter">On Sale</label>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Specifications */}
        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black mb-4">Product Specs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Origin</label>
              <input list="origins" name="origin" defaultValue={product.origin || ''} className={inputClass} />
              <datalist id="origins">
                <option value="Brazilian"/><option value="Peruvian"/><option value="Chinese"/><option value="Malaysian"/>
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Texture</label>
              <input list="textures" name="texture" defaultValue={product.texture || ''} className={inputClass} />
              <datalist id="textures">
                <option value="Straight"/><option value="Body Wave"/><option value="Deep Wave"/><option value="Curly Wave"/>
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className={labelClass}>Hair Type</label>
                <input name="hairType" defaultValue={product.hairType || ''} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Processing</label>
              <select name="processing" defaultValue={product.processing || 'Raw Hair'} className={inputClass}>
                <option value="Raw Hair">Raw Hair</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
            <div>
                <label className={labelClass}>Inventory</label>
                <input name="quantityInHand" type="number" defaultValue={product.quantityInHand || 0} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Section 3: Dynamic Inches */}
        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black">Inch Pricing</h3>
            <button type="button" onClick={addInchRow} className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold border border-[#C5A059]/30 px-3 py-1 rounded-full hover:bg-[#C5A059]/10">
              <Plus size={12} /> Add Length
            </button>
          </div>
          <div className="space-y-3">
            {inchesList.map((row, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Inches</label>
                  <input 
                    type="number" 
                    className={inputClass} 
                    value={row.inches} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                    className={inputClass} 
                    value={row.additionalPrice} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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

        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <h3 className="text-[#C5A059] text-[10px] uppercase tracking-widest font-black">Colors</h3>
          <input name="colors" defaultValue={product.colors.map((c) => c.color).join(', ')} className={inputClass} placeholder="Natural Black, #613" />
        </div>

        <button disabled={loading} className="w-full bg-[#C5A059] text-black font-black py-6 rounded-2xl hover:bg-white transition-all tracking-[0.3em] uppercase text-xs mt-6 shadow-2xl">
          {loading ? 'REFINING VAULT...' : 'UPDATE MASTERPIECE'}
        </button>
      </div>
    </form>
  )
}