import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryController } from 'src/controller/summary/summary.controller';
import { PrismaModule } from 'src/prisma.module';
import { DrugService } from 'src/service/drug/drug.service';
import { SummaryService } from 'src/service/summary/summary.service';

@Module({
  imports: [PrismaModule],
  controllers: [SummaryController],
  providers: [SummaryService,DrugService],
})
export class SummaryModule {}
