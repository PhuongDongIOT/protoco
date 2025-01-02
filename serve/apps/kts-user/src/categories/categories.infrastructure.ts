import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { CategoryDto } from "./dto/category.dto";

const categoriesSelectSchema = createSelectSchema(databaseSchema.categories);
export type CategoriesSelectSchema = Static<typeof categoriesSelectSchema> 

export abstract class CategoriesInfrastructure extends baseInfrastructure<CategoryDto, CategoriesSelectSchema>{}
