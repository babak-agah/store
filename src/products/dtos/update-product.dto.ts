import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, IsOptional } from 'class-validator';

export class UpdatePorductDto {
  @ApiProperty  ()
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
}
