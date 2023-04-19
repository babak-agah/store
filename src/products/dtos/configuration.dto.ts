import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class ConfigurationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  variationId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  values: any;
}
