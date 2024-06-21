import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class BankDto {
  @IsString()
  @MaxLength(32)
  bank_name: string;

  @IsString()
  @MaxLength(64)
  account_number: string;

  @IsString()
  @MaxLength(64)
  account_name: string;

  @IsInt()
  @IsOptional()
  service_charge?: number;

  @IsInt()
  @IsOptional()
  handling_fee?: number;
}
