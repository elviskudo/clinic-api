import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bank } from './entity/bank/bank.entity';
import { Category } from './entity/category.entity';
import { Clinic } from './entity/clinic/clinic.entity';
import { Doctor } from './entity/clinic/doctor.entity';
import { Document } from './entity/document.entity';
import { Drug } from './entity/drug/drug.entity';
import { LastRedeem } from './entity/latest/last.redeem.entity';
import { MedicalRecordDrug } from './entity/medical_record_drug.entity';
import { Menu } from './entity/menu.entity';
import { Profile } from './entity/profile/profile.entity';
import { Record } from './entity/latest/record.entity';
import { Reply } from './entity/reply.entity';
import { Review } from './entity/review.entity';
import { Role } from './entity/role.entity';
import { Room } from './entity/room.entity';
import { Schedule } from './entity/schedule.entity';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/profile/user.entity';
import { Otp } from './entity/otp.entity';
import { Village } from './entity/village.entity';
import { ProfileConfiguration } from './entity/profile_config/profile.config.entity';
import { Wilayah } from './entity/location/wilayah.entity';
import { ScheduleEntity } from './entity/appointment/schedules.entity';
import { Poly } from './entity/clinic/poly.entity';
import { Symptom } from './entity/symptom.entity';
import { Summary } from './entity/summary/summary.entity';
import { Payment } from './entity/payment/payment.entity';
import { Feedback } from './entity/feedback.entity';
import { Term } from './entity/term/term.entity';
import { TermCategory } from './entity/term/term.category.entity';
import { DiagnosisEntity } from './entity/diagnosis.entity';
import { Ticket } from './entity/term/ticket.entity';
import { ScheduleDoctorEntity } from './entity/appointment/schedules_doctor';
import { BankCategory } from './entity/bank/bank.category.entity';
import { configurations } from './entity/configurations.entity';
import { Fee } from './entity/fee/fee.entity';
import { PaymentDetails } from './entity/payment/payment.details.entity';

export const DATABASE_ENTITIES = [
  Bank,
  Category,
  Clinic,
  Doctor,
  Document,
  Drug,
  LastRedeem,
  MedicalRecordDrug,
  Menu,
  Poly,
  Profile,
  ProfileConfiguration,
  Record,
  Reply,
  Review,
  Role,
  Room,
  Schedule,
  Summary,
  Symptom,
  Term,
  TermCategory,
  Transaction,
  Wilayah,
  User,
  Otp,
  ScheduleEntity,
  Payment,
  Feedback,
  DiagnosisEntity,
  Ticket,
  ScheduleDoctorEntity,
  BankCategory,
  configurations,
  Fee,
  PaymentDetails,
];

export const format_json = (
  status: number,
  success: boolean,
  error: any,
  meta: any,
  message: any,
  data: any,
) => ({
  status: status,
  success: success,
  errors: error,
  meta: meta,
  message: message,
  data: data,
});
