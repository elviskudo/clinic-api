import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankCategoryController } from 'src/controller/bank/bank.category.controller';
import { PrismaModule } from 'src/prisma.module';
import { BankCategoryService } from 'src/service/bank/bank.category.service';

@Module({
  imports: [PrismaModule],
  controllers: [BankCategoryController],
  providers: [BankCategoryService],
})
export class BankModule {}
