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
  Session,
  UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  // @Serialize(UserDto)
  async GetMe(@Req() request, @CurrentUser() user: User) {
    console.log(request.user);
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
