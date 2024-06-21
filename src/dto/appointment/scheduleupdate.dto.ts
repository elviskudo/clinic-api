import { IsInt, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SchedulesUpdateDTO {

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  time: string;
}
