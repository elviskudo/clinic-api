import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class FeedbackDTO {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  content: string;
}
