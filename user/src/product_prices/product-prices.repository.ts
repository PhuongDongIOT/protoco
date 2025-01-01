import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPricesDto } from './dto/product-prices.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductPricesRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.productPrices);
  }

  async getById(productPriceId: number) {
    const productPrice = await this.drizzleService.db.query.productPrices.findFirst({
      where: eq(databaseSchema.productPrices.productPriceId, productPriceId),
    });

    if (!productPrice) throw new NotFoundException();
    return productPrice;
  }

  async create(data: ProductPricesDto) {
    const createdProductPrices = await this.drizzleService.db
      .insert(databaseSchema.productPrices)
      .values({
        ...data
      })
      .returning();

    return createdProductPrices.pop();
  }
}
