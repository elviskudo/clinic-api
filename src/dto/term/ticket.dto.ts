import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class TicketDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  content: string;
}
