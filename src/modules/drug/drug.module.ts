import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugService } from '../../service/drug/drug.service';
import { Drug } from '../../entity/drug/drug.entity';
import { DrugController } from 'src/controller/drug/drug.controller';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drug, User, Role])],
  controllers: [DrugController],
  providers: [DrugService],
})
export class DrugModule {}
