import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { Drug } from '../drug/drug.entity';
import { Fee } from '../fee/fee.entity';

@Entity('payment_details')
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_id: number;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column()
  drug_id: number;

  @ManyToOne(() => Drug)
  @JoinColumn({ name: 'drug_id' })
  drug: Drug;

  @Column()
  quantity: number;

  @Column()
  fee_id: number;

  @ManyToOne(() => Fee)
  @JoinColumn({ name: 'fee_id' })
  fee: Fee;
}
