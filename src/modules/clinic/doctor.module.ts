import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from '../../service/clinic/doctor.service';
import { DoctorController } from '../../controller/clinic/doctor.controller';
import { WilayahService } from 'src/service/location/location.service';
import { PolyService } from 'src/service/clinic/poly.service';
import { PolyModule } from './poly.module';
import { LocationModule } from '../location/location.module';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
