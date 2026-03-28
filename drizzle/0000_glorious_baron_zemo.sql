CREATE TABLE "company_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"phone" text,
	"whatsapp" text,
	"instagram" text,
	"tiktok" text,
	"location" text,
	"contact_info" text
);
--> statement-breakpoint
CREATE TABLE "hair_colors" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_inches" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"inches" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"texture" text,
	"hair_type" text,
	"origin" text,
	"processing" text,
	"options" text,
	"price" integer NOT NULL,
	"availability" text NOT NULL,
	"quantity_in_hand" integer
);
--> statement-breakpoint
ALTER TABLE "hair_colors" ADD CONSTRAINT "hair_colors_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hair_images" ADD CONSTRAINT "hair_images_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hair_inches" ADD CONSTRAINT "hair_inches_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;