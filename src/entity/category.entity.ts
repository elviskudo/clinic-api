import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Drug } from './drug/drug.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Drug, (drug) => drug.category)
  drugs: Drug[];
}
