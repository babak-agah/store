import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';

import { SigninUserDto } from './dtos/signin-user.dto';
import { SessionType } from 'src/utils/interfaces/session.interface';
import { AuthGuard } from 'src/guards/auth.guard';

enum Url {
  USERS = 'users',
  AUTH = 'auth',
}

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}


  @ApiTags('users')
  @Get(`${Url.USERS}/me`)
  @UseGuards(AuthGuard)
  // @Serialize(UserDto)
  async GetMe(@Session() session: any, @CurrentUser() user: User) {
    const u = await this.usersService.findOne([{ _id: session.userId }]);
    return u;
  }

  @ApiTags('users')
  @Get(`${Url.USERS}/:id`)
  async getUserById(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.findOne({ _id: id });
    res.status(200);
    return user;
  }

  @ApiTags('users')
  @UseGuards(AuthGuard)
  @Patch(`${Url.USERS}/:id`)
  async updateUser(
    @Res() res: FastifyReply,
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.update(id, body);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send({ message: 'user not found' });
    }
  }

  // @UseGuards(AuthGuard)
  // @Delete(`${Url.USERS}/:id`)
  // async deleteUser(@Res() res: FastifyReply, @Param('id') id: string) {
  //   await this.usersService.remove(id);
  //   return res.status(200).send();
  // }

  @ApiTags('auth')
  @Post(`${Url.AUTH}/signup`)
  async CreateUser(
    @Res({ passthrough: true }) res,
    @Body() body: CreateUserDto,
    @Session() session: SessionType,
  ) {
    const user = await this.authService.signup(body);
    if (user) session.set('userId', user.id);
    return user;
  }


  @ApiTags('auth')
  @Post(`${Url.AUTH}/signin`)
  async signin(@Body() body: SigninUserDto, @Session() session: SessionType) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }
}
