import { IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class UpdatePolyDto {
  @IsNumber()
  clinic_id: number;

  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;
}
