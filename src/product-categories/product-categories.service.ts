import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateProductCategoriesDto } from './dtos/update-product-categoies.dto';
import { ProductCategory } from './product-category.entity';
import { CreateProductCategoriesDto } from './dtos/create-product-categoies.dto copy';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel('ProductCategory')
    private productCategoryModel: Model<ProductCategory>,
  ) {}

  async findOne(id) {
    const productCategory = await this.productCategoryModel.findById(id);
    if (productCategory) return productCategory;
    throw new BadRequestException();
  }

  async find() {
    return await this.productCategoryModel.find().exec();
  }

  async create(data: CreateProductCategoriesDto) {
    try {
      const productCategory = new this.productCategoryModel(data);
      await productCategory.save().catch((error) => {
        if (error.code === 11000) {
          throw new BadRequestException('name is duplicated');
        }

        throw new InternalServerErrorException();
      });

      return productCategory;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, data: UpdateProductCategoriesDto) {
    const newData = { ...data };

    try {
      const result = await this.productCategoryModel.findByIdAndUpdate(
        id,
        {
          $set: { ...newData },
        },
        { new: true, runValidators: true },
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  delete() {}
}
