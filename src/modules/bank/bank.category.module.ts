import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from '../../controller/bank/bank.controller';
import { BankService } from 'src/service/bank/bank.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BankController],
  providers: [BankService],
})
export class BankCategoryModule {}
