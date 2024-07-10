import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateTermDto {
  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  term_category_id?: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  @ApiProperty()
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  content?: string;
}
