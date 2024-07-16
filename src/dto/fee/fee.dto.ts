import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class FeeDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_id: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  activities: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty({ message: 'Cost should not be empty' })
  @ApiProperty({ type: 'number' })
  cost: number;
}
