import { baseInfrastructure } from "src/common/abstract/base.abstract";
import { databaseSchema } from "src/database/database-schema";
import { createSelectSchema } from 'drizzle-typebox';
import { type Static } from '@sinclair/typebox'
import { PaymentMethodsDto } from "./dto/payments.dto";

const paymentsSelectSchema = createSelectSchema(databaseSchema.brands);
export type PaymentsSelectSchema = Static<typeof paymentsSelectSchema> 

export abstract class PaymentsInfrastructure extends baseInfrastructure<PaymentMethodsDto, PaymentsSelectSchema>{}
