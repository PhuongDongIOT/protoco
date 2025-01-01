import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { BrandsDto } from "./dto/brands.dto";

const brandsSelectSchema = createSelectSchema(databaseSchema.brands);
export type BrandsSelectSchema = Static<typeof brandsSelectSchema> 

export abstract class BrandsInfrastructure extends baseInfrastructure<BrandsDto, BrandsSelectSchema>{}
