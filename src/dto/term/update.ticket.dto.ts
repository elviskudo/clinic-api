import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  content: string;
}
