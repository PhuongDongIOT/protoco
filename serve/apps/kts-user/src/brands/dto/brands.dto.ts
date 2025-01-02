import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class BrandsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
