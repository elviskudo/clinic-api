import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/entity/profile/user.entity';
import { Wilayah } from '../location/wilayah.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phone_number: string;

  @Column({ nullable: true })
  profil_image: string;

  @Column({ nullable: true })
  no_identity: string;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  birth_place: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  work_in: string;

  @Column({ nullable: true })
  blood_type: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  religion: string;

  @Column()
  @Index({ unique: true })
  user_id: number;

  @Column('bigint', {
    transformer: {
      from: (value: string) => parseInt(value, 10),
      to: (value: number) => value.toString(),
    },
    nullable: true
  })
  city_id: number;

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  wilayah: Wilayah;

  @Column({ nullable: true })
  neighborhood_no: number;

  @Column({ nullable: true })
  citizen_no: number;

  @Column({ nullable: true })
  area_code: number;

  @Column({ type: 'text', nullable: true })
  responsible_for_costs: string;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User[];
}
