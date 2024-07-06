import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class TermDto {
  @IsNumber()
  @IsNotEmpty()
  term_category_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
