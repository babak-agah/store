import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { Token } from '../auth/decorator/token.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IToken } from 'src/auth/interfaces/Itoken';
@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  // @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  async GetMe(@Req() request, @Token() token: IToken) {
    const u = await this.usersService.findOne({ _id: request.user.userId });
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
