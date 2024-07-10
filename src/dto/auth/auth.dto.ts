import { IsEmail, IsPhoneNumber, IsStrongPassword, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  email: string;

  @IsPhoneNumber('ID')
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  phone_number: string;

  @IsStrongPassword({minUppercase: 1, minNumbers: 1,minSymbols: 1})
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  password: string;
}
