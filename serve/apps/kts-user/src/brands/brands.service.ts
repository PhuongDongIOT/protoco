import { Injectable } from '@nestjs/common';
import { BrandsDto } from './dto/brands.dto';
import { BrandsInfrastructure } from './brands.infrastructure';

@Injectable()
export class BrandsService implements BrandsInfrastructure {
  constructor(private readonly brandsInfrastructure: BrandsInfrastructure) { }

  getAll() {
    return this.brandsInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.brandsInfrastructure.getById(brandId);
  }

  async create(data: BrandsDto) {
    return this.brandsInfrastructure.create(data);
  }
}
