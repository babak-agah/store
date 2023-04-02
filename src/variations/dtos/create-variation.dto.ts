import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';
import { VariationModelType, variationModels } from '../variations.entity';
import { Type } from 'class-transformer';

export class CreateVariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(variationModels)
  model: VariationModelType;

  @IsArray()
  options: any[];

  @IsArray()
  @Type(() => String)
  units: string[];
}
