CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hair_inches" ADD COLUMN "additional_price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "hair_products" ADD COLUMN "category_id" integer;--> statement-breakpoint
ALTER TABLE "hair_products" ADD CONSTRAINT "hair_products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;