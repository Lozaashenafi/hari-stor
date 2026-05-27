import Sidebar from '@/components/admin/Sidebar'
import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/login')

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050505]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
