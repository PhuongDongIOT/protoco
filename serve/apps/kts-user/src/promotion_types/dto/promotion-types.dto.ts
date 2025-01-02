import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PromotionTypesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
