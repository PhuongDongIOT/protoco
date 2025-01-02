import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoriesInfrastructure } from './categories.infrastructure';

@Injectable()
export class CategoriesService implements CategoriesInfrastructure {
  constructor(private readonly categoriesInfrastructure: CategoriesInfrastructure) { }

  getAll() {
    return this.categoriesInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.categoriesInfrastructure.getById(brandId);
  }

  async create(data: CategoryDto) {
    return this.categoriesInfrastructure.create(data);
  }
}
