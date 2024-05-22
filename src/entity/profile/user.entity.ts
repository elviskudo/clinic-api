import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/entity/profile/profile.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Record } from 'src/entity/latest/record.entity';
import { Review } from 'src/entity/review.entity';
import { Reply } from 'src/entity/reply.entity';
import { ProfileConfiguration } from '../profile_config/profile.config.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  role_id: number;

  @Column({ default: 0 })
  verifed: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne((type) => Profile, (profile) => profile.user_id)
  profile: Profile[];

  @OneToMany((type) => Schedule, (schedule) => schedule.user_id)
  schedule: Schedule[];

  @OneToMany((type) => Record, (record) => record.user_id)
  record: Record[];

  @OneToMany((type) => Review, (review) => review.user_id)
  review: Review[];

  @OneToMany((type) => Reply, (reply) => reply.user_id)
  reply: Reply[];

  @OneToMany(() => ProfileConfiguration, (config) => config.user)
  profileConfigurations: ProfileConfiguration[];
}
