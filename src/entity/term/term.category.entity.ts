import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class TermCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;
}
