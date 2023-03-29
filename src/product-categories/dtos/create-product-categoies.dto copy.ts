import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductCategoriesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parent: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => String)
  ancestors: string[];
}
