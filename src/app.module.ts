import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_ENTITIES } from './env';
import { BankModule } from './modules/bank/bank.module';
import { CategoryModule } from './modules/category.module';
import { DoctorModule } from './modules/clinic/doctor.module';
import { DocumentModule } from './modules/document.module';
import { DrugModule } from './modules/drug/drug.module';
import { LastMedicalRecordModule } from './modules/latest/last.medical.record.module';
import { LastRedeemModule } from './modules/latest/last.redeem.module';
import { LocationModule } from './modules/location/location.module';
import { MedicalRecordDrugModule } from './modules/medical_record_drug.module';
import { MenuModule } from './modules/menu.module';
import { ProfileModule } from './modules/profile.module';
import { RecordModule } from './modules/record.module';
import { ReplyModule } from './modules/reply.module';
import { ReviewModule } from './modules/review.module';
import { RoleModule } from './modules/role.module';
import { RoomModule } from './modules/room.module';
import { ScheduleModule } from './modules/schedule.module';
import { TransactionModule } from './modules/transaction.module';
import { UserModule } from './modules/user.module';
import { VillageModule } from './modules/location/village.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Authmodule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { ClinicModule } from './modules/clinic/clinic.module';
import { PolyModule } from './modules/clinic/poly.module';
import { SymptomModule } from './modules/symptom.module';
import { SummaryModule } from './modules/summary/summary.module';
import { RedeemModule } from './modules/redeem/redeem.module';
import { MedicalRecordModule } from './modules/medical record/medical.record.module';
import { TokenBlacklistMiddleware } from './middleware/token-blacklist.middleware';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { User } from './entity/profile/user.entity';
import { Otp } from './entity/otp.entity';
import { Profile } from './entity/profile/profile.entity';
import { mailService } from 'src/service/mailer/mailer.service';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { paymentModule } from './modules/payment/payment.module';
import { FeedbackModule } from './modules/feedback.module';
import { TermModule } from './modules/term/term.module';
import { TermCategoryModule } from './modules/term/term.category.module';
import { DiagnosisModule } from './modules/diagnosis.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, mailService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Otp, Profile]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: DATABASE_ENTITIES,
      timezone: 'Asia/Jakarta',
      ssl: {
        ca: fs.readFileSync(
          path.join(__dirname, '..', 'certs', 'ca_aivenclinic.pem'),
        ),
      },
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: true,
      },
      template: {
        dir: join(__dirname, '..', 'src', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BankModule,
    CategoryModule,
    ClinicModule,
    DoctorModule,
    DocumentModule,
    DrugModule,
    LastMedicalRecordModule,
    LastRedeemModule,
    MedicalRecordDrugModule,
    MedicalRecordModule,
    MenuModule,
    PolyModule,
    ProfileModule,
    RecordModule,
    ReplyModule,
    ReviewModule,
    RoleModule,
    RoomModule,
    ScheduleModule,
    SummaryModule,
    TermModule,
    TermCategoryModule,
    TransactionModule,
    LocationModule,
    UserModule,
    SymptomModule,
    Authmodule,
    RedeemModule,
    paymentModule,
    FeedbackModule,
    DiagnosisModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenBlacklistMiddleware).forRoutes('*');
  }
}
