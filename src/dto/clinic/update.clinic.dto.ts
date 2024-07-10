import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClinicDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  clinic_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  address?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  post_code?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  latitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  longitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  @IsNumber()
  city_id?: number;
}
