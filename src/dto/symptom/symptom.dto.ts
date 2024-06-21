import { IsString, MaxLength } from 'class-validator';

export class SymptomDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;
}
