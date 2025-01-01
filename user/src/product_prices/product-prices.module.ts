import { Module } from '@nestjs/common';
import { ProductPricesController } from './product-prices.controller';
import { ProductPricesService } from './product-prices.service';
import { ProductPricesPersistence } from './product-prices.persistence';

@Module({
  imports: [ProductPricesPersistence],
  controllers: [ProductPricesController],
  providers: [ProductPricesService],
  exports: [ProductPricesService, ProductPricesPersistence]
})
export class ProductPricesModule {}
