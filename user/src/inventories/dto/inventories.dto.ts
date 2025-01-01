import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class InventoriesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  reservedQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  minStockLevel: number;

  @IsNumber()
  @IsNotEmpty()
  warehouseId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
