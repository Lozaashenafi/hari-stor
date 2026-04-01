'use client'
import { useState } from 'react'
import { addGalleryImage, deleteGalleryImage } from '@/services/gallery.service'
import ImageUpload from '@/components/admin/ImageUpload' // Reuse your uploader
import { Trash2, Image as ImageIcon, Plus } from 'lucide-react'

export default function GalleryManagerClient({ initialImages }: { initialImages: any[] }) {
  const [images, setImages] = useState(initialImages)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [uploadUrl, setUploadUrl] = useState('')

  async function handleAdd() {
    if (!title || !uploadUrl) return alert("Title and Image required")
    setLoading(true)
    const res = await addGalleryImage(title, uploadUrl)
    if (res.success) {
      window.location.reload() // Simple refresh to show new data
    }
    setLoading(false)
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this photo from gallery?")) return
    const res = await deleteGalleryImage(id)
    if (res.success) setImages(images.filter(img => img.id !== id))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* UPLOAD FORM */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-[2.5rem] sticky top-10 shadow-2xl">
          <h3 className="text-white font-serif text-2xl mb-6 italic">Add to Showcase</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Photo Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Summer Silk Collection"
                className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl text-sm text-white focus:border-[#5a3e00] outline-none"
              />
            </div>

            <ImageUpload 
              urls={uploadUrl ? [uploadUrl] : []} 
              onUploadComplete={(url) => setUploadUrl(url)}
              onRemove={() => setUploadUrl('')}
            />

            <button 
              disabled={loading || !uploadUrl}
              onClick={handleAdd}
              className="w-full bg-[#5a3e00] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px] disabled:opacity-30 transition-all hover:bg-[#D4B26E]"
            >
              {loading ? 'Adding...' : <><Plus size={16}/> Add to Gallery</>}
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-[4/5] bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800 shadow-xl">
            <img src={img.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={img.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <p className="text-[#5a3e00] text-[9px] uppercase tracking-[0.3em] font-black mb-1">Showcase Piece</p>
                <h4 className="text-white font-serif text-xl italic">{img.title}</h4>
              </div>
              <button 
                onClick={() => handleDelete(img.id)}
                className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}