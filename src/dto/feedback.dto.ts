import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class FeedbackDTO {
  @IsString()
  content: string;
}
