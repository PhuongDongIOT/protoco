import { Injectable } from '@nestjs/common';
import { PromotionTypesDto } from './dto/promotion-types.dto';
import { PromotionTypesInfrastructure } from './promotion-types.infrastructure';

@Injectable()
export class PromotionTypesService implements PromotionTypesInfrastructure {
  constructor(private readonly promotionTypesInfrastructure: PromotionTypesInfrastructure) { }

  getAll() {
    return this.promotionTypesInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.promotionTypesInfrastructure.getById(brandId);
  }

  async create(data: PromotionTypesDto) {
    return this.promotionTypesInfrastructure.create(data);
  }
}
