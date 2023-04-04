import { UpdateProductInShoppingCartDto } from './../shopping-carts/dtos/update-product-in-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import mongoose, { FilterQuery, Model, PipelineStage } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    const newData = { ...data, role: 'USER' };

    try {
      const user = new this.userModel(newData);

      const storedUser = await user.save();
      return {
        id: storedUser.id,
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        username: storedUser.username,
        mobile: storedUser.mobile,
        email: storedUser.email,
        address: storedUser.addresses,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(filter: FilterQuery<User>, select?: string) {
    let user: User;
    let query = this.userModel.findOne(filter);

    if (select) {
      query.select(select);
    }
    user = await query;

    if (user) return user;
    return null;
  }

  find(condition?: FilterQuery<User>) {
    return this.userModel.find(condition);
  }

  async update(_id: string, attrs: Partial<User>) {
    const user = await this.userModel.updateOne({ _id }, { attrs });
    return user;
  }

  async removeProductFromShoppingCart(userId: string, sku) {
    try {
      const result = await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { 'shoppingCart.products': { sku } } },
        { new: true, runValidators: true },
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProductInShoppingCart(
    userId: string,
    product: UpdateProductInShoppingCartDto,
  ) {
    try {
      const query: PipelineStage[] = [
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $addFields: {
            'shoppingCart.products': {
              $filter: {
                input: '$shoppingCart.products',
                as: 'productItems',
                cond: {
                  $ne: ['$$productItems.sku', product.sku],
                },
              },
            },
          },
        },
        {
          $addFields: {
            'shoppingCart.products': {
              $concatArrays: ['$shoppingCart.products', [product]],
            },
          },
        },
        { $limit: 1 },
      ];

      const result = await this.userModel.aggregate(query);
      console.log(result);
      if (result.length) return result[0];

      // throw new BadRequestException('something is wrong');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}

// const query: PipelineStage[] = [
//   { $match: { _id: new mongoose.Types.ObjectId(userId) } },
//   {
//     $addFields: {
//       'shoppingCart.products': {
//         $filter: {
//           input: '$shoppingCart.products',
//           as: 'productItems',
//           cond: {
//             $ne: ['$$productItems.sku', product.sku],
//           },
//         },
//       },
//     },
//   },
//   {
//     $addFields: {
//       'shoppingCart.products': {
//         $concatArrays: ['$products', [product]],
//       },
//     },
//   },
//   { $limit: 1 },
// ];
