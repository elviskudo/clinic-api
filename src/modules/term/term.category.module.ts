import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermCategoryController } from 'src/controller/term/term.category.controller';
import { PrismaModule } from 'src/prisma.module';
import { TermCategoryService } from 'src/service/term/term.category.service';

@Module({
  imports: [PrismaModule],
  providers: [TermCategoryService],
  controllers: [TermCategoryController],
})
export class TermCategoryModule {}
