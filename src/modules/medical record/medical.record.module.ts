import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecordController } from 'src/controller/medical record/medical.record.controller';
import { PrismaModule } from 'src/prisma.module';
import { MedicalRecordService } from 'src/service/medical record/medical.record.service';

@Module({
  imports: [PrismaModule],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
})
export class MedicalRecordModule {}
