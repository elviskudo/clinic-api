import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDTO {
    @IsString()
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    code: string
}
