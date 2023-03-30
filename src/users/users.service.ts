import { Projection } from './../utils/adapter';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserPublic, User, UserInstace } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { FilterQuery, Model } from 'mongoose';

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

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.updateOne({ id }, { attrs });
    return user;
  }

  // async remove(id: string) {
  //   const user = await this.findOne({ _id: id });
  //   // return this.repo.remove(user);
  // }
}

//
//
//
