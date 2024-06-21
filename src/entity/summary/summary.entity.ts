import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from 'typeorm';
import { Poly } from '../clinic/poly.entity';
import { Doctor } from '../clinic/doctor.entity';
import { Profile } from '../profile/profile.entity';


@Entity()
export class Summary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  poly_id: number;

  @ManyToOne(() => Poly, Poly => Poly.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poly_id' })
  poly: Poly;

  @Column('bigint')
  doctor_id: number;

  @ManyToOne(() => Doctor, Doctor => Doctor.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'datetime' })
  scheduled_date_time: Date;

  @Column()
  qr_code: string;

  @Column({ default: null })
  image_captured_checked: boolean;

  @Column('bigint')
  patient_id: number;

  @ManyToOne(() => Profile, profile => profile.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pacient_id' })
  profile: Profile;

  @Column('bigint', { default: null })
  approved_by_doctor_id: number;

  @ManyToOne(() => Doctor, Doctor => Doctor.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'approved_by_doctor_id' })
  doctordata: Doctor;

  @Column({ length: 256 })
  symptoms: string;

  @Column('text')
  symptoms_description: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: false })
  ai_status: boolean;

  @Column('text')
  ai_response: string;

  @Column()
  image_url: string;

  @Column()
  ai_token: string;

  @Column('json')
  drug: { drug_id: number; qty: number }[];
}
