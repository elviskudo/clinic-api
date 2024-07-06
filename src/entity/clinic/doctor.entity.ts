import { Schedule } from 'src/entity/schedule.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Record } from '../latest/record.entity';
import { Poly } from './poly.entity';
import { Wilayah } from '../location/wilayah.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  doctor_name: string;

  @Column({ nullable: true })
  place_of_birth: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  specialist: string;

  @Column({ nullable: true })
  graduate_of: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ nullable: true, default: null })
  document_id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 64 })
  address: string;

  @Column({ length: 10 })
  post_code: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ length: 32 })
  title: string;

  @Column('text', { nullable: true })
  experience: string;

  @Column('text', { nullable: true })
  education: string;

  @Column('int')
  poly_id: number;

  @Column('bigint')
  wilayah_id: number;

  @ManyToOne(() => Poly, (poly) => poly.id)
  @JoinColumn({ name: 'poly_id' })
  poly: Poly;

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.doctors)
  @JoinColumn({ name: 'wilayah_id' })
  wilayah: Wilayah;

  @OneToMany((type) => Schedule, (schedule) => schedule.doctor_id)
  schedule: Schedule[];

  @OneToMany(() => Record, (record) => record.doctor)
  record: Record[];
}
