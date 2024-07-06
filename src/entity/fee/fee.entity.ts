import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Clinic } from '../clinic/clinic.entity';
import { PaymentDetails } from '../payment/payment.details.entity';

@Entity()
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activities: string;

  @Column({ default: 0 })
  cost: number;

  @Column()
  clinic_id: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.fees, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @OneToMany(() => PaymentDetails, (paymentDetails) => paymentDetails.fee)
  paymentDetails: PaymentDetails[];
}
