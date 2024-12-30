import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { InventoriesPersistence } from './inventories.persistence';

@Module({
  imports: [InventoriesPersistence],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService, InventoriesPersistence]
})
export class InventoriesModule {}
