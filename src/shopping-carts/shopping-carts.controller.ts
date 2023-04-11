import { UpdateProductInShoppingCartDto } from './dtos/update-product-in-shopping-cart.dto';
import {
  Body,
  Controller,
  Get,
  Session,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/shopping-carts')
export class ShoppingCartsController {
  constructor(private shoppingcart: ShoppingCartsService) {}

  @Get('')
  async getMyShoppingCart(@Session() session) {
    const result = await this.shoppingcart.findShoppingCart(session.userId);
    return result;
  }

  @Patch('')
  @UseGuards(AuthGuard)
  async addProductToShoppingCart(
    @Session() session: any,
    @Body() body: UpdateProductInShoppingCartDto,
  ) {
    const result = await this.shoppingcart.addProductToShoppingCart(
      session.userId,
      body,
    );
    return result;
  }
}
