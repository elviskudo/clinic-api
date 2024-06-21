import { Doctor } from 'src/entity/clinic/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_name: string;

  @Column()
  document_url: string;

  @OneToMany((type) => Doctor, (doctor) => doctor.document_id)
  doctor: Doctor[];
}
