import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CityDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  city_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  region_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  longitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  latitude: number;
}
