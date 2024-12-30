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
import { ProductPricesDto } from './dto/product-prices.dto';
import { ProductPricesService } from './product-prices.service';

@Controller('product-price')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductPricesController {
  constructor(private readonly productPricesService: ProductPricesService) {}

  @Get()
  getAll() {
    return this.productPricesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productPricesService.getById(id);
  }

  @Post()
  create(@Body() data: ProductPricesDto) {
    return this.productPricesService.create(data);
  }
}
