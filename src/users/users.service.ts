import { Projection } from './../utils/adapter';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FindUserPublic, User, UserInstace } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<FindUserPublic> {
    const newData = { ...data, role: 'USER' };

    try {
      const user = new this.userModel(newData);

      const storedUser = await user.save();
      return {
        _id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
      };
    } catch (error) {
      throw new NotFoundException(`your email is not valid`);
    }
  }

  async findOne(
    {
      _id,
      email,
      throwError = true,
    }: {
      _id?: string;
      email?: string;
      throwError?: boolean;
    },
    projection?: Projection<UserInstace>,
  ) {
    let user: User;
    if (!_id && !email) throw new BadRequestException();
    let condition = {};

    if (_id) {
      condition = { _id };
    } else if (email) {
      condition = { email };
    }

    user = await this.userModel
      .findOne(condition, { ...projection, __v: false })
      .exec();

    if (user) return user;
    if (throwError)
      throw new NotFoundException(
        `user with this ${_id ? 'id' : 'email'}: ${_id || email} not found`,
      );
  }

  // find(email: string) {
  //   return this.repo.findBy({ email });
  // }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.updateOne({ id }, { attrs });
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne({ _id: id });
    // return this.repo.remove(user);
  }
}

//
//
//
