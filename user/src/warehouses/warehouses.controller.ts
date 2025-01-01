import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { WarehousesDto } from './dto/warehouses.dto';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
@UseInterceptors(ClassSerializerInterceptor)
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get()
  getAll() {
    return this.warehousesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.getById(id);
  }

  @Post()
  create(@Body() data: WarehousesDto) {
    return this.warehousesService.create(data);
  }
}
