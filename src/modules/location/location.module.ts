import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WilayahService } from 'src/service/location/location.service';
import { WilayahController } from 'src/controller/location/location.controller';
import { Wilayah } from 'src/entity/location/wilayah.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wilayah, User, Role])],
  providers: [WilayahService],
  controllers: [WilayahController],
  exports: [WilayahService],
})
export class LocationModule {}
