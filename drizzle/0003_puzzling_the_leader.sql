ALTER TABLE "hair_products" ADD COLUMN "previous_price" integer;--> statement-breakpoint
ALTER TABLE "hair_products" ADD COLUMN "is_on_sale" boolean DEFAULT false NOT NULL;