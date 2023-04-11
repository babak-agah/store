import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SigninUserDto } from 'src/users/dtos/signin-user.dto';
import { UserInstace } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { RefreshTokenInstace } from './refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('RefreshToken')
    private readonly RefreshTokenModel: Model<RefreshTokenInstace>,
    private usersService: UsersService,
  ) {}

  async signup(
    { username, mobile, password }: CreateUserDto,
    ipAddress: string,
  ) {
    // See if email is in use

    const find = await this.usersService.findOne({
      $or: [{ mobile }, { username }],
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

    const { accessToken, refreshToken } = await this.newRefreshAndAccessToken(
      user,
      { ipAddress },
    );

    return { user, accessToken, refreshToken };
  }

  async signin({ username, password }: SigninUserDto, ipAddress: string) {
    const user: UserInstace = await this.usersService.findOne(
      { $or: [{ username }, { mobile: username }, { email: username }] },
      '+password',
    );

    if (!user) throw new BadRequestException('bad password');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('bad password');

    user.password = undefined;

    const { accessToken, refreshToken } = await this.newRefreshAndAccessToken(
      user,
      { ipAddress },
    );
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private async newRefreshAndAccessToken(
    user: UserInstace,
    values: { ipAddress: string },
  ) {
    try {
      const data = {
        userId: user._id,
        ipAddress: values.ipAddress,
        roles: user.roles,
      };

      const refreshToken = new this.RefreshTokenModel(data);

      await refreshToken.save();

      return {
        refreshToken: sign(data, process.env.REFRESH_SECRET),
        accessToken: this.generateAccessToken(user),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async refresh(refreshToken: string) {
    const find = await this.retrieveRefreshToken(refreshToken);
    if (!find) {
      return undefined;
    }

    const user = await this.usersService.findOne({ _id: find.userId });
    if (!user) {
      return undefined;
    }
    const accessToken = this.generateAccessToken(user);
    return accessToken;
  }

  async retrieveRefreshToken(refreshToken: string) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);

      const find = await this.RefreshTokenModel.findOne({
        userId: decoded.userId,
      });

      if (find) return find as RefreshTokenInstace;
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  generateAccessToken(user: UserInstace) {
    return sign(
      { userId: user._id, roles: user.roles },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '1h',
      },
    );
  }

  async revokeRefreshToken(refreshToken: string) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);

      return await this.RefreshTokenModel.deleteMany({
        userId: decoded.userId,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  verifyRefreshToken(refreshToken: string) {
    const decoded = verify(refreshToken, process.env.REFRESH_SECRET);
    if (typeof decoded === 'string') throw new UnauthorizedException();
    return decoded as RefreshTokenInstace;
  }
}
