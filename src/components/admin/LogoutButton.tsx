'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all group text-sm uppercase tracking-widest font-light"
    >
      <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
      Sign Out
    </button>
  )
}