import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { Category } from '../entity/category.entity';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/profile/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Role, User])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
