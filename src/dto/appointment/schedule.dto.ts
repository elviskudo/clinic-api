import { IsInt, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SchedulesDTO {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_name: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  time: string;
}
