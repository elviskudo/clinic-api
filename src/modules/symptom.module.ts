import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomController } from 'src/controller/symptom.controller';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { Symptom } from 'src/entity/symptom.entity';
import { SymptomService } from 'src/service/symptom.service';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom, User, Role])],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
