import { IsOptional, IsString, MaxLength, IsPhoneNumber, IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @MaxLength(64)
  fullname: string;

  @IsOptional()
  @IsPhoneNumber('ID')
  phone_number: string;

  @IsInt()
  @IsNotEmpty({ message: 'no_identity should not be empty' })
  no_identity: string;

  @IsDate()
  @IsNotEmpty({ message: 'birth_date should not be empty' })
  birth_date: Date;

  @IsInt()
  @IsNotEmpty({ message: 'birth_place should not be empty' })
  birth_place: string;

  @IsString()
  @IsNotEmpty({ message: 'address should not be empty' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'gender should not be empty' })
  gender: string;

  @IsOptional()
  @IsString()
  work_in: string;

  @IsOptional()
  @IsString()
  blood_type: string;

  @IsOptional()
  @IsString()
  marital_status: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  religion: string;

  @IsOptional()
  @IsInt()
  city_id: number;

  @IsOptional()
  @IsInt()
  neighborhood_no: number;

  @IsOptional()
  @IsInt()
  citizen_no: number;

  @IsOptional()
  @IsInt()
  area_code: number;
}
