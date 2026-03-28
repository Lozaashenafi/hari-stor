'use server'
import { db } from "@/db"
import { hairProducts, hairImages, hairColors, hairInches } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createHairProduct(data: any) {
  try {
    return await db.transaction(async (tx) => {
      // 1. Insert Main Product
      const [product] = await tx.insert(hairProducts).values({
        name: data.name,
        texture: data.texture,
        hairType: data.hairType,
        origin: data.origin,
        price: parseInt(data.price),
        availability: data.availability, // 'in_hand' | 'order'
        quantityInHand: data.quantityInHand ? parseInt(data.quantityInHand) : 0,
      }).returning();

      // 2. Insert Images (URLs as strings)
      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(
          data.images.map((url: string) => ({ productId: product.id, imageUrl: url }))
        );
      }

      // 3. Insert Colors
      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(
          data.colors.map((c: string) => ({ productId: product.id, color: c }))
        );
      }

      // 4. Insert Inches
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(
          data.inches.map((i: string) => ({ productId: product.id, inches: parseInt(i) }))
        );
      }

      revalidatePath('/admin/products')
      return { success: true };
    });
  } catch (error) {
    console.error("DB Error:", error);
    return { success: false, error: "Failed to create product" };
  }
}