import { IsOptional, IsString, IsInt, Length } from 'class-validator';

export class UpdateWilayahDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  id?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  provinsi?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  kabupaten?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  kecamatan?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  kelurahan?: string;

  @IsOptional()
  @IsInt()
  city_id?: number;
}
