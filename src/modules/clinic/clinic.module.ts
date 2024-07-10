import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from 'src/controller/clinic/clinic.controller';
import { ClinicService } from 'src/service/clinic/clinic.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
