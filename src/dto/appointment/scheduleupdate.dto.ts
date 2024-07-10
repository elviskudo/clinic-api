import { IsInt, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SchedulesUpdateDTO {

  @IsDate()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  time: string;
}
