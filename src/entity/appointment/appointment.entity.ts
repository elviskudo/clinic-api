import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany
} from 'typeorm';
import { User } from '../profile/user.entity';
import { Doctor } from '../clinic/doctor.entity';

@Entity('appointmententity')
export class AppointMentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column('bigint')
    poly_id: number;

    @Column('bigint')
    doctor_id: number;

    @Column('bigint')
    user_id: number;
    
    @Column({ default: false })
    status: boolean;

    @Column('bigint', { default: null })
    approved_by_doctor_id: number;

    @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User[];

    @OneToMany(() => Doctor, doctor => doctor.id, { onDelete: 'CASCADE' })
    doctor: Doctor[];
}
