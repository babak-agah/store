import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class CityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinate: number[];
}

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CityDto)
  cities: CityDto[];
}
