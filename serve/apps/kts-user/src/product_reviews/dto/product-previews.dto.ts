import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductPreviewsDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsOptional()
  images: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
