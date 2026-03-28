import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Building2, LogOut } from 'lucide-react'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex h-screen bg-[#050505] text-gray-300 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col">
        <div className="p-8">
          <Link href="/" className="text-[#C5A059] text-xl font-bold tracking-[0.2em]">
            LUXE ADMIN
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm uppercase tracking-widest font-light">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={18}/>} label="Dashboard" />
          <SidebarLink href="/admin/products" icon={<ShoppingBag size={18}/>} label="Products" />
          <SidebarLink href="/admin/profile" icon={<Building2 size={18}/>} label="Company Info" />
        </nav>

        <div className="p-6 border-t border-white/5">
           <LogoutButton />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 hover:text-[#C5A059] transition-all group">
      <span className="text-gray-500 group-hover:text-[#C5A059]">{icon}</span>
      {label}
    </Link>
  )
}