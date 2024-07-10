import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDrugDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  drug_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  stock: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  drug_summary: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  buy_price: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  sell_price: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  image_url: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  company_name: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  category_id: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  redeem_id: string;
}
