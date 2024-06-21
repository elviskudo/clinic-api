import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from '../../service/clinic/doctor.service';
import { DoctorController } from '../../controller/clinic/doctor.controller';
import { Doctor } from '../../entity/clinic/doctor.entity';
import { Poly } from 'src/entity/clinic/poly.entity';
import { WilayahService } from 'src/service/location/location.service';
import { PolyService } from 'src/service/clinic/poly.service';
import { PolyModule } from './poly.module';
import { LocationModule } from '../location/location.module';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, User, Role]),
    PolyModule,
    LocationModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
