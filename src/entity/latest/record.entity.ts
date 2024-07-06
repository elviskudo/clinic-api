import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { MedicalRecordDrug } from 'src/entity/medical_record_drug.entity';
import { Poly } from '../clinic/poly.entity';
import { Doctor } from '../clinic/doctor.entity';
import { Clinic } from '../clinic/clinic.entity';
import { User } from '../profile/user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  consultation_date_time: Date;

  @Column()
  way_to_come: string;

  @Column()
  vistting_time: Date;

  @Column()
  transportation: string;

  @Column()
  reference: string;

  @Column()
  person_responsible: string;

  @Column()
  traumatic: string;

  @Column()
  non_traumatic: string;

  @Column()
  conditions: string;

  @Column('text')
  complaint: string;

  @Column('text')
  history_of_illness: string;

  @Column('text')
  solution: string;

  @Column()
  user_id: number;

  @Column()
  poly_id: number;

  @Column()
  clinic_id: number;

  @Column()
  doctor_id: number;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Poly, (poly) => poly.records)
  @JoinColumn({ name: 'poly_id' })
  poly: Poly;

  @ManyToOne(() => Clinic, (clinic) => clinic.records)
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @ManyToOne(() => Doctor, (doctor) => doctor.record)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToMany(() => MedicalRecordDrug)
  @JoinTable()
  medical_record_drug: MedicalRecordDrug[];
}
