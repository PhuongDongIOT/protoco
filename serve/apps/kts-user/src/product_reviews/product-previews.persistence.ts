import { Module } from '@nestjs/common';
import { ProductPreviewsRepository } from './product-previews.repository';
import { ProductPreviewsInfrastructure } from './product-previews.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: ProductPreviewsInfrastructure,
            useClass: ProductPreviewsRepository
        }
    ],
    exports: [ProductPreviewsInfrastructure],
})
export class ProductPreviewsPersistence { }
