import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductCategoriesDto } from './dtos/create-product-categoies.dto';
import { ProductCategory } from './product-category.entity';

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
    const productCategory = new this.productCategoryModel(data);
    await productCategory.save();
    return productCategory;
  }

  update() {}

  delete() {}
}
