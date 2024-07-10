import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class BankCategoryDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  category_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
}
