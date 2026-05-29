'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { db } from "@/db"
import { gallery } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"

export async function getGalleryImages() {
  noStore();
  return await db.select().from(gallery).orderBy(desc(gallery.id));
}

// Updated to handle File directly if needed, or just save the URL
export async function addGalleryImage(title: string, imageUrl: string) {
  try {
    // Expecting imageUrl to be the Vercel Blob URL
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
    // 1. Find the image to get the URL
    const [image] = await db.select().from(gallery).where(eq(gallery.id, id));
    
    if (image) {
      // 2. Delete from Vercel Blob
      await del(image.imageUrl);
    }

    // 3. Delete from DB
    await db.delete(gallery).where(eq(gallery.id, id));
    
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}