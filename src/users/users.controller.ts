import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

enum Url {
  USERS = 'users',
  AUTH = 'auth',
}

@Controller()
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(`${Url.USERS}/me`)
  async GetMe(@Session() session: any, @CurrentUser() user: User) {
    if (!session.userId) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Get(`${Url.USERS}/:id`)
  async getUserById(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.findOne({ id: parseInt(id) });
    res.status(200);
    return user;
  }

  @Patch(`${Url.USERS}/:id`)
  async updateUser(
    @Res() res: FastifyReply,
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.update(parseInt(id), body);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send({ message: 'user not found' });
    }
  }

  @Delete(`${Url.USERS}/:id`)
  async deleteUser(@Res() res: FastifyReply, @Param('id') id: string) {
    await this.usersService.remove(parseInt(id));
    return res.status(200).send();
  }

  @Post(`${Url.AUTH}/signup`)
  async CreateUser(
    @Res({ passthrough: true }) res,
    @Body() body: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(body);
    session.set('userId', user.id);

    return user;
  }

  @Post(`${Url.AUTH}/signin`)
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }
}
