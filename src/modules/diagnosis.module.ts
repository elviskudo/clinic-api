import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisController } from 'src/controller/diagnosis/diagnosis.controller';
import { PrismaModule } from 'src/prisma.module';
import { DiagnosisService } from 'src/service/diagnosis/diagnosis.service';

@Module({
  imports: [PrismaModule],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
