import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  doctor_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  post_code?: string;

  @IsOptional()
  @IsInt()
  latitude?: number;

  @IsOptional()
  @IsInt()
  longitude?: number;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  education?: string;
}
