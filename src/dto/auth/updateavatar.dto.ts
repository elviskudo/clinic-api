import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, Matches } from 'class-validator';

export class Updateavatar {
  @ApiProperty()
  profil_image: string;
}
