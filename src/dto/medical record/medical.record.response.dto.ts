import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate, IsString } from 'class-validator';

export class RecordResponseDto {
  @IsDate()
  @ApiProperty()
  consultation_date_time: Date;

  @IsString()
  @ApiProperty()
  way_to_come: string;

  @IsDate()
  @ApiProperty()
  visiting_time: Date;

  @IsString()
  @ApiProperty()
  transportation: string;

  @IsString()
  @ApiProperty()
  reference: string;

  @IsString()
  @ApiProperty()
  person_responsible: string;

  @IsString()
  @ApiProperty()
  traumatic: string;

  @IsString()
  @ApiProperty()
  non_traumatic: string;

  @IsString()
  @ApiProperty()
  conditions: string;

  @IsString()
  @ApiProperty()
  complaint: string;

  @IsString()
  @ApiProperty()
  history_of_illness: string;

  @IsString()
  @ApiProperty()
  solution: string;

  @IsInt()
  @ApiProperty()
  user_id: number;

  @IsInt()
  @ApiProperty()
  poly_id: number;

  @IsInt()
  @ApiProperty()
  clinic_id: number;

  @IsInt()
  @ApiProperty()
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
