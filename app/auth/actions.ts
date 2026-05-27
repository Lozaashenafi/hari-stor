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

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch (err: any) {
    return redirect('/login?error=' + encodeURIComponent(err.message || 'Invalid credentials'))
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

  let user: any

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: displayName,
      },
      headers: await headers(),
    })
    user = result?.user
  } catch (err: any) {
    return { error: err.message }
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
  if (!session) return { error: "Unauthorized" }

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
  } catch (err: any) {
    return { error: err.message || "Failed to create admin" }
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
  } catch (err: any) {
    return { error: err.message }
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
    } catch (err) {
      return { error: "Failed to update database" }
    }
  }

  return { success: "Profile updated" }
}
