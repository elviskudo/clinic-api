import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  @ApiProperty()
  category_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;
}
