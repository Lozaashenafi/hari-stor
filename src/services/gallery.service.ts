'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { db } from "@/db"
import { gallery } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth-guard"
import { deleteStoredFile } from "@/lib/blob"
import { gallerySchema } from "@/lib/validation"

export async function getGalleryImages() {
  noStore();
  return await db.select().from(gallery).orderBy(desc(gallery.id));
}

export async function addGalleryImage(title: string, imageUrl: string) {
  try {
    await requireAdmin();
    const parsed = gallerySchema.parse({ title, imageUrl });
    const [created] = await db.insert(gallery).values(parsed).returning();
    
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return { success: true, image: created };
  } catch (error) {
    console.error("Add Gallery Image Error:", error);
    return { success: false };
  }
}

export async function deleteGalleryImage(id: number) {
  try {
    await requireAdmin();
    // 1. Find the image to get the URL
    const [image] = await db.select().from(gallery).where(eq(gallery.id, id));
    
    if (image) {
      // 2. Delete from Vercel Blob
      await deleteStoredFile(image.imageUrl);
    }

    // 3. Delete from DB
    await db.delete(gallery).where(eq(gallery.id, id));
    
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return { success: true };
  } catch {
    return { success: false };
  }
}