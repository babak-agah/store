import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateUnitDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
