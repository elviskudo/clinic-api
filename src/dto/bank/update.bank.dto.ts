import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class UpdateBankDto {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty()
  bank_name?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty()
  account_number?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty()
  account_name?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  service_charge?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  handling_fee?: number;
}
