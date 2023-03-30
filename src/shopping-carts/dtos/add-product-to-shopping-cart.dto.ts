import { IsNotEmpty, IsString } from 'class-validator';
export class AddProductToShoppingCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  qty: number;
}
