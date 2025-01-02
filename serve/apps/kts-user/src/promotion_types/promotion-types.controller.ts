import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe
} from '@nestjs/common';
import { PromotionTypesDto } from './dto/promotion-types.dto';
import { PromotionTypesService } from './promotion-types.service';

@Controller('promotion-types')
@UseInterceptors(ClassSerializerInterceptor)
export class PromotionTypesController {
  constructor(private readonly promotionTypesService: PromotionTypesService) {}

  @Get()
  getAll() {
    return this.promotionTypesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.promotionTypesService.getById(id);
  }

  @Post()
  create(@Body() data: PromotionTypesDto) {
    return this.promotionTypesService.create(data);
  }
}
