import { IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateTermDto {
  @IsNumber()
  @IsOptional()
  term_category_id?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
