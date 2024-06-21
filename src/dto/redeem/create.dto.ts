import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateDTO {
    redemption_date_and_time: Date;
    list_of_medications: any;
    total_cost: string;
    bank_transfer_name: string;
    bank_id: number;
    user_id: number;
}
