import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parent: string;

  // @IsArray()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => String)
  // ancestors: string[];

  @IsString()
  @IsOptional()
  icon: string;
}
