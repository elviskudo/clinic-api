import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PaymentDetailsDto {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  payment_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  drug_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  quantity: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  fee_id: number;
}
