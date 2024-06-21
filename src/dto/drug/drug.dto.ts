import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class DrugDto {
  @IsString()
  @IsNotEmpty()
  drug_name: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  drug_summary: string;

  @IsString()
  @IsNotEmpty()
  buy_price: string;

  @IsString()
  @IsNotEmpty()
  sell_price: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
