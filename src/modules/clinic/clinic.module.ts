import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from 'src/controller/clinic/clinic.controller';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { ClinicService } from 'src/service/clinic/clinic.service';
import { Wilayah } from 'src/entity/location/wilayah.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, User, Role, Wilayah])],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
