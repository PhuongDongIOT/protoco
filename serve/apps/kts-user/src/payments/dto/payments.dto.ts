import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PaymentMethodsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  iconUrl: string;
}
