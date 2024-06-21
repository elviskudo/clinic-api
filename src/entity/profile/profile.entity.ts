import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Index } from 'typeorm';
import { User } from 'src/entity/profile/user.entity';

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

  @Column({ nullable: true })
  city_id: number;

  @Column({ nullable: true })
  neighborhood_no: number;

  @Column({ nullable: true })
  citizen_no: number;

  @Column({ nullable: true })
  area_code: number;

  @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: User[];
}
