import { IsString, IsNumber, IsNotEmpty, IsArray, IsOptional, IsDate, IsBoolean, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class PromotionsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  promotionTypeId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  promotionType: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemProduct)
  @IsOptional()
  products?: Array<ItemProduct>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPayment)
  @IsOptional()
  payments?: Array<ItemPayment>;

  @IsString()
  @IsNotEmpty()
  discountType: string;

  @IsNumber()
  @IsNotEmpty()
  discountValue: number;

  @IsString()
  @IsNotEmpty()
  ruleOperator: string;

  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @IsString()
  @IsNotEmpty()
  ruleText: string;
}

export class ItemPayment {
  @IsNumber()
  @IsNotEmpty()
  paymentMethodId: number;
}

export class ItemProduct {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
