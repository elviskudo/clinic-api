import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bank } from './bank.entity';

@Entity()
export class BankCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Bank, (bank) => bank.bank_category)
  banks: Bank[];
}
