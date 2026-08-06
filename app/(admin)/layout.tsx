import Sidebar from '@/components/admin/Sidebar'
import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/login')

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" style={{ background: '#008080', fontFamily: '"MS Sans Serif", Arial, sans-serif' }}>
      <Sidebar />
      {/* Main window frame */}
      <div className="flex-1 p-2 lg:p-3 overflow-y-auto">
        {/* Window chrome */}
        <div style={{
          background: '#d4d0c8',
          border: '2px solid',
          borderColor: '#ffffff #808080 #808080 #ffffff',
          boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, 1px 1px 0 #000',
          minHeight: 'calc(100vh - 1.5rem)',
        }}>
          {/* Window Title Bar */}
          <div style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            padding: '3px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="/win2k-icon.ico" alt="" style={{ width: 16, height: 16 }} onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '11px', fontFamily: '"Trebuchet MS", Arial, sans-serif', letterSpacing: '0.02em' }}>
                Hari Stor — Administration Console
              </span>
            </div>
            {/* Window control buttons */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {['_', '□', '✕'].map((btn, i) => (
                <div key={i} style={{
                  width: 16, height: 14,
                  background: '#d4d0c8',
                  border: '1px solid',
                  borderColor: '#ffffff #808080 #808080 #ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 'bold', cursor: 'default',
                  color: '#000',
                }}>{btn}</div>
              ))}
            </div>
          </div>

          {/* Menu Bar */}
          <div style={{
            background: '#d4d0c8',
            borderBottom: '1px solid #808080',
            padding: '2px 4px',
            display: 'flex',
            gap: '0px',
          }}>
            {['File', 'Edit', 'View', 'Tools', 'Help'].map((item) => (
              <span key={item} style={{
                padding: '2px 8px',
                fontSize: '11px',
                cursor: 'default',
                color: '#000',
                fontFamily: '"MS Sans Serif", Arial, sans-serif',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#000080'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
              >{item}</span>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ padding: '8px', background: '#d4d0c8' }}>
            {children}
          </div>

          {/* Status Bar */}
          <div style={{
            borderTop: '1px solid #808080',
            padding: '2px 8px',
            display: 'flex',
            gap: '4px',
            background: '#d4d0c8',
          }}>
            <div style={{
              flex: 1,
              border: '1px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              padding: '1px 4px',
              fontSize: '11px',
              color: '#000',
            }}>Ready</div>
            <div style={{
              width: 120,
              border: '1px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              padding: '1px 4px',
              fontSize: '11px',
              color: '#000',
              textAlign: 'center',
            }}>Admin Mode</div>
          </div>
        </div>
      </div>
    </div>
  )
}
