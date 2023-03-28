import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
export class VariantionOptionDto {
  @IsNotEmpty()
  value: any;
}

export class VariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VariantionOptionDto)
  options: VariantionOptionDto[];
}

export class CreateProductCategoriesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  //   @IsArray()
  //   @IsNotEmpty()
  //   @ValidateNested({ each: true })
  //   @Type(() => VariationDto)
  //   variants: VariationDto[];
}
