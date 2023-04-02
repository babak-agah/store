import { InjectModel } from '@nestjs/mongoose';
import { AddProductToShoppingCartDto } from './dtos/add-product-to-shopping-cart.dto';
import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShoppingCartsModule } from './shopping-carts.module';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor() {}

  @Get()
  getShoppingCart() {}

  @Post(':id')
  addProductToShoppingCart(@Body() body: AddProductToShoppingCartDto) {}

  @Delete(':sku')
  removeProductFromShoppingCart(@Param('sku') sku: string) {}
}
