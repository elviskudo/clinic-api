import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDTO {

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  redemption_date_and_time: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  list_of_medications: any;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  total_cost: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  bank_transfer_name: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  bank_id: string;
}
