import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from 'src/controller/appointment/schedules.controller';
import { SchedulesService } from 'src/service/appointment/schedules.service';
import { ScheduleEntity } from 'src/entity/appointment/schedules.entity';
import { Profile } from 'src/entity/profile/profile.entity';
import { ScheduleDoctorEntity } from 'src/entity/appointment/schedules_doctor';
import { Doctor } from 'src/entity/clinic/doctor.entity';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Poly } from 'src/entity/clinic/poly.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, ScheduleDoctorEntity, Profile, Doctor, Clinic, Poly])],
  controllers: [ScheduleController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
