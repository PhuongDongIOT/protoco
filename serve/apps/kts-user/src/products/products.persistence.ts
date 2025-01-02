import { Module } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsInfrastructure } from './products.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: ProductsInfrastructure,
            useClass: ProductsRepository
        }
    ],
    exports: [ProductsInfrastructure],
})
export class ProductsPersistence { }
