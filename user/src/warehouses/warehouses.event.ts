import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { warehousesEvent } from './warehouses.const';

@Injectable()
export class WarehousesEvent {
    private readonly logger = new Logger(warehousesEvent.name)
    @OnEvent(warehousesEvent.event.created)
    listenlisten() {
        this.logger.log("listen warehouses!")
    }
}