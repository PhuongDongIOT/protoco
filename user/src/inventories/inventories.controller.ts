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
import { InventoriesDto } from './dto/inventories.dto';
import { InventoriesService } from './inventories.service';

@Controller('inventories')
@UseInterceptors(ClassSerializerInterceptor)
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  getAll() {
    return this.inventoriesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.inventoriesService.getById(id);
  }

  @Post()
  create(@Body() data: InventoriesDto) {
    return this.inventoriesService.create(data);
  }
}
