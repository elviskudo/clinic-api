import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class DiagnosisDTO {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  deaseas_name: string;
}
