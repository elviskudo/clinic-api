import { Bank } from 'src/entity/bank/bank.entity';
import { Transaction } from 'src/entity/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany
} from 'typeorm';
import { LastRedeem } from '../latest/last.redeem.entity';

export enum paymentStatus {
  SUCCESS = 'success',
  PROCESS = 'processing',
  PENDING = 'pending',
  ERROR = 'error',
}

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_name: string;

  @Column()
  redeem_id: number;

  @ManyToOne(() => LastRedeem, last => last.id)
  @JoinColumn({ name: 'redeem_id' })
  LastRedeem: LastRedeem;

  @Column()
  bank_id: number;

  @ManyToOne(() => Bank, banks => banks.id)
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @Column()
  status: string;
}
