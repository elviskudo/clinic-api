import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, IsDate } from 'class-validator';

export class LastMedicalRecordDto {
  @IsDateString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  consultation_date_time: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  way_to_come: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  vistting_time: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  transportation: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  reference: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  person_responsible: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  traumatic: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  non_traumatic: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  conditions: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  complaint: String;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  history_of_illness: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  solution: String;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_id: string;
}
