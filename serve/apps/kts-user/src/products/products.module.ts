import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsPersistence } from './products.persistence';
import { configMuterUploadSingleFile } from 'src/shared';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMuterUploadSingleFile
    }),
    ProductsPersistence
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, ProductsPersistence]
})
export class ProductsModule {}
