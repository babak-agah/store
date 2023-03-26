import { SigninUserDto } from './dtos/signin-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password, name }: CreateUserDto) {
    // See if email is in use
    const find = await this.usersService.findOne({ email, throwError: false });
    if (find) throw new BadRequestException(`email in use`);

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user nad save it
    await this.usersService.create({
      name,
      email,
      password: result,
    });

    // get the user from db
    const user = await this.usersService.findOne({ email });

    // return the user
    return user;
  }

  async signin({ email, password }: SigninUserDto) {
    const user = await this.usersService.findOne({ email });

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('bad password');

    user.password = undefined;

    return user;
  }
}
