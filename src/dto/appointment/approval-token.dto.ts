import { IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class approvaltokenDTO {
    
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    code: string;

    @IsNotEmpty({ message: 'Tidak boleh kosong' })
    @ApiProperty()
    @IsBoolean()
    approval: boolean;
}
