import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationsController } from 'src/controller/configurations.controller';
import { PrismaModule } from 'src/prisma.module';
import { configurationsService } from 'src/service/configurations.service';


@Module({
  imports: [PrismaModule],
  controllers: [configurationsController],
  providers: [configurationsService],
})
export class configurationsModule {}
