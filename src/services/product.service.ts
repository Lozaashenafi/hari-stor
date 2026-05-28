'use server'

import { db } from "@/db"
import { hairProducts, hairImages, hairColors, hairInches, categories } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"; // ADD THIS

/* =========================
   NEW: IMAGE UPLOAD ACTION
========================= */
export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error("No file provided");

  // Upload to Vercel Blob
  const blob = await put(`products/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });

  return blob.url; // This returns the permanent https:// link
}

/* =========================
   1. CATEGORY ACTIONS
========================= */
export async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProductsByCategory(slug: string) {
  try {
    if (!slug) return [];

    const categoryRecord = await db.query.categories.findFirst({
      where: (cat, { sql }) => sql`LOWER(${cat.name}) = ${slug.toLowerCase()}`,
    });

    if (!categoryRecord) return [];

    return await db.query.hairProducts.findMany({
      where: eq(hairProducts.categoryId, categoryRecord.id),
      with: {
        category: true,
        images: true,
        colors: true,
        inches: true,
      },
      orderBy: [desc(hairProducts.id)],
    });
  } catch (error) {
    return [];
  }
}

/* =========================
   2. CREATE PRODUCT
========================= */
export async function createHairProduct(data: any) {
  try {
    // Note: 'data.images' should now be an array of Cloud URLs (https://...)
    return await db.transaction(async (tx) => {
      const [product] = await tx.insert(hairProducts).values({
        name: data.name,
        categoryId: data.categoryId,
        texture: data.texture,
        hairType: data.hairType,
        origin: data.origin,
        processing: data.processing,
        options: data.options,
        price: data.price,
        isOnSale: data.isOnSale || false,
        previousPrice: null,
        availability: data.availability || 'in_hand',
        quantityInHand: data.quantityInHand || 0,
      }).returning();

      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(
          data.images.map((url: string) => ({ productId: product.id, imageUrl: url }))
        );
      }

      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(
          data.colors.map((c: string) => ({ productId: product.id, color: c }))
        );
      }

      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(
          data.inches.map((i: any) => ({ 
            productId: product.id, 
            inches: parseInt(i.value), 
            additionalPrice: i.extra 
          }))
        );
      }

      revalidatePath('/admin/products');
      revalidatePath('/');
      return { success: true };
    });
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false };
  }
}

/* ... updateHairProduct, getProductById, getAdminProducts (Keep same as your original) ... */
export async function deleteProduct(id: number) {
  try {
    // 1. Get images from DB to find the URLs
    const images = await db.select().from(hairImages).where(eq(hairImages.productId, id));
    
    // 2. Delete each image from Vercel Cloud
    for (const img of images) {
      await del(img.imageUrl);
    }

    // 3. Delete from Database
    await db.delete(hairProducts).where(eq(hairProducts.id, id));
    
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

/* =========================
   3. UPDATE PRODUCT
========================= */
export async function updateHairProduct(id: number, data: any) {
  try {
    const currentProduct = await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
    });

    let previousPrice = currentProduct?.previousPrice;
    if (currentProduct && currentProduct.price !== data.price) {
      previousPrice = currentProduct.price;
    }

    return await db.transaction(async (tx) => {
      // Update Main
      await tx.update(hairProducts)
        .set({
          name: data.name,
          categoryId: data.categoryId, // Updated
          texture: data.texture,
          hairType: data.hairType,
          origin: data.origin,
          processing: data.processing,
          options: data.options,
          price: data.price,
          previousPrice: previousPrice,
          isOnSale: data.isOnSale,
          availability: data.availability || 'in_hand',
          quantityInHand: data.quantityInHand || 0,
        })
        .where(eq(hairProducts.id, id));

      // Refresh Images
      await tx.delete(hairImages).where(eq(hairImages.productId, id));
      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(data.images.map((url: string) => ({ productId: id, imageUrl: url })));
      }

      // Refresh Colors
      await tx.delete(hairColors).where(eq(hairColors.productId, id));
      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(data.colors.map((c: string) => ({ productId: id, color: c })));
      }

      // Refresh Inches (Updated for Dynamic Pricing)
      await tx.delete(hairInches).where(eq(hairInches.productId, id));
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(
          data.inches.map((i: any) => ({ 
            productId: id, 
            inches: parseInt(i.value), 
            additionalPrice: i.extra 
          }))
        );
      }

      revalidatePath('/admin/products');
      return { success: true };
    });
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false };
  }
}

/* =========================
   4. FETCHING ACTIONS
========================= */

// Get single product with category and relations
export async function getProductById(id: number) {
  try {
    return await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
      with: {
        category: true, // Included Category
        images: true,
        colors: true,
        inches: true,
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all products for admin table
export async function getAdminProducts() {
  try {
    return await db.query.hairProducts.findMany({
      with: {
        category: true, // Included Category
        images: true,
        colors: true,
        inches: true,
      },
      orderBy: [desc(hairProducts.id)],
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

/* =========================
   5. DASHBOARD & DELETE
========================= */

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
      inventoryValue: Number(stats.totalValue || 0) / 100 
    };
  } catch (error) {
    console.error("Stats Error:", error);
    return { totalProducts: 0, inHandCount: 0, inventoryValue: 0 };
  }
}
