import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class SummaryDto {
  @IsString()
  poly_id: number;

  @IsString()
  doctor_id: number;

  scheduled_date_time: Date;

  @IsString()
  qr_code: string;

  @IsBoolean()
  @IsOptional()
  image_captured_checked?: boolean;

  @IsString()
  @MaxLength(256)
  symptoms: string;

  @IsString()
  symptoms_description: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  ai_status?: boolean;

  @IsOptional()
  ai_response?: string;

  @IsOptional()
  image_url: string;

  @IsOptional()
  ai_token: string;

  drug: { drug_id: number; qty: number }[];
}
