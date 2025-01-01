import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { WarehousesDto } from "./dto/warehouses.dto";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'

const warehouseSelectSchema = createSelectSchema(databaseSchema.warehouses);
export type WarehouseSelectSchema = Static<typeof warehouseSelectSchema> 

export abstract class WarehousesInfrastructure extends baseInfrastructure<WarehousesDto, WarehouseSelectSchema>{}
