import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { InventoriesDto } from "./dto/inventories.dto"
const inventoriesSelectSchema = createSelectSchema(databaseSchema.products);
export type InventoriesSelectSchema = Static<typeof inventoriesSelectSchema> 

export abstract class InventoriesInfrastructure extends baseInfrastructure<InventoriesDto, InventoriesSelectSchema>{}
