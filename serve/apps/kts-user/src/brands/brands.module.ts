import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandsPersistence } from './brands.persistence';
// import { configMuterUploadSingleFile } from 'src/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { configMuterUploadSingleFile } from 'src/shared';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMuterUploadSingleFile
    }),
    BrandsPersistence
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService, BrandsPersistence]
})
export class BrandsModule { }
