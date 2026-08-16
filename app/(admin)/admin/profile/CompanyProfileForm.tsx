'use client'
import { useState } from 'react'
import { updateCompanyProfile } from '@/services/company.service'
import { Icons } from '@/components/ui/Icons' // Import our custom icons
import type { CompanyProfile } from '@/lib/types'

export default function CompanyProfileForm({ profile }: { profile: CompanyProfile | null }) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const get = (key: string): string | null => {
      const v = formData.get(key)
      return v === null ? null : String(v)
    }
    const payload = {
      name: get('name'),
      phone: get('phone'),
      whatsapp: get('whatsapp'),
      instagram: get('instagram'),
      tiktok: get('tiktok'),
      location: get('location'),
      contactInfo: get('contactInfo'),
    }

    const res = await updateCompanyProfile(payload)
    if (res.success) setSaved(true)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-700 space-y-6">
          <InputGroup label="Business Name" name="name" icon={<Icons.Globe />} defaultValue={profile?.name ?? ''} />
          <InputGroup label="Location" name="location" icon={<Icons.MapPin />} defaultValue={profile?.location ?? ''} />
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <Icons.Info className="text-[#5a3e00]"/> Description
            </label>
            <textarea name="contactInfo" defaultValue={profile?.contactInfo ?? ''} rows={4} className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-white text-sm focus:border-[#5a3e00] outline-none" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-700 space-y-6">
          <InputGroup label="Phone" name="phone" icon={<Icons.Phone />} defaultValue={profile?.phone ?? ''} />
          <InputGroup label="WhatsApp" name="whatsapp" icon={<Icons.WhatsApp />} defaultValue={profile?.whatsapp ?? ''} />
          <InputGroup label="Instagram" name="instagram" icon={<Icons.Instagram />} defaultValue={profile?.instagram ?? ''} />
          <InputGroup label="TikTok" name="tiktok" icon={<Icons.TikTok />} defaultValue={profile?.tiktok ?? ''} />
        </div>
      </div>

      <button disabled={loading} className="w-full bg-[#5a3e00] text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-xs">
        {loading ? 'SAVING...' : <><Icons.Save /> SAVE CHANGES</>}
      </button>

      {saved && (
        <p className="text-center text-[10px] uppercase tracking-widest text-[#5a3e00] font-black">Identity Saved</p>
      )}
    </form>
  )
}

function InputGroup({ label, icon, ...props }: { label: string; icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
        <span className="text-[#5a3e00]">{icon}</span> {label}
      </label>
      <input className="w-full bg-zinc-800 border border-zinc-600 p-4 rounded-xl text-sm text-white focus:border-[#5a3e00] outline-none transition-all" {...props} />
    </div>
  )
}