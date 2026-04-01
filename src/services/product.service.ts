'use server'
import { db } from "@/db"
import { hairProducts, hairImages, hairColors, hairInches } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache"

export async function createHairProduct(data: any) {
  try {
    return await db.transaction(async (tx) => {
      const [product] = await tx.insert(hairProducts).values({
        name: data.name,
        texture: data.texture,
        hairType: data.hairType,
        origin: data.origin,
        processing: data.processing,
        options: data.options,
        price: data.price,
        isOnSale: data.isOnSale || false,
        previousPrice: null, // New products don't have a history yet
        availability: data.availability || 'in_hand', // Safety fallback
        quantityInHand: data.quantityInHand || 0,
      }).returning();

      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(
          data.images.map((url: string) => ({ productId: product.id, imageUrl: url }))
        );
      }
      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(data.colors.map((c: string) => ({ productId: product.id, color: c })));
      }
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(data.inches.map((i: string) => ({ productId: product.id, inches: parseInt(i) })));
      }

      revalidatePath('/admin/products');
      return { success: true };
    });
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false };
  }
}

export async function updateHairProduct(id: number, data: any) {
  try {
    const currentProduct = await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
    });

    let previousPrice = currentProduct?.previousPrice;
    // If price changed, move current price to history
    if (currentProduct && currentProduct.price !== data.price) {
      previousPrice = currentProduct.price;
    }

    return await db.transaction(async (tx) => {
      await tx.update(hairProducts)
        .set({
          name: data.name,
          texture: data.texture,
          hairType: data.hairType,
          origin: data.origin,
          processing: data.processing,
          options: data.options,
          price: data.price,
          previousPrice: previousPrice,
          isOnSale: data.isOnSale,
          availability: data.availability || 'in_hand', // Fixes the NULL error
          quantityInHand: data.quantityInHand || 0,
        })
        .where(eq(hairProducts.id, id));

      // Refresh relations
      await tx.delete(hairImages).where(eq(hairImages.productId, id));
      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(data.images.map((url: string) => ({ productId: id, imageUrl: url })));
      }
      await tx.delete(hairColors).where(eq(hairColors.productId, id));
      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(data.colors.map((c: string) => ({ productId: id, color: c })));
      }
      await tx.delete(hairInches).where(eq(hairInches.productId, id));
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(data.inches.map((i: string) => ({ productId: id, inches: parseInt(i) })));
      }

      revalidatePath('/admin/products');
      return { success: true };
    });
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false };
  }
}
export async function getDashboardStats() {
  try {
    const [stats] = await db.select({
      totalProducts: sql<number>`count(*)`,
      inHandCount: sql<number>`count(*) filter (where ${hairProducts.availability} = 'in_hand')`,
      totalValue: sql<number>`sum(${hairProducts.price})`,
    }).from(hairProducts);

    return {
      totalProducts: Number(stats.totalProducts || 0),
      inHandCount: Number(stats.inHandCount || 0),
      // Convert cents to dollars
      inventoryValue: Number(stats.totalValue || 0) / 100 
    };
  } catch (error) {
    console.error("Stats Error:", error);
    return { totalProducts: 0, inHandCount: 0, inventoryValue: 0 };
  }
}
export async function getProductById(id: number) {
  try {
    const product = await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
      with: {
        images: true,
        colors: true,
        inches: true,
      },
    });
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all products with their relations

export async function getAdminProducts() {
  const data = await db.query.hairProducts.findMany({
    with: {
      images: true, // <--- MAKE SURE THIS IS HERE
      colors: true, 
      inches: true,
    },
    orderBy: [desc(hairProducts.id)],
  });
  
  return data;
}

// Delete a product
export async function deleteProduct(id: number) {
  try {
    // Cascading delete in schema handles images/colors/inches automatically
    await db.delete(hairProducts).where(eq(hairProducts.id, id));
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}