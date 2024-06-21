import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Profile } from './profile/profile.entity';

@Entity()
export class DiagnosisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;
  
  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  profile: Profile;

  @Column({ length: 64 })
  deaseas_name: string;
}
