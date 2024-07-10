import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  password: string;
}
