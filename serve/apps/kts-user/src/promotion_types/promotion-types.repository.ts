import { Injectable, NotFoundException } from '@nestjs/common';
import { PromotionTypesDto } from './dto/promotion-types.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PromotionTypesRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.promotionTypes);
  }

  async getById(promotionTypeId: number) {
    const promotionType = await this.drizzleService.db.query.promotionTypes.findFirst({
      where: eq(databaseSchema.promotionTypes.promotionTypeId, promotionTypeId),
    });

    if (!promotionType) throw new NotFoundException();
    return promotionType;
  }

  async create(data: PromotionTypesDto) {
    const createdCategories = await this.drizzleService.db
      .insert(databaseSchema.promotionTypes)
      .values({
        ...data
      })
      .returning();

    return createdCategories.pop();
  }
}
