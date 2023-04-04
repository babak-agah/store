import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateProductInShoppingCartDto } from './dtos/update-product-in-shopping-cart.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ShoppingCartsService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async findShoppingCart(userId: string) {
    const cart = await this.usersService.findOne(
      { _id: userId },
      'shoppingCart',
    );
    return cart;
  }

  async addProductToShoppingCart(
    userId: string,
    product: UpdateProductInShoppingCartDto,
  ) {
    try {
      if (product.qty === 0) {
        const result = await this.usersService.removeProductFromShoppingCart(
          userId,
          product.sku,
        );
        return result;
      }
      const findProduct = await this.productsService.getProductById(
        product.productId,
      );
      const findProductItem = findProduct.productItems.find(
        (p) => p.sku === product.sku,
      );
      if (!findProductItem) throw new BadRequestException('product not found');

      if (findProductItem.qtyInStock < product.qty)
        throw new BadRequestException('qty is not valid');

      const result = await this.usersService.updateProductInShoppingCart(
        userId,
        product,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

// { _id: ObjectId('642ab9285a7151148d100c8c') }, [
//   {
//     $addFields: {
//       productItems: {
//         $filter: {
//           input: '$productItems',
//           as: 'product_item',
//           cond: {
//             $ne: ['$$product_item.sku', 200],
//           },
//         },
//       },
//     },
//   },
//   {
//     $addFields: {
//       productItems: {
//         $concatArrays: ['$productItems', [{ sku: 500, price: 0 }]],
//       },
//     },
//   },
// ]
