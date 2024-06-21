import { IsString, IsNumber, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClinicDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  address?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  city_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  post_code?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  provinsi?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  kabupaten?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  kecamatan?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  kelurahan?: string;
}
