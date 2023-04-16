import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Model, Types } from 'mongoose';
import { UpdateProductCategoriesDto } from './dtos/update-product-categoies.dto';
import { ProductCategory } from './product-category.entity';
import { CreateProductCategoryDto } from './dtos/create-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel('ProductCategory')
    private productCategoryModel: Model<ProductCategory>,
  ) {}

  async findOne(id: string) {
    // const productCategory = await this.productCategoryModel.findById(id);
    const result = await this.productCategoryModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'variations',
          localField: '_id',
          foreignField: 'productCategoryId',
          as: 'variation',
        },
      },
      {
        $lookup: {
          from: 'variations',
          localField: 'ancestors',
          foreignField: 'productCategoryId',
          as: 'variations',
        },
      },
      {
        $lookup: {
          from: 'productcategories',
          localField: 'parent',
          foreignField: '_id',
          as: 'parents',
        },
      },
      {
        $lookup: {
          from: 'productcategories',
          localField: 'ancestors',
          foreignField: '_id',
          as: 'ancestors',
        },
      },
      {
        $project: {
          name: '$name',
          parent: {
            $arrayElemAt: ['$parents', 0.0],
          },
          ancestors: '$ancestors',
          variations: {
            $concatArrays: ['$variation', '$variations'],
          },
        },
      },
    ]);
    console.log(result);
    if (!result.length) throw new BadRequestException();
    return result[0];
  }

  // filter: {}, page: number, count: number
  async find(filter: any) {
    const query = this.productCategoryModel
      .find(filter)
      .populate({ path: 'parent', select: ['name', 'parent', '_id'] })
      .populate({ path: 'ancestors', select: ['name', 'parent', '_id'] });

    const result = await query;
    return result;
  }

  async create(data: CreateProductCategoryDto) {
    try {
      const productCategory = new this.productCategoryModel(data);

      await productCategory.save().catch((error) => {
        if (error.code === 11000) {
          throw new BadRequestException('name is duplicated');
        }

        throw new InternalServerErrorException();
      });

      await this.updateAncestors();

      const find = await this.find({ _id: productCategory._id });
      if (!find?.length) throw new InternalServerErrorException();

      return find[0];
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

  async getItemsWithAncestors() {
    const result = await this.productCategoryModel.aggregate([
      {
        $graphLookup: {
          from: 'productcategories',
          startWith: '$parent',
          connectFromField: 'parent',
          connectToField: '_id',
          as: 'ancestors',
        },
      },
      {
        $project: {
          ancestors: '$ancestors._id',
        },
      },
    ]);

    return result as ProductCategory[];
  }

  async updateAncestors() {
    const result = await this.getItemsWithAncestors();
    result.forEach(async (item) => {
      await this.productCategoryModel.updateOne(
        { _id: item._id },
        { ancestors: item.ancestors },
      );
    });
    return;
  }

  delete() {}
}
