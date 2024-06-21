import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column('text')
  description: string;
}
