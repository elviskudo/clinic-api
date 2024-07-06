import { IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class UpdatePolyDto {
  @IsString()
  @MaxLength(32)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  clinic_id: number;
}
