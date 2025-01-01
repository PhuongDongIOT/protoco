import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PromotionsDto } from './dto/promotions.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq, sql } from 'drizzle-orm';
import { isNotArrayEmpty } from 'src/utilities/is-array';
import { ReponseResult } from 'src/common';
import { LIMITPAGINATION } from 'src/constants';

@Injectable()
export class PromotionsRepository {
  private strLink: string = process.env.APP_URL ?? '';
  constructor(private readonly drizzleService: DrizzleService) { }

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.promotions);
  }

  async getById(promotionId: number) {
    const promotion = await this.drizzleService.db.query.promotions.findFirst({
      where: eq(databaseSchema.promotions.promotionId, promotionId),
    });

    if (!promotion) throw new NotFoundException();
    return promotion;
  }

  async getProductSale() {
    const result = await this.drizzleService.db.select({
      title: databaseSchema.products.name,
      imageUrl: sql`concat('${sql.raw(this.strLink)}',${databaseSchema.products.imageUrl})`,
      altImageUrl: databaseSchema.products.name,
      titleBrand: databaseSchema.brands.name,
      linkBrand: databaseSchema.brands.name,
      price: databaseSchema.productPrices.price,
      originalPrice: databaseSchema.productPrices.originalPrice,
      discountValue: databaseSchema.promotionRules.discountValue,
      priority: databaseSchema.promotionRules.priority,
      averageRating: databaseSchema.productReviewMediums.averageRating,
      totalReviews: databaseSchema.productReviewMediums.totalReviews,
      quantity: databaseSchema.promotionProducts.quantity,
      quantityChange: databaseSchema.promotionProducts.quantityChange
    })
      .from(databaseSchema.products)
      .innerJoin(databaseSchema.brands, eq(databaseSchema.brands.brandId, databaseSchema.products.brandId))
      .innerJoin(databaseSchema.productPrices, eq(databaseSchema.productPrices.productId, databaseSchema.products.productId))
      .innerJoin(databaseSchema.productReviewMediums, eq(databaseSchema.productReviewMediums.productId, databaseSchema.products.productId))
      .innerJoin(databaseSchema.promotionProducts, eq(databaseSchema.promotionProducts.productId, databaseSchema.products.productId))
      .innerJoin(databaseSchema.promotions, eq(databaseSchema.promotions.promotionId, databaseSchema.promotionProducts.promotionId))
      .innerJoin(databaseSchema.promotionRules, eq(databaseSchema.promotionRules.promotionId, databaseSchema.promotions.promotionId))
      .where(eq(databaseSchema.promotions.isActive, true));

      return new ReponseResult(result, HttpStatus.OK)
  }

  async getPaymentSale() {
    const result = await this.drizzleService.db.select({
      namePayment: databaseSchema.paymentMethods.name,
      iconUrlPayment: sql`concat('${sql.raw(this.strLink)}',${databaseSchema.paymentMethods.iconUrl})`,
      ruleText: databaseSchema.promotionRules.ruleText
    })
      .from(databaseSchema.paymentMethods)
      .innerJoin(databaseSchema.promotionPayments, eq(databaseSchema.promotionPayments.paymentMethodId, databaseSchema.paymentMethods.paymentMethodId))
      .innerJoin(databaseSchema.promotions, eq(databaseSchema.promotions.promotionId, databaseSchema.promotionPayments.promotionId))
      .innerJoin(databaseSchema.promotionRules, eq(databaseSchema.promotionRules.promotionId, databaseSchema.promotionPayments.promotionId))
      .where(eq(databaseSchema.promotions.isActive, true))
      .limit(LIMITPAGINATION);

    return new ReponseResult(result, HttpStatus.OK)
  }

  async create(data: PromotionsDto) {
    const { description = "" } = data;
    const createdPromotions = await this.drizzleService.db
      .insert(databaseSchema.promotions)
      .values({
        ...data,
        description
      })
      .returning();

    const promorion = createdPromotions.pop();
    if (promorion) {
      const { products, payments } = data;
      const { promotionId } = promorion;
      if (products && isNotArrayEmpty(products)) {
        await this.drizzleService.db.transaction(async (tx) => {
          for (const item of products) {
            await tx.insert(databaseSchema.promotionProducts)
              .values({
                ...item,
                promotionId
              });
          };
        })
      } else if (payments && isNotArrayEmpty(payments)) {
        await this.drizzleService.db.transaction(async (tx) => {
          for (const item of payments) {
            await tx.insert(databaseSchema.promotionPayments)
              .values({
                ...item,
                promotionId
              });
          };
        })
      }

      await this.drizzleService.db
        .insert(databaseSchema.promotionRules)
        .values({
          ...data,
          promotionId
        })
        .returning();
    }

    return promorion;
  }
}
