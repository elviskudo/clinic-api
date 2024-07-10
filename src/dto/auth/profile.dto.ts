import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsPhoneNumber,
  IsNotEmpty,
  IsDate,
  IsInt,
  isString,
} from 'class-validator';

export class ProfileDto {
  @MaxLength(64)
  @IsNotEmpty({ message: 'full name should not be empty' })
  @ApiProperty()
  fullname: string;

  @IsNotEmpty({ message: 'phone number should not be empty' })
  @IsPhoneNumber('ID')
  @ApiProperty()
  phone_number: string;

  @IsNotEmpty({ message: 'no identity should not be empty' })
  @ApiProperty()
  no_identity: string;

  @IsOptional()
  @ApiProperty()
  birth_date: Date;

  @IsOptional()
  @ApiProperty()
  birth_place: string;

  @IsNotEmpty({ message: 'address should not be empty' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: 'gender should not be empty' })
  @ApiProperty()
  gender: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  work_in: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  blood_type: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  marital_status: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  nationality: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  religion: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  city_id: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  neighborhoodNo: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  citizen_no: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  area_code: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  responsibleForCosts: string;
}
