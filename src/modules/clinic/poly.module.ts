import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolyController } from 'src/controller/clinic/poly.controller';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Poly } from 'src/entity/clinic/poly.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { PolyService } from 'src/service/clinic/poly.service';

@Module({
  imports: [TypeOrmModule.forFeature([Poly, User, Role, Clinic])],
  controllers: [PolyController],
  providers: [PolyService],
  exports: [PolyService],
})
export class PolyModule {}
