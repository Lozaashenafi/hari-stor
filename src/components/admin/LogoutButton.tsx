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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: '#d4d0c8',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        padding: '4px 10px',
        width: '100%',
        cursor: 'pointer',
        fontSize: 11,
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        color: '#000',
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff',
        justifyContent: 'flex-start',
      }}
    >
      <LogOut size={14} />
      <span>Sign Out</span>
    </button>
  )
}
