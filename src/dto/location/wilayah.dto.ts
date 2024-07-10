import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateWilayahDto {
  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  id: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  provinsi: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  kabupaten: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  kecamatan: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  kelurahan: string;
  
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  wilayah_id: number;
}
