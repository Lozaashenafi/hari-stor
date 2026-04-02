
import { pgTable, serial, text, integer, uuid, timestamp } from "drizzle-orm/pg-core"; // Add uuid and timestamp

import { relations } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core"; // add boolean import

export const profiles = pgTable("profiles", {
  // This ID will match the Supabase User ID
  id: uuid("id").primaryKey().notNull(),
  
  email: text("email").notNull(),
  
  displayName: text("display_name"),
  
  avatarUrl: text("avatar_url"),

  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   Hair Products
========================= */

export const hairProducts = pgTable("hair_products", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  texture: text("texture"),
  hairType: text("hair_type"),
  origin: text("origin"),
  processing: text("processing"),

  options: text("options"),

  price: integer("price").notNull(),
  previousPrice: integer("previous_price"), // To store the old price
  isOnSale: boolean("is_on_sale").default(false).notNull(), // Sale toggle

  // Link to Category
  categoryId: integer("category_id")
    .references(() => categories.id, { onDelete: "set null" }),
  availability: text("availability").notNull(), // in_hand | order

  quantityInHand: integer("quantity_in_hand"),
});


/* =========================
   Hair Images
========================= */

export const hairImages = pgTable("hair_images", {
  id: serial("id").primaryKey(),

  productId: integer("product_id")
    .notNull()
    .references(() => hairProducts.id, { onDelete: "cascade" }),

  imageUrl: text("image_url").notNull(),
});


/* =========================
   Hair Colors
========================= */

export const hairColors = pgTable("hair_colors", {
  id: serial("id").primaryKey(),

  productId: integer("product_id")
    .notNull()
    .references(() => hairProducts.id, { onDelete: "cascade" }),

  color: text("color").notNull(),
});

/* =========================
   Categories (New Table)
========================= */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., Wigs, Bundles, Hair Care
});




/* =========================
   Hair Inches
========================= */

export const hairInches = pgTable("hair_inches", {
  id: serial("id").primaryKey(),

  productId: integer("product_id")
    .notNull()
    .references(() => hairProducts.id, { onDelete: "cascade" }),

  inches: integer("inches").notNull(),
    additionalPrice: integer("additional_price").default(0).notNull(), 

});


/* =========================
   Company Profile
========================= */

export const companyProfile = pgTable("company_profile", {
  id: serial("id").primaryKey(),

  name: text("name"),

  phone: text("phone"),

  whatsapp: text("whatsapp"),

  instagram: text("instagram"),

  tiktok: text("tiktok"),

  location: text("location"),

  contactInfo: text("contact_info"),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   Relations
========================= */
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(hairProducts),
}));

export const hairProductsRelations = relations(hairProducts, ({ one, many }) => ({
  category: one(categories, {
    fields: [hairProducts.categoryId],
    references: [categories.id],
  }),
  images: many(hairImages),
  colors: many(hairColors),
  inches: many(hairInches),
}));


export const hairImagesRelations = relations(hairImages, ({ one }) => ({
  product: one(hairProducts, {
    fields: [hairImages.productId],
    references: [hairProducts.id],
  }),
}));


export const hairColorsRelations = relations(hairColors, ({ one }) => ({
  product: one(hairProducts, {
    fields: [hairColors.productId],
    references: [hairProducts.id],
  }),
}));


export const hairInchesRelations = relations(hairInches, ({ one }) => ({
  product: one(hairProducts, {
    fields: [hairInches.productId],
    references: [hairProducts.id],
  }),
}));