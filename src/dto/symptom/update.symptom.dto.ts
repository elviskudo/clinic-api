import { IsString, MaxLength } from 'class-validator';

export class UpdateSymptomDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;
}
