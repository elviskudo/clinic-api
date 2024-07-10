import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  email: string;
}