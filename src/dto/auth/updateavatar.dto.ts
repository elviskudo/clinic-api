import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, Matches } from 'class-validator';

export class Updateavatar {
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  profil_image: string;
}
