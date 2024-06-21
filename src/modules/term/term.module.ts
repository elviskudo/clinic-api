import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermController } from 'src/controller/term/term.controller';
import { Term } from 'src/entity/term/term.entity';
import { TermService } from 'src/service/term/term.service';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  providers: [TermService],
  controllers: [TermController],
})
export class TermModule {}
