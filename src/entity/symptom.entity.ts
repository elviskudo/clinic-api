import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Poly } from './clinic/poly.entity';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  poly_id: number;

  @ManyToOne(() => Poly, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poly_id', referencedColumnName: 'id' })
  poly: Poly;
}
