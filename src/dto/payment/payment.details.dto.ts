import { IsInt, IsNotEmpty } from 'class-validator';

export class PaymentDetailsDto {
  @IsInt()
  @IsNotEmpty()
  payment_id: number;

  @IsInt()
  @IsNotEmpty()
  drug_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  fee_id: number;
}
