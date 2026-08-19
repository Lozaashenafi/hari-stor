'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { db } from "@/db"
import { hairProducts, hairImages, hairColors, hairInches, categories } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth-guard";
import { deleteStoredFile } from "@/lib/blob";
import { productSchema, type ProductInput } from "@/lib/validation";

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
  noStore();
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
  } catch {
    return [];
  }
}

/* =========================
   2. CREATE PRODUCT
========================= */
export async function createHairProduct(data: ProductInput) {
  try {
    await requireAdmin();
    const parsed = productSchema.parse(data)

    // Sequential inserts (no transaction needed — FK constraints ensure integrity)
    const [product] = await db.insert(hairProducts).values({
      name: parsed.name,
      categoryId: parsed.categoryId,
      texture: parsed.texture,
      hairType: parsed.hairType,
      origin: parsed.origin,
      processing: parsed.processing,
      options: parsed.options,
      price: parsed.price,
      isOnSale: parsed.isOnSale,
      previousPrice: null,
      availability: parsed.availability,
      quantityInHand: parsed.quantityInHand,
    }).returning();

    if (parsed.images.length > 0) {
      await db.insert(hairImages).values(
        parsed.images.map((url: string) => ({ productId: product.id, imageUrl: url }))
      );
    }

    if (parsed.colors.length > 0) {
      await db.insert(hairColors).values(
        parsed.colors.map((c: string) => ({ productId: product.id, color: c }))
      );
    }

    if (parsed.inches.length > 0) {
      await db.insert(hairInches).values(
        parsed.inches.map((i) => ({ 
          productId: product.id, 
          inches: i.value, 
          additionalPrice: i.extra 
        }))
      );
    }

    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false };
  }
}

export async function deleteProduct(id: number) {
  try {
    await requireAdmin();
    const images = await db.select().from(hairImages).where(eq(hairImages.productId, id));

    for (const img of images) {
      await deleteStoredFile(img.imageUrl);
    }

    await db.delete(hairProducts).where(eq(hairProducts.id, id));

    revalidatePath('/admin/products');
    return { success: true };
  } catch {
    return { success: false };
  }
}

/* =========================
   3. UPDATE PRODUCT
========================= */
export async function updateHairProduct(id: number, data: ProductInput) {
  try {
    await requireAdmin();
    const parsed = productSchema.parse(data)

    const currentProduct = await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
    });

    // Capture existing images so we can remove any that are dropped from Blob
    const existingImages = await db
      .select()
      .from(hairImages)
      .where(eq(hairImages.productId, id));

    let previousPrice = currentProduct?.previousPrice;
    if (currentProduct && currentProduct.price !== parsed.price) {
      previousPrice = currentProduct.price;
    }

    // Sequential updates (ON DELETE CASCADE handles child cleanup)
    await db.update(hairProducts)
      .set({
        name: parsed.name,
        categoryId: parsed.categoryId,
        texture: parsed.texture,
        hairType: parsed.hairType,
        origin: parsed.origin,
        processing: parsed.processing,
        options: parsed.options,
        price: parsed.price,
        previousPrice: previousPrice,
        isOnSale: parsed.isOnSale,
        availability: parsed.availability,
        quantityInHand: parsed.quantityInHand,
      })
      .where(eq(hairProducts.id, id));

    // Refresh Images
    await db.delete(hairImages).where(eq(hairImages.productId, id));
    if (parsed.images.length > 0) {
      await db.insert(hairImages).values(parsed.images.map((url: string) => ({ productId: id, imageUrl: url })));
    }

    // Refresh Colors
    await db.delete(hairColors).where(eq(hairColors.productId, id));
    if (parsed.colors.length > 0) {
      await db.insert(hairColors).values(parsed.colors.map((c: string) => ({ productId: id, color: c })));
    }

    // Refresh Inches
    await db.delete(hairInches).where(eq(hairInches.productId, id));
    if (parsed.inches.length > 0) {
      await db.insert(hairInches).values(
        parsed.inches.map((i) => ({ 
          productId: id, 
          inches: i.value, 
          additionalPrice: i.extra 
        }))
      );
    }

    revalidatePath('/admin/products');
    revalidatePath('/');
    const result = { success: true };

    // Remove any stored files that were dropped in this update
    const removed = existingImages.filter(
      (img) => !parsed.images.includes(img.imageUrl)
    );
    for (const img of removed) {
      await deleteStoredFile(img.imageUrl);
    }

    return result;
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
  noStore();
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
