import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDrugDto {
  @IsString()
  @IsNotEmpty()
  drug_name: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  drug_summary: string;

  @IsNotEmpty()
  buy_price: number;

  @IsNotEmpty()
  sell_price: number;

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
