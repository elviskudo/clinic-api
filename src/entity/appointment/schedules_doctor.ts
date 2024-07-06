import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Poly } from '../clinic/poly.entity';
import { Doctor } from '../clinic/doctor.entity';
import { Clinic } from '../clinic/clinic.entity';

@Entity('scheduledoctorentity')
export class ScheduleDoctorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('bigint')
    doctor_id: number;
    
    @Column('date')
    date: Date;

    @Column('text')
    time: string;

    @Column('bigint')
    poly_id: number;

    @Column('bigint')
    clinic_id: number;

    @ManyToOne(() => Clinic, Clinic => Clinic.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'clinic_id' })
    clinic: Clinic;

    @ManyToOne(() => Doctor, Doctor => Doctor.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;

    @ManyToOne(() => Poly, Poly => Poly.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'poly_id' })
    poly: Poly;
}
