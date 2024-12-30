import { Injectable } from '@nestjs/common';
import { ProductPricesDto } from './dto/product-prices.dto';
import { ProductPricesInfrastructure } from './product-prices.infrastructure';

@Injectable()
export class ProductPricesService implements ProductPricesInfrastructure {
  constructor(private readonly productPricesInfrastructure: ProductPricesInfrastructure) { }

  getAll() {
    return this.productPricesInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.productPricesInfrastructure.getById(brandId);
  }

  async create(data: ProductPricesDto) {
    return this.productPricesInfrastructure.create(data);
  }
}
