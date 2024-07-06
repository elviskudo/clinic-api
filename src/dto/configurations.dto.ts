import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class configurationsDTO {
  @IsOptional()
  application_name: string;

  @IsOptional()
  application_version: string;

  @IsOptional()
  application_content: string;

  @IsOptional()
  application_teams: string;

   @IsOptional()
  by_email: string;

   @IsOptional()
  by_email_username: string;

   @IsOptional()
  by_email_password: string;

   @IsOptional()
  to_email: string;

   @IsOptional()
  by_whatsapp: string;

   @IsOptional()
  by_whatsapp_secret: string;

   @IsOptional()
  by_telegram: string;

   @IsOptional()
  by_telegram_secret: string;
}
