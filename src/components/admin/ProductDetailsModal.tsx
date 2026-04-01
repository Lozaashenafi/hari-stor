'use client'
import { 
  X, ExternalLink, Calendar, Tag, Ruler, 
  Layers, Settings, Database, Palette, PackageSearch 
} from 'lucide-react'

export default function ProductDetailsModal({ product, onClose }: { product: any, onClose: () => void }) {
  if (!product) return null

  // Price formatting: cents to dollars
  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4">
      {/* Heavy backdrop blur for "Luxe" feel */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-zinc-900 border border-zinc-700 w-full max-w-4xl rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-zinc-400 hover:text-[#5a3e00] z-20 bg-black/20 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          
          {/* LEFT SIDE: IMAGE PREVIEW */}
          <div className="w-full md:w-5/12 bg-black border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="sticky top-0">
               <div className="aspect-[4/5] w-full">
                <img 
                  src={product.images[0]?.imageUrl} 
                  className="w-full h-full object-cover" 
                  alt={product.name} 
                />
              </div>
              {/* Small Gallery strip below main image */}
              <div className="p-4 grid grid-cols-4 gap-2">
                {product.images.map((img: any, i: number) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border border-zinc-800">
                    <img src={img.imageUrl} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ALL DATA FIELDS */}
          <div className="w-full md:w-7/12 p-8 md:p-12 space-y-10">
            
            {/* Header: Name & Price */}
            <div className="border-b border-zinc-800 pb-6">
              <h4 className="text-[#5a3e00] tracking-[0.4em] text-[10px] font-black mb-2 uppercase italic">
                Vault Record #{product.id}
              </h4>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 italic leading-tight">
                {product.name}
              </h2>
              <p className="text-[#5a3e00] text-3xl font-serif italic font-light tracking-tight">
                ${formattedPrice}
              </p>
            </div>

            {/* Section 1: Core Specifications */}
            <div className="space-y-6">
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2 opacity-50">
                <PackageSearch size={14} /> Core Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                <DetailItem icon={<Layers size={16}/>} label="Hair Type" value={product.hairType} />
                <DetailItem icon={<Tag size={16}/>} label="Texture" value={product.texture} />
                <DetailItem icon={<ExternalLink size={16}/>} label="Origin" value={product.origin} />
                <DetailItem icon={<Settings size={16}/>} label="Processing" value={product.processing} />
              </div>
            </div>

            {/* Section 2: Customization & Variants */}
            <div className="space-y-6 pt-4">
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2 opacity-50">
                <Palette size={14} /> Available Variations
              </h3>
              <div className="space-y-4">
                <DetailItem 
                  icon={<Ruler size={16}/>} 
                  label="Available Inches" 
                  value={product.inches.length > 0 ? product.inches.map((i: any) => i.inches).join(', ') + '"' : 'N/A'} 
                />
                <DetailItem 
                  icon={<Palette size={16}/>} 
                  label="Available Colors" 
                  value={product.colors.length > 0 ? product.colors.map((c: any) => c.color).join(', ') : 'N/A'} 
                />
                <DetailItem 
                  icon={<Database size={16}/>} 
                  label="Additional Options" 
                  value={product.options} 
                />
              </div>
            </div>

            {/* Section 3: Inventory Status */}
            <div className="bg-black/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-[#5a3e00] text-[10px] uppercase tracking-[0.3em] font-black">Stock Control</h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-between">
                <DetailItem 
                  icon={<Calendar size={16}/>} 
                  label="Availability" 
                  value={product.availability === 'in_hand' ? 'Immediate Shipping' : 'Custom Pre-Order'} 
                />
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 uppercase text-[10px] tracking-widest font-bold">In Hand:</span>
                  <span className={`text-lg font-bold ${product.quantityInHand > 0 ? 'text-white' : 'text-zinc-600'}`}>
                    {product.quantityInHand || 0} Pieces
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Action Hint */}
            <div className="pt-4 text-center">
              <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                System record last synchronized successfully
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | number | null }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-zinc-500">
        <span className="text-[#5a3e00]">{icon}</span>
        <span className="text-[9px] uppercase tracking-widest font-black">{label}</span>
      </div>
      <span className="text-white text-sm font-medium pl-6">
        {value && value !== "" ? value : <span className="text-zinc-700 italic font-light">Not Specified</span>}
      </span>
    </div>
  )
}