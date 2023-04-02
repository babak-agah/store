import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
