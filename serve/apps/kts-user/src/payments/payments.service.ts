import { Injectable } from '@nestjs/common';
import { PaymentMethodsDto } from './dto/payments.dto';
import { PaymentsInfrastructure } from './payments.infrastructure';

@Injectable()
export class PaymentMethodsService implements PaymentsInfrastructure {
  constructor(private readonly paymentsInfrastructure: PaymentsInfrastructure) { }

  getAll() {
    return this.paymentsInfrastructure.getAll();
  }

  async getById(brandId: number) {
    return this.paymentsInfrastructure.getById(brandId);
  }

  async create(data: PaymentMethodsDto) {
    return this.paymentsInfrastructure.create(data);
  }
}
