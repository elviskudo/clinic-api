import { IsString, IsNumber, MaxLength } from 'class-validator';

export class PolyDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  clinic_id: number;
}
