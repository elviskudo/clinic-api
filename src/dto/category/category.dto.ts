import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MaxLength(32)
  category_name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
