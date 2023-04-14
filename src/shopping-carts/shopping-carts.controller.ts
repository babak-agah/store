import { UpdateProductInShoppingCartDto } from './dtos/update-product-in-shopping-cart.dto';
import { Body, Controller, Get, Session, Patch } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('api/shopping-carts')
export class ShoppingCartsController {
  constructor(private shoppingcart: ShoppingCartsService) {}

  @Get('')
  async getMyShoppingCart(@Session() session) {
    const result = await this.shoppingcart.findShoppingCart(session.userId);
    return result;
  }

  @Patch('')
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
