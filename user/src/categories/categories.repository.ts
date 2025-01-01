import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly drizzleService: DrizzleService) { }

    getAll() {
        return this.drizzleService.db.select().from(databaseSchema.categories);
    }

    async getById(categoryId: number) {
        const category = await this.drizzleService.db.query.categories.findFirst({
            where: eq(databaseSchema.categories.categoryId, categoryId),
        });

        if (!category) throw new NotFoundException();
        return category
    }

    async create(data: CategoryDto) {
        const createdCategories = await this.drizzleService.db
            .insert(databaseSchema.categories)
            .values({
                name: data.name,
                parentCategoryId: data.parentCategoryId,
            })
            .returning();

        return createdCategories.pop();
    }

    async update(categoryId: number, data: CategoryDto) {
        const updatedCategories = await this.drizzleService.db
            .update(databaseSchema.categories)
            .set(data)
            .where(eq(databaseSchema.categories.categoryId, categoryId))
            .returning();

        if (updatedCategories.length === 0) throw new NotFoundException();
        return updatedCategories.pop();
    }

    async delete(categoryId: number) {
        const deletedCategories = await this.drizzleService.db
            .delete(databaseSchema.categories)
            .where(eq(databaseSchema.categories.categoryId, categoryId))
            .returning();

        if (deletedCategories.length === 0) {
            throw new NotFoundException();
        }
    }
}
