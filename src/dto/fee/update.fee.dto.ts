import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateFeeDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @ApiProperty()
  clinic_id?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  activities?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @Min(0)
  @ApiProperty()
  cost?: number;
}
