import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  role: text("role").default("user"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

/* =========================
   Profiles (admin users)
========================= */
export const profiles = pgTable("profiles", {
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),

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
  previousPrice: integer("previous_price"),
  isOnSale: boolean("is_on_sale").default(false).notNull(),

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
   Categories
========================= */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
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
