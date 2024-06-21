import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { Profile } from 'src/entity/profile/profile.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Record } from 'src/entity/latest/record.entity';
import { Review } from 'src/entity/review.entity';
import { Reply } from 'src/entity/reply.entity';
import { ProfileConfiguration } from '../profile_config/profile.config.entity';
import { AppointMentEntity } from '../appointment/appointment.entity';
import { ScheduleEntity } from '../appointment/schedules.entity';


@Entity()
@Unique(['phone_number', 'email'])
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

  @OneToMany(() => Record, record => record.user_id)
  record: Record[];

  @OneToMany(() => Review, review => review.user_id)
  review: Review[];

  @OneToMany(() => Reply, reply => reply.user_id)
  reply: Reply[];

  @OneToMany(() => ProfileConfiguration, config => config.user, { onDelete: 'CASCADE' })
  profileConfigurations: ProfileConfiguration[];

  @OneToOne(() => Profile, Profile => Profile.user_id, { onDelete: 'CASCADE' })
  profile: Profile[];

  @OneToOne(() => ScheduleEntity, schedule => schedule.user_id, { onDelete: 'CASCADE' })
  schedule: ScheduleEntity[];
}
