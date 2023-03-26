import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreatePorductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
