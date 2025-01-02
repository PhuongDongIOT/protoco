import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoriesDto } from './dto/inventories.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class InventoriesReponsitory {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.inventory);
  }

  async getById(inventoryId: number) {
    const inventory = await this.drizzleService.db.query.inventory.findFirst({
      where: eq(databaseSchema.inventory.inventoryId, inventoryId),
    });

    if (!inventory) throw new NotFoundException();
    return inventory;
  }

  async create(data: InventoriesDto) {
    const createInventories = await this.drizzleService.db
      .insert(databaseSchema.inventory)
      .values({
        ...data,
        lastUpdated: new Date()
      })
      .returning();

    return createInventories.pop();
  }
}
