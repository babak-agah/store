import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { variationModels } from 'src/variations/variations.entity';

export class VariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  options: any[];

  @IsOptional()
  @IsEnum(variationModels)
  model: string;
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
