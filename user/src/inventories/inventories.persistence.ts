import { Module } from '@nestjs/common';
import { InventoriesReponsitory } from './inventories.repository';
import { InventoriesInfrastructure } from './inventories.infrastructure';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: InventoriesInfrastructure,
            useClass: InventoriesReponsitory
        }
    ],
    exports: [InventoriesInfrastructure],
})
export class InventoriesPersistence { }
