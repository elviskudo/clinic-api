import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from 'src/controller/clinic/clinic.controller';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { ClinicService } from 'src/service/clinic/clinic.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, User, Role]), LocationModule],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
