import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  category_name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
