import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EnvironmentVariables } from './utilities/environment-variables';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { ProductPricesModule } from './product_prices/product-prices.module';
import { PaymentMethodsModule } from './payments/payments.module';
import { ProductPreviewsModule } from './product_reviews/product-previews.module';
import { PromotionsModule } from './promotions/promotions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { CategoriesModule } from './categories/categories.module';
import { PromotionTypesModule } from './promotion_types/promotion-types.module';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'assets'),
      serveRoot: '/assets'
    }),
    EventEmitterModule.forRoot(),
    AuthenticationModule,
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    ProductPricesModule,
    ProductPreviewsModule,
    InventoriesModule,
    PaymentMethodsModule,
    PromotionsModule,
    PromotionTypesModule,
    PaymentMethodsModule,
    WarehousesModule
  ],
})
export class AppModule {}
