import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeController } from 'src/controller/fee/fee.controller';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Fee } from 'src/entity/fee/fee.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { FeeService } from 'src/service/fee/fee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Clinic, User, Role])],
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
