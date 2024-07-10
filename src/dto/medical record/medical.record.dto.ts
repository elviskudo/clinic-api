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
  @IsDate()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  consultation_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  way_to_come: string;

  @IsDate()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  visiting_time: Date;

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

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  user_id: number;
}
