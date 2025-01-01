import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPreviewsDto } from './dto/product-previews.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductPreviewsRepository {
  constructor(private readonly drizzleService: DrizzleService) { }

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.productReviews);
  }

  async getById(productReviewId: number) {
    const productReview = await this.drizzleService.db.query.productReviews.findFirst({
      where: eq(databaseSchema.productReviews.productReviewId, productReviewId),
    });

    if (!productReview) throw new NotFoundException();
    return productReview;
  }

  async create(data: ProductPreviewsDto) {
    const createdProductPreview = await this.drizzleService.db
      .insert(databaseSchema.productReviews)
      .values({
        ...data,
        status: 1
      })
      .returning();

    const { productId } = data;

    await this.drizzleService.db
      .insert(databaseSchema.productReviewMediums)
      .values({
        productId,
        averageRating: 4,
        totalReviews: 100
      })
      .returning();

    return createdProductPreview.pop();
  }
}
