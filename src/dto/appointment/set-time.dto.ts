import { IsInt, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class setTimeDTO {
    
    @IsInt()
    doctor_id: number;

    @IsInt()
    poly_id: number;

    @IsInt()
    clinic_id: number;

    @IsDate()
    date: Date;

    @IsArray()
    time: string;
}
