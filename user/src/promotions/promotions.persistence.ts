import { Module } from '@nestjs/common';
import { PromotionsRepository } from './promotions.repository';
import { PromotionsInfrastructure } from './promotions.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: PromotionsInfrastructure,
            useClass: PromotionsRepository
        }
    ],
    exports: [PromotionsInfrastructure],
})
export class PromotionsPersistence { }
