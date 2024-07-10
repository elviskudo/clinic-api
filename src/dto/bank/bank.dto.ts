import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class BankDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  bank_name: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  account_number: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  account_name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  service_charge?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  handling_fee?: number;
}
