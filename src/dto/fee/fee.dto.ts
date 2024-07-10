import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class FeeDto {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  activities: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  cost: number;
}
