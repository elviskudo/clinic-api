import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class LastRedeemDto {
  @IsDateString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  redemption_date_and_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  list_of_medications: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  total_cost: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  bank_transfer_name: string;
}
