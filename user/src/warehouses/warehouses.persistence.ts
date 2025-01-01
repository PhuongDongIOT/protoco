import { Module } from '@nestjs/common';
import { WarehousesRepository } from './warehouse.repository';
import { WarehousesInfrastructure } from './warehouses.infrastructure';
import { WarehousesEvent } from './warehouses.event';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: WarehousesInfrastructure,
            useClass: WarehousesRepository,
        },
        WarehousesEvent
    ],
    exports: [WarehousesInfrastructure],
})
export class WarehousesPersistence { }
