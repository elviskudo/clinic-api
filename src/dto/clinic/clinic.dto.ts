import { IsString, IsNumber, MaxLength } from 'class-validator';

export class ClinicDto {
  @IsString()
  @MaxLength(64)
  clinic_name: string;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(64)
  address: string;

  @IsNumber()
  city_id: number;

  @IsString()
  @MaxLength(10)
  post_code: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
