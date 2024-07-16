import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Authmodule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { TokenBlacklistMiddleware } from './middleware/token-blacklist.middleware';
import { PrismaModule } from './prisma.module';
import { AuthController } from './controller/auth/auth.controller';
import { AuthenticationService } from './service/auth/authentication.service';
import { mailService } from './service/mailer/mailer.service';
import { JwtStrategy } from './middleware/jwt.strategy';
import { ProfileService } from './service/auth/profile.service';
import { ClinicModule } from './modules/clinic/clinic.module';
import { DoctorModule } from './modules/clinic/doctor.module';
import { PolyModule } from './modules/clinic/poly.module';
import { BankCategoryModule } from './modules/bank/bank.category.module';
import { BankModule } from './modules/bank/bank.module';
import { DrugModule } from './modules/drug/drug.module';
import { FeeModule } from './modules/fee/fee.module';
import { LastMedicalRecordModule } from './modules/latest/last.medical.record.module';
import { LastRedeemModule } from './modules/latest/last.redeem.module';
import { LocationModule } from './modules/location/location.module';
import { MedicalRecordModule } from './modules/medical record/medical.record.module';
import { PaymentDetailsModule } from './modules/payment/payment.details.module';
import { paymentModule } from './modules/payment/payment.module';
import { RedeemModule } from './modules/redeem/redeem.module';
import { SummaryModule } from './modules/summary/summary.module';
import { TermCategoryModule } from './modules/term/term.category.module';
import { TermModule } from './modules/term/term.module';
import { CategoryModule } from './modules/category.module';
import { configurationsModule } from './modules/configurations.module';
import { DiagnosisModule } from './modules/diagnosis.module';
import { FeedbackModule } from './modules/feedback.module';
import { RoleModule } from './modules/role.module';
import { ScheduleModule } from './modules/schedule.module';
import { SymptomModule } from './modules/symptom.module';
import { ProfileModule } from './modules/profileconfig.module';


@Module({
  controllers: [AuthController],
  providers: [ProfileService, AuthenticationService, mailService, JwtStrategy],
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    Authmodule,
    ClinicModule,
    DoctorModule,
    PolyModule,
    BankCategoryModule,
    BankModule,
    DrugModule,
    FeeModule,
    LastMedicalRecordModule,
    LastRedeemModule,
    LocationModule,
    MedicalRecordModule,
    PaymentDetailsModule,
    paymentModule,
    RedeemModule,
    SummaryModule,
    TermCategoryModule,
    TermModule,
    CategoryModule,
    configurationsModule,
    DiagnosisModule,
    FeedbackModule,
    RoleModule,
    ScheduleModule,
    SymptomModule,
    ProfileModule,
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
    })
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenBlacklistMiddleware).forRoutes('*');
  }
}
