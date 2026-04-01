'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  urls: string[];
  onUploadComplete: (url: string) => void;
  onRemove: (url: string) => void;
}

export default function ImageUpload({ urls, onUploadComplete, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    
    for (const file of Array.from(files)) {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('hair-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('hair-images').getPublicUrl(filePath)
        onUploadComplete(data.publicUrl)
      } catch (error) {
        console.error('Error uploading:', error)
        alert(`Failed to upload ${file.name}`)
      }
    }
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-bold">
        Gallery Collection ({urls.length})
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Upload Button */}
        <label className="relative aspect-square bg-black border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#5a3e00] hover:bg-white/[0.02] transition-all group">
          {uploading ? (
            <Loader2 className="text-[#5a3e00] animate-spin" size={24} />
          ) : (
            <>
              <Plus className="text-gray-500 group-hover:text-[#5a3e00] mb-2" size={24} />
              <span className="text-[9px] text-gray-500 uppercase tracking-tighter">Add Photo</span>
            </>
          )}
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
            disabled={uploading}
          />
        </label>

        {/* Image Previews */}
        {urls.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
            <img src={url} alt="Product" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={() => onRemove(url)}
                className="p-2 bg-red-500 rounded-full text-white transform hover:scale-110 transition-transform"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}