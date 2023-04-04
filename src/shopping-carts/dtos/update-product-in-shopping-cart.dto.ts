import { IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';
export class UpdateProductInShoppingCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  qty: number;
}
