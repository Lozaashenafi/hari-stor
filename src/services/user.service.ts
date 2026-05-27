'use server'

import { db } from "@/db"
import { profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth/auth"
import { headers } from "next/headers"

export async function getAllAdmins() {
  return await db.select().from(profiles);
}

export async function deleteAdminUser(userId: string) {
  try {
    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    })

    await db.delete(profiles).where(eq(profiles.id, userId));

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error("Delete User Error:", error);
    return { success: false, error: error.message };
  }
}
