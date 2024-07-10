import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, MaxLength } from 'class-validator';

export class VerifikasiDTO {
  @MaxLength(6)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  kode_otp: number;
}
