import { CreateStateDto } from './dtos/create-state.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { State } from './state.entity';
import { Model } from 'mongoose';

@Injectable()
export class StatesService {
  constructor(@InjectModel('State') private stateModel: Model<State>) {}

  async findOne(or: { [key in 'name' | '_id']?: string }[]) {
    const state = await this.stateModel.findOne({ $or: or });
    if (state) return state;
    throw new InternalServerErrorException();
  }

  async createState(data: CreateStateDto) {
    try {
      const newState = new this.stateModel(data);
      await newState.save().catch((err) => {
        throw new BadRequestException(err);
      });

      const state = await this.findOne([{ name: data.name }]);
      return state;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
