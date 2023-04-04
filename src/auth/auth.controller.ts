import { Body, Controller, Post, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SessionType } from 'src/utils/interfaces/session.interface';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/users/dtos/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @Post('signup')
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
  @Post('signin')
  async signin(@Body() body: SigninUserDto, @Session() session: SessionType) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }
}
