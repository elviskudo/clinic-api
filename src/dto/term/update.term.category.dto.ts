import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateTermCategoryDto {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  name?: string;
}
