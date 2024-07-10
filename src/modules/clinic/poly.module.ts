import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolyController } from 'src/controller/clinic/poly.controller';
import { PrismaModule } from 'src/prisma.module';
import { PolyService } from 'src/service/clinic/poly.service';

@Module({
  imports: [PrismaModule],
  controllers: [PolyController],
  providers: [PolyService],
  exports: [PolyService],
})
export class PolyModule {}
