import { IsInt, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class approvaltokenDTO {
    
    @IsInt()
    doctor_id: number;

    @IsString()
    approval: boolean;
}
