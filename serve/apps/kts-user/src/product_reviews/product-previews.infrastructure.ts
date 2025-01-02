import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { ProductPreviewsDto } from "./dto/product-previews.dto"
const productPreviewsSelectSchema = createSelectSchema(databaseSchema.products);
export type ProductPreviewsSelectSchema = Static<typeof productPreviewsSelectSchema> 

export abstract class ProductPreviewsInfrastructure extends baseInfrastructure<ProductPreviewsDto, ProductPreviewsSelectSchema>{}
