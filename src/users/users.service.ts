import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: CreateUserDto) {
    try {
      const user = this.repo.create(data);
      await this.repo.save(user);
    } catch (error) {
      throw new NotFoundException(`your email is not valid`);
    }
  }

  async findOne({
    id,
    email,
    throwError = true,
  }: {
    id?: number;
    email?: string;
    throwError?: boolean;
  }) {
    let user: User;
    if (!id && !email) throw new BadRequestException();

    if (id) {
      user = await this.repo.findOneBy({ id });
    } else if (email) {
      user = await this.repo.findOneBy({ email });
    }

    if (user) return user;
    if (throwError)
      throw new NotFoundException(
        `user with this ${id ? 'id' : 'email'}: ${id || email} not found`,
      );
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne({ id });
    Object.assign(user, attrs);
    await this.repo.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    return this.repo.remove(user);
  }
}

//
//
//
