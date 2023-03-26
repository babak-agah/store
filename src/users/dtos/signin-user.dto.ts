import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
