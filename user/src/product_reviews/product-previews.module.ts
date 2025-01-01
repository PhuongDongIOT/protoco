import { Module } from '@nestjs/common';
import { ProductPreviewsController } from './product-previews.controller';
import { ProductPreviewsService } from './product-previews.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configMuterUploadSingleFile } from 'src/shared';
import { ProductPreviewsPersistence } from './product-previews.persistence';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMuterUploadSingleFile
    }),
    ProductPreviewsPersistence
  ],
  controllers: [ProductPreviewsController],
  providers: [ProductPreviewsService],
  exports: [ProductPreviewsService, ProductPreviewsPersistence],
})
export class ProductPreviewsModule { }
