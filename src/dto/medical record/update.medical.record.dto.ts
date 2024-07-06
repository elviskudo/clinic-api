import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsDate()
  consultation_date_time?: Date;

  @IsOptional()
  @IsString()
  polyclinic?: string;

  @IsOptional()
  @IsString()
  clinic_name?: string;

  @IsOptional()
  @IsString()
  doctor_name?: string;

  @IsOptional()
  @IsString()
  way_to_come?: string;

  @IsOptional()
  @IsDate()
  visiting_time?: Date;

  @IsOptional()
  @IsString()
  transportation?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  person_responsible?: string;

  @IsOptional()
  @IsString()
  traumatic?: string;

  @IsOptional()
  @IsString()
  non_traumatic?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsString()
  complaint?: string;

  @IsOptional()
  @IsString()
  history_of_illness?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsInt()
  clinic_id?: number;

  @IsOptional()
  @IsInt()
  user_id?: number;
}
