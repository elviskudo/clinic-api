import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scheduledoctorentity')
export class ScheduleDoctorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('bigint')
    doctor_id: number;
    
    @Column('date')
    date: Date;

    @Column('text', { array: true })
    time: string[];
}
