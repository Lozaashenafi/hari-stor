'use client'
import { useState } from 'react'
import { deleteAdminUser } from '@/services/user.service'
import { Trash2, ShieldCheck, Mail } from 'lucide-react'

export default function UserListClient({ users }: { users: any[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(userId: string, email: string) {
    if (!confirm(`Revoke all access for ${email}? This cannot be undone.`)) return
    
    setDeletingId(userId)
    const res = await deleteAdminUser(userId)
    if (!res.success) alert(res.error)
    setDeletingId(null)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-black/40 border-b border-zinc-700 text-[10px] uppercase tracking-[0.2em] text-[#5a3e00] font-black">
            <tr>
              <th className="px-8 py-6">Administrator</th>
              <th className="px-6 py-6">Access Level</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#5a3e00] rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                      {user.displayName?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{user.displayName}</div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 lowercase">
                        <Mail size={10}/> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                    <ShieldCheck size={14} className="text-[#5a3e00]"/> Full Admin
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    disabled={deletingId === user.id}
                    onClick={() => handleDelete(user.id, user.email)}
                    className="p-3 bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-red-400 hover:border-red-400/30 rounded-xl transition-all disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}