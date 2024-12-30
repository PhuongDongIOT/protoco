import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMethodsDto } from './dto/payments.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PaymentMethodsReponsitory {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.paymentMethods);
  }

  async getById(paymentMethodId: number) {
    const paymentMethod = await this.drizzleService.db.query.paymentMethods.findFirst({
      where: eq(databaseSchema.paymentMethods.paymentMethodId, paymentMethodId),
    });

    if (!paymentMethod) throw new NotFoundException();
    return paymentMethod;
  }

  async create(data: PaymentMethodsDto) {
    const createdCategories = await this.drizzleService.db
      .insert(databaseSchema.paymentMethods)
      .values({
        ...data
      })
      .returning();

    return createdCategories.pop();
  }
}
