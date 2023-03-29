import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductItemDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty()
  @Type(() => String)
  images: string[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  configurations: ConfigurationDto[];
}

class ConfigurationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;
}
