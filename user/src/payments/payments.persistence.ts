import { Module } from '@nestjs/common';
import { PaymentMethodsReponsitory } from './payments.repository';
import { PaymentsInfrastructure } from './payments.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: PaymentsInfrastructure,
            useClass: PaymentMethodsReponsitory
        }
    ],
    exports: [PaymentsInfrastructure],
})
export class PaymentsPersistence { }
