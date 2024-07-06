import { IsInt, IsString, Min } from 'class-validator';

export class FeeDto {
  @IsInt()
  clinic_id: number;

  @IsString()
  activities: string;

  @IsInt()
  @Min(0)
  cost: number;
}
