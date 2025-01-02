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
import { PromotionsDto } from './dto/promotions.dto';
import { PromotionsService } from './promotions.service';

@Controller('promotions')
@UseInterceptors(ClassSerializerInterceptor)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  getAll() {
    return this.promotionsService.getAll();
  }

  @Get('payment-sale')
  getPaymentSale() {
    return this.promotionsService.getPaymentSale();
  }

  @Get('/product-sale')
  getProductSale() {    
    return this.promotionsService.getProductSale();
  }  

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.promotionsService.getById(id);
  }

  @Post()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthenticationGuard)
  // @UploadedFile() file: Express.Multer.File, 
  create(@Body() data: PromotionsDto) {
    return this.promotionsService.create(data);
  }
}
