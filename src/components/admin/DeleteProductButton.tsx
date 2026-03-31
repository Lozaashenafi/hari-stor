'use client'
import { useState } from 'react'
import { deleteProduct } from '@/services/product.service'
import { Trash2 } from 'lucide-react'

export default function DeleteProductButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      setLoading(true)
      const res = await deleteProduct(id)
      if (!res.success) {
        alert("Error deleting product")
        setLoading(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-white/5 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  )
}