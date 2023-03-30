import { AddProductToShoppingCartDto } from './dtos/add-product-to-shopping-cart.dto';
import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor() {}

  @Get()
  getCart() {}

  @Post()
  addProductToShoppingCart(@Body() body: AddProductToShoppingCartDto) {
    
  }

  @Delete(':sku')
  removeProductFromShoppingCart(@Param('sku') sku: string) {}
}
