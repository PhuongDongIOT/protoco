import { Module } from '@nestjs/common';
import { PromotionTypesController } from './promotion-types.controller';
import { PromotionTypesService } from './promotion-types.service';
import { PromotionTypesPersistence } from './promotion-types.persistence';

@Module({
  imports: [PromotionTypesPersistence],
  controllers: [PromotionTypesController],
  providers: [PromotionTypesService],
  exports: [PromotionTypesService, PromotionTypesPersistence]
})
export class PromotionTypesModule {}
