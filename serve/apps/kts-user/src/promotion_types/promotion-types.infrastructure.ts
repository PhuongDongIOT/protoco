import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { PromotionTypesDto } from "./dto/promotion-types.dto";

const promotionTypesSelectSchema = createSelectSchema(databaseSchema.promotionTypes);
export type PromotionTypesSelectSchema = Static<typeof promotionTypesSelectSchema> 

export abstract class PromotionTypesInfrastructure extends baseInfrastructure<PromotionTypesDto, PromotionTypesSelectSchema>{}
