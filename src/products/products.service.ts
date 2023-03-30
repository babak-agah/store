import { UpdatePorductDto } from './dtos/update-product.dto';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, ProductInstace } from './product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePorductDto } from './dtos/create-product.dto';
import { Projection } from 'src/utils/adapter';
import { errorHandlers } from 'src/utils/error-handler';
import { CreateProductItemDto } from './dtos/create-product-item.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(product: CreatePorductDto, userId: string) {
    const newProduct = new this.productModel({ ...product, userId });
    try {
      const result = await newProduct.save();
      return result as Product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getProductById(_id: string, projection?: Projection<ProductInstace>) {
    const product = await this.productModel
      .findById(_id, { ...projection })
      .exec();
    if (!product) throw new BadRequestException();
    return product;
  }

  async getProducts(
    options: FilterQuery<Product>,
    projection?: Projection<ProductInstace>,
  ) {
    const products = await this.productModel
      .find(options, { ...projection })
      .exec();
    return products;
  }

  async deleteProduct(filter: FilterQuery<Product>) {
    const result = await this.productModel.deleteOne(filter);
    if (result.deletedCount) return true;
    throw new BadRequestException();
  }

  async updateProduct(filter: FilterQuery<Product>, data: UpdatePorductDto) {
    try {
      const product = await this.productModel
        .findOneAndUpdate(
          filter,
          {
            $set: data,
          },
          {
            new: true,
            runValidators: true,
            projection: {},
          },
        )
        .catch((error) => {
          errorHandlers(error);
        });

      return product;
    } catch (error) {
      throw new BadRequestException('product not found');
    }
  }

  async createProductItem(_id: string, data: CreateProductItemDto) {
    try {
      const result = await this.productModel
        .findOneAndUpdate(
          {
            _id,
            'productItems.sku': { $ne: data.sku },
          },
          {
            $addToSet: { productItems: data },
          },
          {
            new: true,
            runValidators: true,
          },
        )
        .catch(errorHandlers);

      if (!result)
        throw new BadRequestException('productId or sku is not valid');

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProductItem(_id: string, data: CreateProductItemDto) {
    try {
      const result = await this.productModel
        .findOneAndUpdate(
          {
            _id,
            productItems: { $elemMatch: { sku: data.sku } },
          },
          {
            $set: {
              'productItems.$': data,
            },
          },
          {
            multi: false,
            new: true,
            runValidators: true,
          },
        )
        .catch(errorHandlers);

      console.log(result);

      if (!result)
        throw new BadRequestException('productId or sku is not valid');

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
