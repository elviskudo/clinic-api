import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class TermDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  term_category_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  content: string;
}
