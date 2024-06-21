import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSummaryDto {
  @IsString()
  @IsOptional()
  doctor_name?: string;

  @IsString()
  @IsOptional()
  polies_name?: string;

  @IsOptional()
  scheduled_date_time?: Date;

  @IsString()
  @IsOptional()
  qr_code?: string;

  @IsBoolean()
  @IsOptional()
  image_captured_checked?: boolean;

  @IsString()
  @IsOptional()
  patient_name?: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  symptoms?: string;

  @IsString()
  @IsOptional()
  symptoms_description?: string;

  @IsString()
  @IsOptional()
  avatar_of_doctor?: string;
}
