import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
import { Profile } from './profile/profile.entity';


@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;
  
  @ManyToMany(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  profile: Profile;

  @Column('text')
  content: string;
}
