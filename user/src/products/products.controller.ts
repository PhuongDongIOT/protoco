import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  // UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { ProductsDto } from './dto/products.dto';
import { ProductsService } from './products.service';
// import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { replaceSysString } from 'src/utilities/replace-sys-string';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById(id);
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
  // @UseGuards(JwtAuthenticationGuard)
  create(@UploadedFile() file: Express.Multer.File, @Body() data: ProductsDto) {
    if(file) data.imageUrl = replaceSysString(file.path);
    return this.productService.create(data);
  }
}
