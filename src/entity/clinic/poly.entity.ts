import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Clinic } from './clinic.entity';

@Entity()
export class Poly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  clinic_id: number;

  @Column({ length: 32 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToMany((type) => Clinic, (clinic) => clinic.id)
  clinic: Clinic[];
}
