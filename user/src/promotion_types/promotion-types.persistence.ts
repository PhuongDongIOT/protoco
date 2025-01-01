import { Module } from '@nestjs/common';
import { PromotionTypesRepository } from './promotion-types.repository';
import { PromotionTypesInfrastructure } from './promotion-types.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: PromotionTypesInfrastructure,
            useClass: PromotionTypesRepository
        }
    ],
    exports: [PromotionTypesInfrastructure],
})
export class PromotionTypesPersistence { }
