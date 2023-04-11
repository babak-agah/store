import { Body, Controller, Ip, Post, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SessionType } from 'src/utils/interfaces/session.interface';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/users/dtos/signin-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @Post('signup')
  async CreateUser(
    @Res({ passthrough: true }) res,
    @Body() body: CreateUserDto,
    @Session() session: SessionType,
    @Ip() ip: string,
  ) {
    const data = await this.authService.signup(body, ip);
    if (data.user) session.set('userId', data.user._id);
    return data;
  }

  @ApiTags('auth')
  @Post('signin')
  async signin(
    @Res({ passthrough: true }) res,
    @Body() body: SigninUserDto,
    @Session() session: SessionType,
    @Ip() ip: string,
  ) {
    const { user, refreshToken, accessToken } = await this.authService.signin(
      body,
      ip,
    );
    session.userId = user._id;
    return { user, refreshToken, accessToken };
  }
}
