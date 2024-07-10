import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePolyDto {
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
