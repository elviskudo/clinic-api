import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugService } from '../../service/drug/drug.service';
import { DrugController } from 'src/controller/drug/drug.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DrugController],
  providers: [DrugService],
})
export class DrugModule {}
