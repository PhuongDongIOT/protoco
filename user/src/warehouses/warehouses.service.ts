import { Injectable } from '@nestjs/common';
import { WarehousesDto } from './dto/warehouses.dto';
import { WarehousesInfrastructure } from './warehouses.infrastructure';

@Injectable()
export class WarehousesService implements WarehousesInfrastructure {
  constructor(private readonly warehousesInfrastructure: WarehousesInfrastructure) { }

  getAll() {
    return this.warehousesInfrastructure.getAll();
  }

  async getById(warehouseId: number) {
    return this.warehousesInfrastructure.getById(warehouseId);
  }

  async create(data: WarehousesDto) {
    return this.warehousesInfrastructure.create(data);
  }
}
