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

  @ManyToOne(() => TermCategory, (termCategory) => termCategory.terms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'term_category_id' })
  term_category: TermCategory;

  @Column()
  term_category_id: number;
}
