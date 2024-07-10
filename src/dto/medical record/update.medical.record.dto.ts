import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsDate()
  @ApiProperty()
  consultation_date_time?: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  polyclinic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  clinic_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  doctor_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  way_to_come?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsDate()
  @ApiProperty()
  visiting_time?: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  transportation?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  reference?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  person_responsible?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  traumatic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  non_traumatic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  conditions?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  complaint?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  history_of_illness?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  solution?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @ApiProperty()
  clinic_id?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @ApiProperty()
  user_id?: number;
}
