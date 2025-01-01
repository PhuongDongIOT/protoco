import { Module } from '@nestjs/common';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from './promotions.service';
import { PromotionsPersistence } from './promotions.persistence';

@Module({
  imports: [PromotionsPersistence],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService, PromotionsPersistence],
})
export class PromotionsModule {}
