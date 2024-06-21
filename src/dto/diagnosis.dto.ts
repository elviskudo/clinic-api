import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class DiagnosisDTO {
  @IsString()
  deaseas_name: string;
}
