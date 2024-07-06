import { IsInt, IsString, MaxLength } from 'class-validator';

export class SymptomDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;

  @IsInt()
  poly_id: number;
}
