import { Module } from '@nestjs/common';
import { BrandsRepository } from './brands.repository';
import { BrandsInfrastructure } from './brands.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: BrandsInfrastructure,
            useClass: BrandsRepository
        }
    ],
    exports: [BrandsInfrastructure],
})
export class BrandsPersistence { }
