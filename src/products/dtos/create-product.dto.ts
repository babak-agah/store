import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConfigurationDto } from './configuration.dto';

export class CreatePorductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  @IsOptional()
  images: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  configurations: ConfigurationDto[];
}
