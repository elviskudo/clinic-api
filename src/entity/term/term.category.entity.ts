import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Term } from './term.entity';

@Entity()
export class TermCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @OneToMany(() => Term, (term) => term.term_category)
  terms: Term[];
}
