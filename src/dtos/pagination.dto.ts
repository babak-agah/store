import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  page: number;

  @IsNumber()
  @Min(5)
  @Max(100)
  count: number;
}
