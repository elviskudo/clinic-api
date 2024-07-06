import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { Record } from '../latest/record.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class Poly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('bigint')
  clinic_id: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.poly)
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @OneToMany(() => Record, (record) => record.doctor)
  records: Record[];
}
