import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class MedicalRecordDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  consultation_date_time: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  way_to_come: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  vistting_time: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  transportation: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  reference: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  person_responsible: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  traumatic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  non_traumatic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  conditions: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  complaint: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  history_of_illness: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  solution: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_id: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  city_id: number;
}
