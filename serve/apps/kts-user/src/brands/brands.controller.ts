import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { BrandsDto } from './dto/brands.dto';
import { BrandsService } from './brands.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { replaceSysString } from 'src/utilities/replace-sys-string';

@Controller('brands')
@UseInterceptors(ClassSerializerInterceptor)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Get()
  getAll() {
    return this.brandsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.getById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File, @Body() data: BrandsDto) {
    if (file) data.imageUrl = replaceSysString(file.path);
    return this.brandsService.create(data);
  }
}
