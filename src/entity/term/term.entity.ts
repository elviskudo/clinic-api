import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TermCategory } from './term.category.entity';

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column()
  term_category_id: number;

  @ManyToOne(() => TermCategory, (termCategory) => termCategory.id)
  @JoinColumn({ name: 'term_category_id' })
  termCategory: TermCategory;
}
