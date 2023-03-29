import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class VariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  options: any[];
}

export class UpdateProductCategoriesDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  parent!: null | string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariationDto)
  variations: VariationDto[];
}
