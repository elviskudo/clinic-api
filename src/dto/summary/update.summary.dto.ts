import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSummaryDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_id: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  scheduled_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  qr_code: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  image_captured_checked?: boolean;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  symptoms: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  symptoms_description: string;

  @IsOptional()
  @ApiProperty()
  status?: boolean;

  @IsOptional()
  @ApiProperty()
  ai_status?: boolean;

  @IsOptional()
  @ApiProperty()
  ai_response?: string;

  @IsOptional()
  @ApiProperty()
  image_url: string;

  @IsOptional()
  @ApiProperty()
  ai_token: string;

  drug: { drug_id: number; qty: number }[];
}
