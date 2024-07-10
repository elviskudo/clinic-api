import { ApiProperty } from "@nestjs/swagger";

export class DocumentDto {
  @ApiProperty()
  document_name: string;
  @ApiProperty()
  document_url: string;
}
