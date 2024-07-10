import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomController } from 'src/controller/symptom.controller';
import { PrismaModule } from 'src/prisma.module';
import { SymptomService } from 'src/service/symptom.service';

@Module({
  imports: [PrismaModule],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
