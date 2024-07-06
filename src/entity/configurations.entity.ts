import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class configurations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  application_name: string;

  @Column('text')
  application_version: string;

  @Column('text')
  application_content: string;

  @Column('text')
  application_teams: string;

  @Column('text')
  by_email: string;

  @Column('text')
  by_email_username: string;

  @Column('text')
  by_email_password: string;

  @Column('text')
  to_email: string;

  @Column('text')
  by_whatsapp: string;

  @Column('text')
  by_whatsapp_secret: string;

  @Column('text')
  by_telegram: string;

  @Column('text')
  by_telegram_secret: string;
}
