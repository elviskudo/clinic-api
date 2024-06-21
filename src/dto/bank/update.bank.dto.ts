import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class UpdateBankDto {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  bank_name?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  account_number?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  account_name?: string;

  @IsInt()
  @IsOptional()
  service_charge?: number;

  @IsInt()
  @IsOptional()
  handling_fee?: number;
}
