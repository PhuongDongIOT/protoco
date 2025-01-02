import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './payments.controller';
import { PaymentMethodsService } from './payments.service';
import { PaymentsPersistence } from './payments.persistence';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configMuterUploadSingleFile } from 'src/shared';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMuterUploadSingleFile
    }),
    PaymentsPersistence
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService, PaymentsPersistence],
})
export class PaymentMethodsModule { }
