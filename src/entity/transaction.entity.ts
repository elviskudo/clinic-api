
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Payment } from './payment/payment.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  consultation: string;

  @Column()
  handling_fees: number;

  @Column('bigint')
  room_cost: number;

  @Column()
  payment_id: number;

  @OneToOne((type) => Payment, (payment) => payment.id)
  payment: Payment[];
}
