import { IsNumber, IsObject, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  filter: any;

  @IsString()
  page: String;

  @IsString()
  limit: String;
}
