'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { authClient } from '@/auth/client'

type AuthUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
} | null

const AuthContext = createContext<{ user: AuthUser; loading: boolean }>({
  user: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          image: data.user.image,
        })
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
