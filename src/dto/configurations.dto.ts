import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class configurationsDTO {
  @IsOptional()
  @ApiProperty()
  application_name: string;

  @IsOptional()
  @ApiProperty()
  application_version: string;

  @IsOptional()
  @ApiProperty()
  application_content: string;

  @IsOptional()
  @ApiProperty()
  application_teams: string;

   @IsOptional()
   @ApiProperty()
  by_email: string;

   @IsOptional()
   @ApiProperty()
  by_email_username: string;

   @IsOptional()
   @ApiProperty()
  by_email_password: string;

   @IsOptional()
   @ApiProperty()
  to_email: string;

   @IsOptional()
   @ApiProperty()
  by_whatsapp: string;

   @IsOptional()
   @ApiProperty()
  by_whatsapp_secret: string;

   @IsOptional()
   @ApiProperty()
  by_telegram: string;

   @IsOptional()
   @ApiProperty()
  by_telegram_secret: string;
}
