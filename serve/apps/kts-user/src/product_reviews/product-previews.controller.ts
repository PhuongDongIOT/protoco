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
import { ProductPreviewsDto } from './dto/product-previews.dto';
import { ProductPreviewsService } from './product-previews.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { replaceSysString } from 'src/utilities/replace-sys-string';

@Controller('product-previews')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductPreviewsController {
  constructor(private readonly productPreviewsService: ProductPreviewsService) {}

  @Get()
  getAll() {
    return this.productPreviewsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productPreviewsService.getById(id);
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
  create(@UploadedFile() file: Express.Multer.File, @Body() data: ProductPreviewsDto) {
    if (file) data.images = replaceSysString(file.path);
    return this.productPreviewsService.create(data);
  }
}
