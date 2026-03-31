'use server'

import { db } from "@/db"
import { gallery } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getGalleryImages() {
  return await db.select().from(gallery).orderBy(desc(gallery.id));
}

export async function addGalleryImage(title: string, imageUrl: string) {
  try {
    await db.insert(gallery).values({ title, imageUrl });
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteGalleryImage(id: number) {
  try {
    await db.delete(gallery).where(eq(gallery.id, id));
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}