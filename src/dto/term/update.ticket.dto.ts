import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  content: string;
}
