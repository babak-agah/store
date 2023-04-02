import { Injectable, BadRequestException } from '@nestjs/common';

import { Model } from 'mongoose';
import { VariationsModule } from './variations.module';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVariationDto } from './dtos/create-variation.dto';

@Injectable()
export class VariationsService {
  constructor(
    @InjectModel('Variation') private variationModel: Model<VariationsModule>,
  ) {}

  findOne() {}

  async find() {
    try {
      const variations = this.variationModel.find();
      return variations;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createVariation(productCategoryId: string, data: CreateVariationDto) {
    try {
      const newVariation = new this.variationModel({
        ...data,
        productCategoryId,
      });

      await newVariation.save();

      return newVariation;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  updateVariation() {}
}
