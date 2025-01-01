import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { ProductPricesDto } from "./dto/product-prices.dto";

const productPricesSelectSchema = createSelectSchema(databaseSchema.productPrices);
export type ProductPricesSelectSchema = Static<typeof productPricesSelectSchema> 

export abstract class ProductPricesInfrastructure extends baseInfrastructure<ProductPricesDto, ProductPricesSelectSchema>{}
