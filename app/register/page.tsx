'use client'
import { useState } from 'react'
import { register } from '../auth/actions'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)
    const res = await register(formData)
    if (res?.error) {
      setErrorMsg(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5a3e00]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5a3e00]/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-[#5a3e00] text-2xl font-bold tracking-[0.3em] inline-block mb-2">
            LUXE HAIR
          </Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Join the Elite Collection</p>
        </div>

        <div className="bg-zinc-950 border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl">
          <h1 className="font-serif text-3xl text-white mb-8 text-center italic font-light">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest p-3 rounded-lg text-center">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Full Name</label>
              <input 
                name="displayName"
                type="text" 
                placeholder="Jane Doe" 
                className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#5a3e00] transition-colors placeholder:text-zinc-800 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                placeholder="jane@example.com" 
                className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#5a3e00] transition-colors placeholder:text-zinc-800 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Secure Password</label>
              <input 
                name="password"
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#5a3e00] transition-colors placeholder:text-zinc-800 text-sm"
                required
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#5a3e00] text-black font-bold py-4 rounded-xl hover:bg-[#D4B26E] transition-all transform active:scale-[0.98] disabled:opacity-50 mt-4 tracking-[0.2em] uppercase text-[10px]"
            >
              {loading ? 'Creating Account...' : 'Join Now'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              Already a member?{' '}
              <Link href="/login" className="text-[#5a3e00] hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}