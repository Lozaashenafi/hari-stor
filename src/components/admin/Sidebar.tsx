'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Building2, Menu, X, Users, ImageIcon } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setIsOpen(false), [pathname])

  const links = [
    { href: '/admin', icon: <LayoutDashboard size={16}/>, label: 'Dashboard' },
    { href: '/admin/products', icon: <ShoppingBag size={16}/>, label: 'Products' },
    { href: '/admin/users', icon: <Users size={16}/>, label: 'Manage Team' },
    { href: '/admin/gallery', icon: <ImageIcon size={16}/>, label: 'Gallery' },
    { href: '/admin/profile', icon: <Building2 size={16}/>, label: 'Brand Info' },
  ]

  const panelStyle: React.CSSProperties = {
    background: '#d4d0c8',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    width: 200,
    minHeight: '100vh',
    borderRight: '2px solid',
    borderColor: '#ffffff #808080 #808080 #ffffff',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-2 sticky top-0 z-50" style={{
        background: '#d4d0c8',
        borderBottom: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
      }}>
        <span style={{ fontWeight: 'bold', fontSize: 13, color: '#000080' }}>HARI STOR ADMIN</span>
        <button onClick={() => setIsOpen(!isOpen)} style={{
          background: '#d4d0c8',
          border: '2px solid',
          borderColor: '#ffffff #808080 #808080 #ffffff',
          padding: '2px 6px',
          cursor: 'pointer',
          fontSize: 12,
        }}>
          {isOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-200 ease-in-out
      `} style={panelStyle}>

        {/* Logo / Title area */}
        <div style={{
          background: 'linear-gradient(to right, #000080, #1084d0)',
          padding: '6px 8px',
        }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, fontFamily: '"Trebuchet MS", Arial, sans-serif' }}>
            Hari Stor Admin
          </span>
        </div>

        {/* Computer icon section */}
        <div style={{
          padding: '12px 8px 8px',
          borderBottom: '1px solid #808080',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            width: 32, height: 32,
            background: '#d4d0c8',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🖥</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: '#000' }}>My Computer</div>
            <div style={{ fontSize: 10, color: '#666' }}>Administrator</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '4px 0' }}>
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 10px',
                  fontSize: 12,
                  color: isActive ? '#fff' : '#000',
                  background: isActive ? '#000080' : 'transparent',
                  textDecoration: 'none',
                  borderLeft: isActive ? '3px solid #ffffff' : '3px solid transparent',
                  fontFamily: '"MS Sans Serif", Arial, sans-serif',
                }}
              >
                <span style={{ color: isActive ? '#fff' : '#444', flexShrink: 0 }}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #808080', margin: '0 8px' }} />
        <div style={{ borderTop: '1px solid #ffffff', margin: '0 8px 4px' }} />

        {/* Logout */}
        <div style={{ padding: '4px 8px 12px' }}>
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
