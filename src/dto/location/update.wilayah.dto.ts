import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class UpdateWilayahDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  id?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  provinsi?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  kabupaten?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  kecamatan?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  kelurahan?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @ApiProperty()
  wilayah_id?: number;
}
