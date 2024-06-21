import { Record } from 'src/entity/latest/record.entity';
import { Room } from 'src/entity/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column()
  city_id: number;

  @Column({ length: 10 })
  post_code: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @OneToMany((type) => Room, (room) => room.clinic_id)
  room: Room[];

  @OneToMany((type) => Record, (record) => record.clinic_id)
  record: Record[];
  
}
