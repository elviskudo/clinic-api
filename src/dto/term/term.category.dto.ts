import { IsString, MaxLength } from 'class-validator';

export class TermCategoryDto {
  @IsString()
  @MaxLength(64)
  name: string;
}
