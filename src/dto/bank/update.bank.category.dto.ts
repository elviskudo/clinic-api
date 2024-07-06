import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateBankCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  category_name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
