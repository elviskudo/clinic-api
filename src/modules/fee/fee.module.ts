import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeController } from 'src/controller/fee/fee.controller';
import { PrismaModule } from 'src/prisma.module';
import { FeeService } from 'src/service/fee/fee.service';

@Module({
  imports: [PrismaModule],
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
