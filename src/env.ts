import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bank } from './entity/bank.entity';
import { Category } from './entity/category.entity';
import { City } from './entity/city.entity';
import { Clinic } from './entity/clinic.entity';
import { Country } from './entity/country.entity';
import { District } from './entity/district.entity';
import { Doctor } from './entity/doctor.entity';
import { Document } from './entity/document.entity';
import { Drug } from './entity/drug.entity';
import { MedicalRecordDrug } from './entity/medical_record_drug.entity';
import { Menu } from './entity/menu.entity';
import { Payment } from './entity/payment.entity';
import { Profile } from './entity/profile.entity';
import { Record } from './entity/record.entity';
import { Region } from './entity/region.entity';
import { Reply } from './entity/reply.entity';
import { Review } from './entity/review.entity';
import { Role } from './entity/role.entity';
import { Room } from './entity/room.entity';
import { Schedule } from './entity/schedule.entity';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/user.entity';
import { Village } from './entity/village.entity';
import * as dotenv from 'dotenv';

export const DATABASE_ENTITIES = [
  Bank,
  Category,
  City,
  Clinic,
  Country,
  District,
  Doctor,
  Document,
  Drug,
  MedicalRecordDrug,
  Menu,
  Payment,
  Profile,
  Record,
  Region,
  Reply,
  Review,
  Role,
  Room,
  Schedule,
  Transaction,
  User,
  Village,
];

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: DATABASE_ENTITIES,
  ssl: {
    rejectUnauthorized: false 
  },
  synchronize: true,
};


export const format_api = (status: boolean, data: any, message: any) => ({
  Success: status,
  Data: data,
  Message: message
});