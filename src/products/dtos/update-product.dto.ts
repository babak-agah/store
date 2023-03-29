import { IsNumber, IsString, Length, IsOptional } from 'class-validator';

export class UpdatePorductDto {
  @IsOptional()
  @IsString()
  @Length(2)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
