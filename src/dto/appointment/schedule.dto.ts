import { IsInt, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SchedulesDTO {
  @IsInt()
  doctor_id: number;

  @IsString()
  clinic_name: string;

  @IsString()
  poly_name: string;

  @IsString()
  approval: boolean;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  time: string;
}
