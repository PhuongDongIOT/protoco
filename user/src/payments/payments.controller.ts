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
import { PaymentMethodsDto } from './dto/payments.dto';
import { PaymentMethodsService } from './payments.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { replaceSysString } from 'src/utilities/replace-sys-string';

@Controller('payments')
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  getAll() {
    return this.paymentMethodsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodsService.getById(id);
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
  create(@UploadedFile() file: Express.Multer.File, @Body() data: PaymentMethodsDto) {
     if (file) data.iconUrl = replaceSysString(file.path);
    return this.paymentMethodsService.create(data);
  }
}
