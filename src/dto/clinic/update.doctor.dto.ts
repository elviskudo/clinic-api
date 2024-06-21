import {
  IsString,
  IsNumber,
  IsDate,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  doctor_name?: string;

  @IsOptional()
  @IsString()
  place_of_birth?: string;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
  specialist?: string;

  @IsOptional()
  @IsString()
  graduate_of?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  document_id?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  address?: string;

  @IsOptional()
  @IsNumber()
  city_id?: number;

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
  @IsString()
  @MaxLength(32)
  gelar?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  education?: string;
}
