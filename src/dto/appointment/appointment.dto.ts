import { IsInt, IsString } from 'class-validator';

export class AppointmentDTO {
    @IsString()
    code: string
}
