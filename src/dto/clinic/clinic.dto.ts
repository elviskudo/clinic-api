import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class ClinicDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  description: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  address: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  post_code: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  longitude: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  city_id: BigInt;
}
