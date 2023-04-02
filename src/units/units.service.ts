import { InjectModel } from '@nestjs/mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UnitsModule } from './units.module';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(@InjectModel('Unit') private unitsModel: Model<UnitsModule>) {}

  async createUnit(data: CreateUnitDto) {
    try {
      const unit = new this.unitsModel(data);
      await unit.save();
      return unit;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUnits() {
    try {
      const units = this.unitsModel.find();
      return units;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUnit(_id: string, data: UpdateUnitDto) {
    try {
      const newUnit = await this.unitsModel.findByIdAndUpdate(
        _id,
        { $set: data },
        { new: true, runValidators: true },
      );

      return newUnit;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
