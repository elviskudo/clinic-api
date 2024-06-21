import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category.entity';

@Entity()
export class Drug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drug_name: string;

  @Column()
  stock: number;

  @Column('text')
  drug_summary: string;

  @Column('bigint')
  buy_price: string;

  @Column('bigint')
  sell_price: string;

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
}
