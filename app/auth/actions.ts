'use server'

import { createClient } from '@/lib/supabase/server' // Use SERVER client
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'

/* =========================
   1. LOGIN
========================= */
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
export async function createNewAdmin(formData: FormData) {
  const supabase = await createClient() // To check if CURRENT user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  // Use supabaseAdmin (Service Role) to create user without logging out
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true 
  })

  if (error) return { error: error.message }

  if (data.user) {
    await db.insert(profiles).values({
      id: data.user.id,
      email: email,
      displayName: displayName,
    })
  }

  revalidatePath('/admin/users')
  return { success: "Admin created successfully" }
}
/* =========================
   2. REGISTER (SIGN UP)
========================= */
export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  // 1. Create the user in Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
     options: {
      // This tells Supabase NOT to redirect to a confirmation page
      emailRedirectTo: undefined, 
    }
  })

  if (error) {
    return { error: error.message }
  }

  // 2. Add extra info to our profiles table
  if (data.user) {
    try {
      await db.insert(profiles).values({
        id: data.user.id,
        email: email,
        displayName: displayName,
      })
    } catch (dbError) {
      console.error("DB Error during registration:", dbError)
      // We don't return error here because the Auth account was already created
    }
  }

  // 3. Redirect to the main site or dashboard
  redirect('/') 
}

/* =========================
   3. LOGOUT
========================= */
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

/* =========================
   4. CHANGE PASSWORD
========================= */
export async function changePassword(formData: FormData) {
  const supabase = await createClient()
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) return { error: error.message }
  
  return { success: "Password updated successfully" }
}

/* =========================
   5. UPDATE PROFILE INFO
========================= */
export async function updateProfileInfo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const displayName = formData.get('displayName') as string

  try {
    await db.update(profiles)
      .set({ displayName, updatedAt: new Date() })
      .where(eq(profiles.id, user.id))
    
    revalidatePath('/admin/profile')
    return { success: "Profile updated" }
  } catch (err) {
    return { error: "Failed to update database" }
  }
}