import { Injectable } from '@nestjs/common';
import { InventoriesDto } from './dto/inventories.dto';
import { InventoriesInfrastructure } from './inventories.infrastructure';

@Injectable()
export class InventoriesService implements InventoriesInfrastructure {
  constructor(private readonly inventoriesInfrastructure: InventoriesInfrastructure) { }

  getAll() {
    return this.inventoriesInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.inventoriesInfrastructure.getById(brandId);
  }

  async create(data: InventoriesDto) {
    return this.inventoriesInfrastructure.create(data);
  }
}
