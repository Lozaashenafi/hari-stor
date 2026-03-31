'use server'

import { db } from "@/db"
import { companyProfile } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// 1. Get the single brand record
export async function getCompanyProfile() {
  try {
    const profile = await db.select().from(companyProfile).limit(1)
    return profile[0] || null
  } catch (error) {
    console.error("Fetch Profile Error:", error)
    return null
  }
}

// 2. Update or Create the record (Upsert)
export async function updateCompanyProfile(data: any) {
  try {
    const existing = await db.select().from(companyProfile).limit(1)

    if (existing.length > 0) {
      // UPDATE
      await db.update(companyProfile)
        .set(data)
        .where(eq(companyProfile.id, existing[0].id))
    } else {
      // CREATE the first ever record
      await db.insert(companyProfile).values(data)
    }

    revalidatePath('/admin/profile')
    revalidatePath('/') // Revalidate home page too since it uses this info
    return { success: true }
  } catch (error) {
    console.error("Update Profile Error:", error)
    return { success: false }
  }
}