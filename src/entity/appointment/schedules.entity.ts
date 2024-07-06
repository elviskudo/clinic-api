import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from '../profile/user.entity';
import { Doctor } from '../clinic/doctor.entity';

@Entity('scheduleentity')
export class ScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ default: null })
    code: string

    @Column('bigint')
    doctor_id: number;

    @Column('bigint')
    user_id: number;

    @Column({ default: false })
    approval: boolean;
    
    @Column('date')
    date: Date;

    @Column('time')
    time: string;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User[];

    @ManyToOne(() => Doctor, doctor => doctor.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor[];
}
