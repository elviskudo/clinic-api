import { IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class UpdateClinicDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  clinic_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  post_code?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  city_id?: number;

  @IsOptional()
  @IsNumber()
  wilayahId?: number; 
}
