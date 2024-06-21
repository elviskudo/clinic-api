import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermCategoryController } from 'src/controller/term/term.category.controller';
import { TermCategory } from 'src/entity/term/term.category.entity';
import { TermCategoryService } from 'src/service/term/term.category.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermCategory])],
  providers: [TermCategoryService],
  controllers: [TermCategoryController],
})
export class TermCategoryModule {}
