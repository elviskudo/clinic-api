import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class PolyDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_id: number;
}
