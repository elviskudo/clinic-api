import { IsString, IsNumber, MaxLength } from 'class-validator';

export class PolyDto {
  @IsNumber()
  clinic_id: number;

  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;
}
