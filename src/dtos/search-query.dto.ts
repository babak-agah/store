import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class SearchQueryDto<F> {
  @IsString()
  @IsOptional()
  filter: F;

  @IsObject()
  @ValidateNested()
  pagination: PaginationDto;
}
