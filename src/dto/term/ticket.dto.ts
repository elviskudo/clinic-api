import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class TicketDto {
  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  content: string;
}
