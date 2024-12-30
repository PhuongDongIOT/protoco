import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsDto } from './dto/products.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsRepository{
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.products);
  }

  async getById(productId: number) {
    const product = await this.drizzleService.db.query.products.findFirst({
      where: eq(databaseSchema.products.productId, productId),
    });

    if (!product) throw new NotFoundException();
    return product;
  }

  async create(data: ProductsDto) {
    const createdCategories = await this.drizzleService.db
      .insert(databaseSchema.products)
      .values({
        ...data,

      })
      .returning();

    return createdCategories.pop();
  }
}
