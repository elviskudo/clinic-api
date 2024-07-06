import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermCategoryController } from 'src/controller/term/term.category.controller';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { TermCategory } from 'src/entity/term/term.category.entity';
import { TermCategoryService } from 'src/service/term/term.category.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermCategory, User, Role])],
  providers: [TermCategoryService],
  controllers: [TermCategoryController],
})
export class TermCategoryModule {}
