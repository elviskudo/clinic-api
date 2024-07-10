import { ApiProperty } from "@nestjs/swagger";

export class RoomDto {
  @ApiProperty()
  room_name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  clinic_id: number;
}
