import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecordController } from 'src/controller/medical record/medical.record.controller';
import { Record } from 'src/entity/latest/record.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { MedicalRecordService } from 'src/service/medical record/medical.record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Role, User])],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
})
export class MedicalRecordModule {}
