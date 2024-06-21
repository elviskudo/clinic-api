import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class MedicalRecordDto {
  @IsDate()
  consultation_date_time: Date;

  @IsString()
  polyclinic: string;

  @IsString()
  clinic_name: string;

  @IsString()
  doctor_name: string;

  @IsString()
  way_to_come: string;

  @IsDate()
  visiting_time: Date;

  @IsString()
  transportation: string;

  @IsString()
  reference: string;

  @IsString()
  person_responsible: string;

  @IsString()
  traumatic: string;

  @IsString()
  non_traumatic: string;

  @IsString()
  conditions: string;

  @IsString()
  complaint: string;

  @IsString()
  history_of_illness: string;

  @IsString()
  solution: string;

  @IsInt()
  clinic_id: number;

  @IsInt()
  user_id: number;
}
