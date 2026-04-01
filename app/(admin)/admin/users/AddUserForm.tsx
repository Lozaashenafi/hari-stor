'use client'
import { useState } from 'react'
import { createNewAdmin } from '../../../auth/actions'
import { UserPlus, Loader2 } from 'lucide-react'

export default function AddUserForm() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await createNewAdmin(formData)

    if (res?.error) {
      setMsg({ type: 'error', text: res.error })
    } else {
      setMsg({ type: 'success', text: "Access Granted Successfully" })
      e.currentTarget.reset()
    }
    setLoading(false)
    setTimeout(() => setMsg({ type: '', text: '' }), 5000)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-[2.5rem] shadow-2xl sticky top-10">
      <h3 className="text-white font-serif text-2xl mb-6 italic">Enroll Admin</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {msg.text && (
          <div className={`p-4 rounded-xl text-[10px] uppercase tracking-widest font-bold text-center border ${
            msg.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
          }`}>
            {msg.text}
          </div>
        )}

        <InputGroup label="Full Name" name="displayName" type="text" required />
        <InputGroup label="Email Address" name="email" type="email" required />
        <InputGroup label="Temporary Password" name="password" type="password" required />

        <button 
          disabled={loading}
          className="w-full bg-[#5a3e00] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px] shadow-xl shadow-gold/10 hover:bg-[#D4B26E] transition-all disabled:opacity-30"
        >
          {loading ? <Loader2 className="animate-spin" size={18}/> : <><UserPlus size={18}/> Grant Access</>}
        </button>
      </form>
    </div>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black ml-1">{label}</label>
      <input 
        className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl text-sm text-white outline-none focus:border-[#5a3e00] transition-all"
        {...props}
      />
    </div>
  )
}