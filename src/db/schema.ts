
import { pgTable, serial, text, integer, uuid, timestamp } from "drizzle-orm/pg-core"; // Add uuid and timestamp

import { relations } from "drizzle-orm";

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
   Hair Inches
========================= */

export const hairInches = pgTable("hair_inches", {
  id: serial("id").primaryKey(),

  productId: integer("product_id")
    .notNull()
    .references(() => hairProducts.id, { onDelete: "cascade" }),

  inches: integer("inches").notNull(),
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

export const hairProductsRelations = relations(hairProducts, ({ many }) => ({
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