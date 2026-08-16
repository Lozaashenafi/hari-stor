'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Building2, Menu, X, Users, ImageIcon } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsOpen(false)

  const links = [
    { href: '/admin', icon: <LayoutDashboard size={20}/>, label: 'Dashboard' },
    { href: '/admin/products', icon: <ShoppingBag size={20}/>, label: 'Products' },
    { href: '/admin/users', icon: <Users size={20}/>, label: 'Manage Team' },
        { href: '/admin/gallery', icon: <ImageIcon size={20}/>, label: 'Gallery' },
    { href: '/admin/profile', icon: <Building2 size={20}/>, label: 'Brand Info' },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-white/5 sticky top-0 z-50">
 <Link href="/" className="text-[#5a3e00] text-2xl font-bold tracking-[0.2em]">
          LUXE ADMIN
          </Link>        <button onClick={() => setIsOpen(!isOpen)} className="text-[#5a3e00] p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-white/5 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 hidden lg:block">
          <Link href="/" className="text-[#5a3e00] text-2xl font-bold tracking-[0.2em]">
          LUXE ADMIN
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={closeMenu}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                pathname === link.href 
                ? 'bg-[#5a3e00] text-black font-bold shadow-lg shadow-gold/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={pathname === link.href ? 'text-black' : 'text-gray-500 group-hover:text-[#5a3e00]'}>
                {link.icon}
              </span>
              <span className="text-xs uppercase tracking-[0.2em]">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
           <LogoutButton />
        </div>
      </aside>
    </>
  )
}