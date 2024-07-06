import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateFeeDto {
  @IsOptional()
  @IsInt()
  clinic_id?: number;

  @IsOptional()
  @IsString()
  activities?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  cost?: number;
}
