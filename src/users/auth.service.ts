import { FilterQuery } from 'mongoose';

import { SigninUserDto } from './dtos/signin-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ username, mobile, password }: CreateUserDto) {
    // See if email is in use

    const find = await this.usersService.findOne([{ mobile }, { username }], {
      mobile: true,
      username: true,
    });
    if (find?.username === username)
      throw new BadRequestException(`username is not valid`);
    if (find?.mobile === mobile)
      throw new BadRequestException(`mobile is not valid`);

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user nad save it
    const user = await this.usersService.create({
      username,
      mobile,
      password: result,
    });

    return user;
  }

  async signin({ username, password }: SigninUserDto) {
    const user = await this.usersService.findOne([
      { username },
      { mobile: username },
      { email: username },
    ]);
    if (!user) throw new BadRequestException('bad password');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('bad password');

    user.password = undefined;

    return user;
  }
}
