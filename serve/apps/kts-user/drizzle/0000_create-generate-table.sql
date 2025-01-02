CREATE TABLE IF NOT EXISTS "inventory_transactions" (
	"inventory_transaction_id" serial PRIMARY KEY NOT NULL,
	"transaction_type" text NOT NULL,
	"quantity_change" bigint DEFAULT 0 NOT NULL,
	"reason" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"inventory_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brands" (
	"brand_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image-url" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"parent_category_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories_products" (
	"category_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	CONSTRAINT "categories_products_category_id_product_id_pk" PRIMARY KEY("category_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" bigint NOT NULL,
	"reserved_quantity" bigint DEFAULT 0 NOT NULL,
	"min_stock_level" bigint NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"warehouse_id" integer NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"order_detail_id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" text NOT NULL,
	"discount_price" real NOT NULL,
	"total_price" real NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"order_date" timestamp NOT NULL,
	"status" text NOT NULL,
	"total_amount" real NOT NULL,
	"payment_method" text NOT NULL,
	"payment_method_id" integer NOT NULL,
	"discount_amount" real NOT NULL,
	"shipping_fee" real DEFAULT 0 NOT NULL,
	"shipping_address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"customer_id" integer NOT NULL,
	CONSTRAINT "orders_order_date_unique" UNIQUE("order_date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_methods" (
	"payment_method_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "price_history" (
	"price_history_id" serial PRIMARY KEY NOT NULL,
	"price" real NOT NULL,
	"changed_at" timestamp DEFAULT now() NOT NULL,
	"reason" text NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_prices" (
	"product_price_id" serial PRIMARY KEY NOT NULL,
	"price" real DEFAULT 0 NOT NULL,
	"original_price" real DEFAULT 0 NOT NULL,
	"min_quantity" real DEFAULT 0,
	"currency" text NOT NULL,
	"startDate" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"vat" integer DEFAULT 0,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_reviews_medium" (
	"product_review_medium_id" serial PRIMARY KEY NOT NULL,
	"average_rating" integer,
	"total_reviews" integer,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_reviews" (
	"product_review_id" serial PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"images" text,
	"status" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"product_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"stock_quantity" bigint DEFAULT 0,
	"brand_id" integer NOT NULL,
	"author_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion_payments" (
	"promotion_id" integer NOT NULL,
	"payment_method_id" integer NOT NULL,
	CONSTRAINT "promotion_payments_promotion_id_payment_method_id_pk" PRIMARY KEY("promotion_id","payment_method_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion_products" (
	"promotion_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer,
	"quantity_change" integer DEFAULT 0,
	CONSTRAINT "promotion_products_promotion_id_product_id_pk" PRIMARY KEY("promotion_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion_rules" (
	"promotion_rule_id" serial PRIMARY KEY NOT NULL,
	"discount_type" text NOT NULL,
	"discount_value" bigint DEFAULT 0 NOT NULL,
	"rule_operator" text NOT NULL,
	"rule_text" text NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"promotion_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion_types" (
	"promotion_type_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotions" (
	"promotion_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"promotion_type_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"password" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warehouses" (
	"warehouse_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_inventory_id_inventory_inventory_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventory"("inventory_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_category_id_categories_category_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_id_warehouses_warehouse_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("warehouse_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_method_id_payment_methods_payment_method_id_fk" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("payment_method_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "price_history" ADD CONSTRAINT "price_history_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_reviews_medium" ADD CONSTRAINT "product_reviews_medium_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("brand_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_payments" ADD CONSTRAINT "promotion_payments_promotion_id_promotions_promotion_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("promotion_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_payments" ADD CONSTRAINT "promotion_payments_payment_method_id_payment_methods_payment_method_id_fk" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("payment_method_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_products" ADD CONSTRAINT "promotion_products_promotion_id_promotions_promotion_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("promotion_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_products" ADD CONSTRAINT "promotion_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_rules" ADD CONSTRAINT "promotion_rules_promotion_id_promotions_promotion_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("promotion_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotions" ADD CONSTRAINT "promotions_promotion_type_id_promotion_types_promotion_type_id_fk" FOREIGN KEY ("promotion_type_id") REFERENCES "public"."promotion_types"("promotion_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
