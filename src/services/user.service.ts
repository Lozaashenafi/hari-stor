'use server'

import { db } from "@/db"
import { profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { supabaseAdmin } from "@/lib/supabase/admin" // Ensure you have the service_role client
import { revalidatePath } from "next/cache"

// 1. Get all admin profiles
export async function getAllAdmins() {
  return await db.select().from(profiles);
}

// 2. Delete User from both Supabase Auth and Drizzle
export async function deleteAdminUser(userId: string) {
  try {
    // A. Delete from Supabase Auth (Requires Service Role Key)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) throw authError;

    // B. Delete from Drizzle Profiles
    await db.delete(profiles).where(eq(profiles.id, userId));

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error("Delete User Error:", error);
    return { success: false, error: error.message };
  }
}