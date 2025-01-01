import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { WarehousesPersistence } from './warehouses.persistence';

@Module({
  imports: [WarehousesPersistence],
  controllers: [WarehousesController],
  providers: [WarehousesService],
  exports: [WarehousesService, WarehousesPersistence],
})
export class WarehousesModule {}
