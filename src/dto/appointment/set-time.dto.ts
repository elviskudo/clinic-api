import { IsInt, IsDate, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class setTimeDTO {
    
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    doctor_id: string;

    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    poly_id: string;

    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    clinic_id: string;

    @IsDate()
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    date: Date;

    @IsArray()
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    time: string;
}
