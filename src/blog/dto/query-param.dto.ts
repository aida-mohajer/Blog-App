import { Min, IsInt, IsOptional } from "class-validator";

export class QueryParamsDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  page!: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  limit!: number;
}
