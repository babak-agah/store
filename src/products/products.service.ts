import { UpdatePorductDto } from './dtos/update-product.dto copy';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Product, ProductInstace } from './product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePorductDto } from './dtos/create-product.dto';
import { Projection } from 'src/utils/adapter';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(product: CreatePorductDto, userId: string) {
    const newProduct = new this.productModel({ ...product, userId });

    const result = await newProduct.save();

    return result as Product;
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
    const product = await this.productModel.findOneAndUpdate(
      filter,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        projection: {},
      },
    );

    if (!product) throw new BadRequestException();

    return product;
  }
}
