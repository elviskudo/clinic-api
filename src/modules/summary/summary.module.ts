import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryController } from 'src/controller/summary/summary.controller';
import { Category } from 'src/entity/category.entity';
import { Drug } from 'src/entity/drug/drug.entity';
import { User } from 'src/entity/profile/user.entity';
import { Summary } from 'src/entity/summary/summary.entity';
import { DrugService } from 'src/service/drug/drug.service';
import { SummaryService } from 'src/service/summary/summary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Summary, User, Category, Drug])],
  controllers: [SummaryController],
  providers: [SummaryService,DrugService],
})
export class SummaryModule {}
