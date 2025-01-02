import { Module } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesInfrastructure } from './categories.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: CategoriesInfrastructure,
            useClass: CategoriesRepository
        }
    ],
    exports: [CategoriesInfrastructure],
})
export class CategoriesPersistence { }
