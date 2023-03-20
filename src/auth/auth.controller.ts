import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/signup')
  CreateUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
