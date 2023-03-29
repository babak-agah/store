import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductItemDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
    sku: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @Type(() => String)
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  configurations: ConfigurationDto[];
}

class ConfigurationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;
}
