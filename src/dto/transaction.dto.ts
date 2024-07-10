import { ApiProperty } from "@nestjs/swagger";

export class TransactionDto {
  @ApiProperty()
  code: number;
  @ApiProperty()
  consultation: string;
  @ApiProperty()
  handling_fees: number;
  @ApiProperty()
  room_cost: number;
  @ApiProperty()
  payment_id: number;
}
