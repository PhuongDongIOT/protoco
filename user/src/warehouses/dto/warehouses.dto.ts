import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class WarehousesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
