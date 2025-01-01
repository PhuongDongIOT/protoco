import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { PromotionsDto } from "./dto/promotions.dto";
import { DataResponse, ItemPaymentOption, ItemSaleReponse } from "./promotions.define";

const promotionsSelectSchema = createSelectSchema(databaseSchema.promotions);
export type PromotionsSelectSchema = Static<typeof promotionsSelectSchema> 

export abstract class PromotionsInfrastructure extends baseInfrastructure<PromotionsDto, PromotionsSelectSchema>{
    abstract getProductSale(): Promise<DataResponse<Array<ItemSaleReponse>>>;
    abstract getPaymentSale(): Promise<DataResponse<Array<ItemPaymentOption>>>;
}
