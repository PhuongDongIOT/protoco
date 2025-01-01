import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class ProductPricesDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  originalPrice: number;

  @IsNumber()
  @IsOptional()
  minQuantity: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsOptional()
  vat: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
