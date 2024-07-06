import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationsController } from 'src/controller/configurations.controller';
import { configurations } from 'src/entity/configurations.entity';
import { configurationsService } from 'src/service/configurations.service';


@Module({
  imports: [TypeOrmModule.forFeature([configurations])],
  controllers: [configurationsController],
  providers: [configurationsService],
})
export class configurationsModule {}
