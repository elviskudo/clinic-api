import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phoneNumber: string;

  @IsStrongPassword()
  password: string;
}
