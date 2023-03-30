import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  // @Serialize(UserDto)
  async GetMe(@Session() session: any, @CurrentUser() user: User) {
    const u = await this.usersService.findOne([{ _id: session.userId }]);
    return u;
  }

  @Get(`:id`)
  async getUserById(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.findOne({ _id: id });
    res.status(200);
    return user;
  }

  @Get()
  async getUsers(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.find();
    res.status(200);
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch(`:id`)
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

  // @ApiTags('auth')
  // @Post(`${Url.AUTH}/signup`)
  // async CreateUser(
  //   @Res({ passthrough: true }) res,
  //   @Body() body: CreateUserDto,
  //   @Session() session: SessionType,
  // ) {
  //   const user = await this.authService.signup(body);
  //   if (user) session.set('userId', user.id);
  //   return user;
  // }

  // @ApiTags('auth')
  // @Post(`${Url.AUTH}/signin`)
  // async signin(@Body() body: SigninUserDto, @Session() session: SessionType) {
  //   const user = await this.authService.signin(body);
  //   session.userId = user.id;
  //   return user;
  // }
}
