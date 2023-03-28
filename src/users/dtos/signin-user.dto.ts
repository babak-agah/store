import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
