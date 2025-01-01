import { Injectable } from '@nestjs/common';
import { ProductPreviewsDto } from './dto/product-previews.dto';
import { ProductPreviewsInfrastructure } from './product-previews.infrastructure';

@Injectable()
export class ProductPreviewsService implements ProductPreviewsInfrastructure {
  constructor(private readonly productPreviewsInfrastructure: ProductPreviewsInfrastructure) { }

  getAll() {
    return this.productPreviewsInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.productPreviewsInfrastructure.getById(brandId);
  }

  async create(data: ProductPreviewsDto) {
    return this.productPreviewsInfrastructure.create(data);
  }
}
