'use server'

import { auth } from '@/auth/auth'
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/* =========================
   1. LOGIN
========================= */
export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  console.log('login', { email, password })

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch (err: unknown) {
    return redirect('/login?error=' + encodeURIComponent(err instanceof Error ? err.message : 'Invalid credentials'))
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

/* =========================
   2. REGISTER (SIGN UP)
========================= */
export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  let user: { id: string } | null = null

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: displayName,
      },
      headers: await headers(),
    })
    user = result?.user ?? null
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Registration failed' }
  }

  if (user) {
    try {
      await db.insert(profiles).values({
        id: user.id,
        email: email,
        displayName: displayName,
      })
    } catch (dbError) {
      console.error("DB Error during registration:", dbError)
    }
  }

  redirect('/')
}

/* =========================
   3. CREATE NEW ADMIN
========================= */
export async function createNewAdmin(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== 'admin') return { error: "Unauthorized" }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  try {
    const result = await auth.api.createUser({
      body: {
        email,
        password,
        name: displayName,
        role: "admin",
      },
      headers: await headers(),
    })

    if (result?.user) {
      await db.insert(profiles).values({
        id: result.user.id,
        email: email,
        displayName: displayName,
      })
    }

    revalidatePath('/admin/users')
    return { success: "Admin created successfully" }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to create admin" }
  }
}

/* =========================
   4. LOGOUT
========================= */
export async function logout() {
  await auth.api.signOut({ headers: await headers() })
  revalidatePath('/', 'layout')
  redirect('/login')
}

/* =========================
   5. CHANGE PASSWORD
========================= */
export async function changePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    await auth.api.changePassword({
      body: { newPassword, currentPassword },
      headers: await headers(),
    })
    return { success: "Password updated successfully" }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Password change failed' }
  }
}

/* =========================
   6. UPDATE PROFILE INFO
========================= */
export async function updateProfileInfo(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "Not authenticated" }

  const displayName = formData.get('displayName') as string | null

  if (displayName) {
    try {
      await db.update(profiles)
        .set({ displayName, updatedAt: new Date() })
        .where(eq(profiles.id, session.user.id))

      revalidatePath('/admin/profile')
      return { success: "Profile updated" }
    } catch {
      return { error: "Failed to update database" }
    }
  }

  return { success: "Profile updated" }
}
