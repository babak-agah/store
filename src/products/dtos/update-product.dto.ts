import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Length,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ConfigurationDto } from './configuration.dto';
import { Type } from 'class-transformer';

export class UpdatePorductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  @IsOptional()
  images: string;

  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  configurations: ConfigurationDto[];
}
