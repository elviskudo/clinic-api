import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankCategory } from 'src/entity/bank/bank.category.entity';
import { BankCategoryController } from 'src/controller/bank/bank.category.controller';
import { BankCategoryService } from 'src/service/bank/bank.category.service';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankCategory, User, Role])],
  controllers: [BankCategoryController],
  providers: [BankCategoryService],
})
export class BankModule {}
