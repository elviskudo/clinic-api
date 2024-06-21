import { IsString, IsInt, Length } from 'class-validator';

export class CreateWilayahDto {
  @IsString()
  @Length(1, 255)
  id: string;

  @IsString()
  @Length(1, 255)
  provinsi: string;

  @IsString()
  @Length(1, 255)
  kabupaten: string;

  @IsString()
  @Length(1, 255)
  kecamatan: string;

  @IsString()
  @Length(1, 255)
  kelurahan: string;

  @IsInt()
  city_id: number;
}
