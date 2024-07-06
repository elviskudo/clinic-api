import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bank } from '../bank/bank.entity';
import { Profile } from '../profile/profile.entity';
import { Drug } from '../drug/drug.entity';
import { Payment } from '../payment/payment.entity';
@Entity()
export class LastRedeem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  redemption_date_and_time: Date;

  @Column()
  list_of_medications: string;

  @Column()
  total_cost: string;

  @Column()
  bank_transfer_name: string;

  @Column()
  bank_id: number;
  @ManyToOne(() => Bank, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bank_id', referencedColumnName: 'id' })
  bank: Bank;

  @Column()
  user_id: number;
  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  profile: Profile;

  @OneToMany(() => Drug, (drug) => drug.redeem)
  drugs: Drug[];

  @OneToMany(() => Payment, (payment) => payment.LastRedeem, {
    cascade: ['remove'],
  })
  payments: Payment[];
}
