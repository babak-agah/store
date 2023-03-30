import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Length,
  IsOptional,
  ValidateNested,
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

  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  configurations: ConfigurationDto[];
}
