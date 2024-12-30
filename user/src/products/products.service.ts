import { Injectable } from '@nestjs/common';
import { ProductsDto } from './dto/products.dto';
import { ProductsInfrastructure } from './products.infrastructure';

@Injectable()
export class ProductsService implements ProductsInfrastructure {
  constructor(private readonly productsInfrastructure: ProductsInfrastructure) { }

  getAll() {
    return this.productsInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.productsInfrastructure.getById(brandId);
  }

  async create(data: ProductsDto) {
    return this.productsInfrastructure.create(data);
  }
}
