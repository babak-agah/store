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
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  // @Serialize(UserDto)
  async GetMe(@Session() session: any, @CurrentUser() user: User) {
    const u = await this.usersService.findOne({ _id: session.userId });
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
}
