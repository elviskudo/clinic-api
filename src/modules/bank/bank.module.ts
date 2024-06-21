import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from '../../controller/bank/bank.controller';
import { Bank } from '../../entity/bank/bank.entity';
import { BankService } from 'src/service/bank/bank.service';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank, User, Role])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
