import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesPersistence } from './categories.persistence';

@Module({
  imports: [CategoriesPersistence],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, CategoriesPersistence],
})
export class CategoriesModule {}
