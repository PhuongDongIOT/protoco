import { Body, Controller, Get, Param, Post, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
// import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
// import { Observable } from 'rxjs';
import { MATH_SERVICE } from './cats.constants';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(
    @Inject(MATH_SERVICE) private readonly client: ClientProxy,
    private readonly catsService: CatsService) {}

  @Post()
  // @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    const response = this.catsService.create(createCatDto);
    return response;
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll(): Promise<Array<Cat>> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    // get by ID logic
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
