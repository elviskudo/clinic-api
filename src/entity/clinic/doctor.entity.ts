import { Schedule } from 'src/entity/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column('bigint')
  city_id: number;

  @Column('int')
  poly_id: number;

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

  @OneToMany((type) => Schedule, (schedule) => schedule.doctor_id)
  schedule: Schedule[];
}
