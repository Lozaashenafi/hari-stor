import {InputGroup } from 'lucide-react'




export default function CompanyProfilePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl text-white mb-8">Brand Identity</h1>
      <form className="space-y-6 bg-zinc-950 p-8 border border-white/5 rounded-2xl">
        <InputGroup label="Store Name" defaultValue="ShallyLuxe" />
        <InputGroup label="WhatsApp Number" placeholder="+123..." />
        <InputGroup label="Instagram Username" placeholder="@shallyluxe" />
        <InputGroup label="TikTok Username" placeholder="@shallyluxe" />
        <InputGroup label="Physical Location" placeholder="123 Luxury St, Paris" />
        
        <button className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all uppercase text-[10px] tracking-widest font-bold border border-white/5">
          Update Profile
        </button>
      </form>
    </div>
  )
}