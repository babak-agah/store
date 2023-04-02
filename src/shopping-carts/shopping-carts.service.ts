import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCartsModule } from './shopping-carts.module';
import { AddProductToShoppingCartDto } from './dtos/add-product-to-shopping-cart.dto';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectModel('ShoppingCart')
    private shoppingCartsModel: Model<ShoppingCartsModule>,
  ) {}

  addProductToShoppingCart(
    shoppingCartId: string,
    data: AddProductToShoppingCartDto,
  ) {
    this.shoppingCartsModel.findByIdAndUpdate(
      shoppingCartId,
      {
        $addToSet: { 'products.$[elem]': data },
      },
      {
        arrayFilters: [{ 'elem.sku': data.sku }],
        new: true,
        runValidators: true,
      },
    );
  }

  getShppingCart() {}
}
