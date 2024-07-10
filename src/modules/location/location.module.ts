import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WilayahService } from 'src/service/location/location.service';
import { WilayahController } from 'src/controller/location/location.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WilayahService],
  controllers: [WilayahController],
  exports: [WilayahService],
})
export class LocationModule {}
