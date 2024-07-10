import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateSymptomDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  description: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_id: number;
}
