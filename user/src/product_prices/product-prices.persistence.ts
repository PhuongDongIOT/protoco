import { Module } from '@nestjs/common';
import { ProductPricesRepository } from './product-prices.repository';
import { ProductPricesInfrastructure } from './product-prices.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: ProductPricesInfrastructure,
            useClass: ProductPricesRepository
        }
    ],
    exports: [ProductPricesInfrastructure],
})
export class ProductPricesPersistence { }
