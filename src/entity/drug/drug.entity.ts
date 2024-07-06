import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../category.entity';
import { LastRedeem } from '../latest/last.redeem.entity';
import { PaymentDetails } from '../payment/payment.details.entity';

@Entity()
export class Drug {
  map(arg0: (drug: any) => { id: any; name: any; price: any }): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drug_name: string;

  @Column()
  stock: number;

  @Column('text')
  drug_summary: string;

  @Column('bigint', {
    transformer: {
      from: (value: string) => parseInt(value, 10),
      to: (value: number) => value.toString(),
    },
  })
  buy_price: number;

  @Column('bigint', {
    transformer: {
      from: (value: string) => parseInt(value, 10),
      to: (value: number) => value.toString(),
    },
  })
  sell_price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  company_name: string;

  @ManyToOne(() => Category, (category) => category.drugs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  @ManyToOne(() => LastRedeem, (lastRedeem) => lastRedeem.drugs)
  @JoinColumn({ name: 'redeem_id' })
  redeem: LastRedeem;

  @Column()
  redeem_id: number;

  @OneToMany(() => PaymentDetails, (paymentDetails) => paymentDetails.drug)
  paymentDetails: PaymentDetails[];
}
