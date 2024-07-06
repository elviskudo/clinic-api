import { IsInt, IsDate, IsString } from 'class-validator';

export class RecordResponseDto {
  @IsInt()
  id: number;

  @IsDate()
  consultation_date_time: Date;

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
  user_id: number;

  @IsInt()
  poly_id: number;

  @IsInt()
  clinic_id: number;

  @IsInt()
  doctor_id: number;

  user: {
    phone_number: string;
    email: string;
  };
  poly: {
    name: string;
  };

  clinic: {
    clinic_name: string;
  };

  doctor: {
    doctor_name: string;
  };
}
