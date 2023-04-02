import { IsNotEmpty, IsString, Min } from 'class-validator';
export class AddProductToShoppingCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  @Min(0)
  qty: number;
}
