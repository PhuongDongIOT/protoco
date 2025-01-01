import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { BrandsInfrastructure } from './brands.infrastructure';
import { BrandsDto } from './dto/brands.dto';

@Injectable()
export class BrandsRepository implements BrandsInfrastructure {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAll() {
    return this.drizzleService.db.select().from(databaseSchema.brands);
  }

  async getById(brandId: number) {
    const product = await this.drizzleService.db.query.brands.findFirst({
      where: eq(databaseSchema.brands.brandId, brandId),
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async create(data: BrandsDto) {
    const createdCategories = await this.drizzleService.db
      .insert(databaseSchema.brands)
      .values({
        ...data,

      })
      .returning();

    return createdCategories.pop();
  }
}
