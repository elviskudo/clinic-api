import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDoctorDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  @IsString()
  doctor_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @ApiProperty()
  address?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
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
  @IsString()
  experience?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  @IsString()
  education?: string;
}
