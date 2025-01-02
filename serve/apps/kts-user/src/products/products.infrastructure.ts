import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { ProductsDto } from "./dto/products.dto";

const productsSelectSchema = createSelectSchema(databaseSchema.products);
export type ProductsSelectSchema = Static<typeof productsSelectSchema> 

export abstract class ProductsInfrastructure extends baseInfrastructure<ProductsDto, ProductsSelectSchema>{}
