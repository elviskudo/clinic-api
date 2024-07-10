import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from 'src/controller/appointment/schedules.controller';
import { SchedulesService } from 'src/service/appointment/schedules.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
