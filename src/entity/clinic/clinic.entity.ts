import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wilayah } from '../location/wilayah.entity';
import { Poly } from './poly.entity';
import { Record } from 'src/entity/latest/record.entity';
import { Room } from 'src/entity/room.entity';
import { Fee } from '../fee/fee.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  clinic_name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 64 })
  address: string;

  @Column({ length: 10 })
  post_code: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column('bigint', {
    transformer: {
      from: (value: string) => parseInt(value, 10),
      to: (value: number) => value.toString(),
    },
  })
  city_id: number;

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.clinics)
  @JoinColumn({ name: 'city_id' })
  city: Wilayah;

  @OneToMany(() => Poly, (poly) => poly.clinic)
  poly: Poly[];

  @OneToMany(() => Record, (record) => record.clinic)
  records: Record[];

  @OneToMany(() => Fee, (fee) => fee.clinic)
  fees: Fee[];
}
