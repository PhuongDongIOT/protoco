import {
  serial,
  text,
  integer,
  pgTable,
  primaryKey,
  AnyPgColumn,
  timestamp,
  boolean,
  real,
  bigint
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// this is schemal table
export const base = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at')
}

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  password: text('password').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  // ...base
});

export const orders = pgTable('orders', {
  orderId: serial('order_id').primaryKey(),
  orderDate: timestamp('order_date').unique().notNull(),
  status: text('status').notNull(),
  totalAmount: real('total_amount').notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentMethodId: integer('payment_method_id')
    .references(() => paymentMethods.paymentMethodId)
    .notNull(),
  discountAmount: real('discount_amount').notNull(),
  shippingFee: real('shipping_fee').notNull().default(0),
  shippingAddress: text('shipping_address').notNull(),
  ...base,
  customerId: integer('customer_id')
    .references(() => users.userId)
    .notNull(),
});

export const orderDetails = pgTable('order_details', {
  orderDetailId: serial('order_detail_id').primaryKey(),
  quantity: integer('quantity').notNull(),
  unitPrice: text('unit_price').notNull(),
  discountPrice: real('discount_price').notNull(),
  totalPrice: real('total_price').notNull(),
  orderId: integer('order_id')
    .references(() => orders.orderId)
    .notNull(),
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull()
});

export const brands = pgTable('brands', {
  brandId: serial('brand_id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image-url'),
  bio: text('bio'),
  description: text('description')
});

export const warehouses = pgTable('warehouses', {
  warehouseId: serial('warehouse_id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  location: text('location').notNull(),
  ...base
});

export const products = pgTable('products', {
  productId: serial('product_id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image_url').notNull(),
  bio: text('bio'),
  stockQuantity: bigint('stock_quantity', { mode: "number" }).default(0),
  brandId: integer('brand_id')
    .references(() => brands.brandId)
    .notNull(),
  authorId: integer('author_id')
    .references(() => users.userId)
    .notNull(),
});

export const inventory = pgTable('inventory', {
  inventoryId: serial('inventory_id').primaryKey(),
  name: text('name').notNull(),
  quantity: bigint('quantity', { mode: 'number' }).notNull(),
  reservedQuantity: bigint('reserved_quantity', { mode: 'number' }).notNull().default(0),
  minStockLevel: bigint('min_stock_level', { mode: 'number' }).notNull(),
  lastUpdated: timestamp('last_updated').notNull().defaultNow(),
  warehouseId: integer('warehouse_id')
    .references(() => warehouses.warehouseId)
    .notNull(),
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull()
});

export const InventoryTransactions = pgTable('inventory_transactions', {
  inventoryTransactionId: serial('inventory_transaction_id').primaryKey(),
  transactionType: text('transaction_type').notNull(),
  quantityChange: bigint('quantity_change', { mode: 'number' }).notNull().default(0),
  reason: text('reason').notNull(),
  ...base,
  inventoryId: integer('inventory_id')
    .references(() => inventory.inventoryId)
    .notNull(),
  userId: integer('user_id')
    .references(() => users.userId)
    .notNull()
});

export const productReviewMediums = pgTable('product_reviews_medium', {
  productReviewId: serial('product_review_medium_id').primaryKey(),
  averageRating: integer('average_rating'),
  totalReviews: integer('total_reviews'),
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull()
});

export const productReviews = pgTable('product_reviews', {
  productReviewId: serial('product_review_id').primaryKey(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  images: text('images'),
  status: integer('status').notNull(),
  ...base,
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull(),
  userId: integer('user_id')
    .references(() => users.userId)
    .notNull()
});

export const productPrices = pgTable('product_prices', {
  productPriceId: serial('product_price_id').primaryKey(),
  price: real('price').notNull().default(0),
  originalPrice: real('original_price').notNull().default(0),
  minQuantity: real('min_quantity').default(0),
  currency: text('currency').notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('end_date').notNull(),
  vat: integer('vat').default(0),
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull()
});

export const priceHistory = pgTable('price_history', {
  productPriceId: serial('price_history_id').primaryKey(),
  price: real('price').notNull(),
  changedAt: timestamp('changed_at').notNull().defaultNow(),
  reason: text('reason').notNull(),
  productId: integer('product_id')
    .references(() => products.productId)
    .notNull()
});

export const categoriesProducts = pgTable(
  'categories_products',
  {
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.categoryId),
    productId: integer('product_id')
      .notNull()
      .references(() => products.productId),
  },
  (columns) => ({
    pk: primaryKey({ columns: [columns.categoryId, columns.productId] }),
  }),
);


export const productsRelations = relations(products, ({ one, many }) => ({
  author: one(users, {
    fields: [products.authorId],
    references: [users.userId],
  }),
  categoriesProducts: many(categoriesProducts)
}));

export const categories = pgTable('categories', {
  categoryId: serial('category_id').primaryKey(),
  name: text('title').notNull(),
  bio: text('bio'),
  parentCategoryId: integer('parent_category_id').references(
    (): AnyPgColumn => categories.categoryId,
  )
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  categoriesProducts: many(categoriesProducts),
  parentCategory: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.categoryId],
    relationName: 'nested_categories',
  }),
  nestedCategories: many(categories, {
    relationName: 'nested_categories',
  }),
}));

export const categoriesProductsRelations = relations(
  categoriesProducts,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoriesProducts.categoryId],
      references: [categories.categoryId],
    }),
    article: one(products, {
      fields: [categoriesProducts.productId],
      references: [products.productId],
    }),
  }),
);

export const promotionTypes = pgTable('promotion_types', {
  promotionTypeId: serial('promotion_type_id').primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export const promotions = pgTable('promotions', {
  promotionId: serial('promotion_id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  promotionTypeId: integer('promotion_type_id')
    .notNull()
    .references(() => promotionTypes.promotionTypeId),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  isActive: boolean('is_active').notNull()
});

export const promotionProducts = pgTable(
  'promotion_products',
  {
    promotionId: integer('promotion_id')
      .notNull()
      .references(() => promotions.promotionId),
    productId: integer('product_id')
      .notNull()
      .references(() => products.productId),
    quantity: integer('quantity'),
    quantityChange: integer('quantity_change').default(0)
  },
  (columns) => ({
    pk: primaryKey({ columns: [columns.promotionId, columns.productId] }),
  }),
);

export const promotionPayments = pgTable(
  'promotion_payments',
  {
    promotionId: integer('promotion_id')
      .notNull()
      .references(() => promotions.promotionId),
    paymentMethodId: integer('payment_method_id')
      .notNull()
      .references(() => paymentMethods.paymentMethodId)
  },
  (columns) => ({
    pk: primaryKey({ columns: [columns.promotionId, columns.paymentMethodId] }),
  }),
);

export const promotionRules = pgTable('promotion_rules', {
  promotionRuleId: serial('promotion_rule_id').primaryKey(),
  discountType: text('discount_type').notNull(),
  discountValue: bigint('discount_value', { mode: 'number' }).notNull().default(0),
  ruleOperator: text('rule_operator').notNull(),
  ruleText: text('rule_text').notNull(),
  priority: integer('priority').notNull().default(0),
  promotionId: integer('promotion_id')
    .references(() => promotions.promotionId)
    .notNull()
});

export const paymentMethods = pgTable('payment_methods', {
  paymentMethodId: serial('payment_method_id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  iconUrl: text('icon_url')
});

export const databaseSchema = {
  users,
  orders,
  orderDetails,
  brands,
  products,
  warehouses,
  inventory,
  InventoryTransactions,
  productReviewMediums,
  productReviews,
  productPrices,
  priceHistory,
  productsRelations,
  categories,
  categoriesProducts,
  categoriesProductsRelations,
  categoriesRelations,
  promotionTypes,
  promotions,
  promotionProducts,
  promotionPayments,
  promotionRules,
  paymentMethods
};
