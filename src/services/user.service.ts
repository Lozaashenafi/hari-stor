'use server'

import { db } from "@/db"
import { user, profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth/auth"
import { headers } from "next/headers"

export async function getAllAdmins() {
  return await db.select({
    id: user.id,
    email: user.email,
    displayName: user.name,
  }).from(user).where(eq(user.role, 'admin'));
}

export async function deleteAdminUser(userId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== 'admin') {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    })

    await db.delete(profiles).where(eq(profiles.id, userId));

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    console.error("Delete User Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete user" };
  }
}
