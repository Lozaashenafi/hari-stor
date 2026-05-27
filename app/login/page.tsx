'use client'
import { useState } from 'react'
import { authClient } from '@/auth/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await authClient.signIn.email({ email, password })

    if (error) {
      setErrorMsg(error.message || 'Login failed')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5a3e00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-[#5a3e00] text-2xl font-bold tracking-[0.3em] inline-block mb-2">
            LUXE HAIR
          </Link>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Administrative Portal</p>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
          <h1 className="font-serif text-3xl text-white mb-8 text-center">Admin Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="admin@shallyluxe.com"
                className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#5a3e00] transition-colors placeholder:text-gray-800 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#5a3e00] transition-colors placeholder:text-gray-800 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#5a3e00] text-black font-bold py-4 rounded-xl hover:bg-[#D4B26E] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 tracking-widest uppercase text-xs"
            >
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-600 hover:text-[#5a3e00] text-[10px] uppercase tracking-widest transition-colors">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
