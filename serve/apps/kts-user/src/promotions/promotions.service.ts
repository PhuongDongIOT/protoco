import { Injectable } from '@nestjs/common';
import { PromotionsDto } from './dto/promotions.dto';
import { PromotionsInfrastructure } from './promotions.infrastructure';

@Injectable()
export class PromotionsService implements PromotionsInfrastructure {
  constructor(private readonly promotionsInfrastructure: PromotionsInfrastructure) { }

  getAll() {
    return this.promotionsInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.promotionsInfrastructure.getById(brandId);
  }

  async getPaymentSale() {
    return this.promotionsInfrastructure.getPaymentSale();
  }

  async getProductSale() {
    return this.promotionsInfrastructure.getProductSale();
  }

  async create(data: PromotionsDto) {
    return this.promotionsInfrastructure.create(data);
  }
}
