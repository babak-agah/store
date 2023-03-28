import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
