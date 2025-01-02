import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { WarehousesDto } from './dto/warehouses.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { WarehousesInfrastructure } from './warehouses.infrastructure';
import { warehousesEvent } from './warehouses.const';

@Injectable()
export class WarehousesRepository implements WarehousesInfrastructure {
  constructor(private readonly drizzleService: DrizzleService,
    private eventEmitter: EventEmitter2,
  ) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.warehouses);
  }

  async getById(warehouseId: number) {
    const warehouse = await this.drizzleService.db.query.warehouses.findFirst({
      where: eq(databaseSchema.warehouses.warehouseId, warehouseId),
    });

    if (!warehouse) throw new NotFoundException();
    return warehouse;
  }

  async create(data: WarehousesDto) {
    const createdWarehouses = await this.drizzleService.db
      .insert(databaseSchema.warehouses)
      .values({
        ...data,

      })
      .returning();
    
      this.eventEmitter.emit(warehousesEvent.event.created);
    return createdWarehouses.pop();
  }
}
