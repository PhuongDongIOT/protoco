import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
  
}
